from flask import Flask, render_template, request, redirect, url_for, jsonify
from supabase import create_client, Client
from Classes.User import User

url: str = "https://xyoqfdhomalgeerfutzf.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5b3FmZGhvbWFsZ2VlcmZ1dHpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Mzk3OTAsImV4cCI6MjA1ODUxNTc5MH0.7jpSwPkLXXse1nc4Us9Kv6wf9qixMntB6i21Jxo9f_Q"
supabase: Client = create_client(url, key)
user: User = User()
user_data = {}

#CheckAuth is a simple helper function that just checks the users authentication session is valid. Used to reduce code redundancy && repitition.
def CheckAuth() -> bool:
    return supabase.auth.get_session() is not None

def Login(eml : str, pss : str) -> bool:
    try:
        response = supabase.auth.sign_in_with_password(
        {
        "email": eml, 
        "password": pss,
        }
        )
        #Once logged in user session data obtainable by: supabase.auth.get_session()
        #supabase.auth.get_session() => [USER DATA || None], which allows for easy auth. 
        print("Login Successful")
        return True
    except Exception as ErrorLog:
        print(ErrorLog)
    return False

def SignUp(pss : str, eml: str) -> bool:
    # Supabase handles all password hashing serverside. 
    try:
        response = supabase.auth.sign_up(
        {
        "email": eml, 
        "password": pss,
        }
        )
        # print(response)
        print("Signup Successful")
        return True 
    except Exception as ErrorLog:
        print(ErrorLog)
        return False
    

def ChangePassword(pss : str) -> bool:
    try:
        response = supabase.auth.update_user(
            {"password": pss}
        )
        print("Password Changed successfully")
        return True
    except Exception as ErrorLog:
        print(ErrorLog)
        return False

app = Flask(__name__)

@app.route('/')
def home() -> Flask.route:
    return render_template('landing.html')

@app.route('/login', methods=["POST"])
def login() -> Flask.route:
    global user, user_data
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get("password")
        if Login(email, password):
            user = User()
            user.set_dbquery(email, password)
            return jsonify({"success": True, "redirect": url_for('dashboard')})
    return jsonify({"success": False, "error": "Invalid credentials"})

@app.route('/register', methods = ["POST"])
def signup() -> Flask.route:
    if request.method == 'POST':
        password = request.form.get("password")
        confirm_pword = request.form.get("confirm_password")
        email = request.form.get("email")
        #Previous logic statement allows a user to signup where conf_pswrd != pswrd. Also supabase requires len(pswrd) > 6.
        if not email or not password:
            return jsonify({"success": False, "error": "Missing email or password"})

        if password != confirm_pword:
            return jsonify({"success": False, "error": "Passwords do not match"})

        if len(password) < 7:
            return jsonify({"success": False, "error": "Password must be at least 7 characters"})

        if SignUp(password, email):
            return jsonify({"success": True, "redirect": url_for('dashboard')})

        return jsonify({"success": False, "error": "Signup failed"})
    return jsonify({"success": False, "error": "Signup failed"})

@app.route('/dashboard')
def dashboard() -> Flask.route:
    if CheckAuth():
        return render_template('components/dashboard.html')
    return redirect(url_for('home'))

@app.route('/profile')
def profile() -> Flask.route:
    if CheckAuth():
        # eml field should have supabase users eml parsed in
        return render_template('components/profile.html', eml="example")
    return redirect(url_for('home'))

@app.route('/input')
def input() -> Flask.route:
    if CheckAuth():
        return render_template('components/input.html')
    return redirect(url_for('home'))

@app.route('/goals')
def goals() -> Flask.route:
    if CheckAuth():
        return render_template('components/goals.html')
    return redirect(url_for('home'))

@app.route('/submit_data', methods=['POST'])
def submit_data() -> Flask.route:
    if CheckAuth():
        global user_data
        user_data = {
            "sleep": request.form.get("sleep"),
            "mood": request.form.get("mood"),
            "screen_time": request.form.get("screen_time"),
            "water": request.form.get("water"),
            "steps": request.form.get("steps"),
            "work": request.form.get("work"),
        }
        print(user_data)
        return redirect(url_for('dashboard'))
    return redirect(url_for('home'))

#CheckAuth is not needed for this method by default. 
@app.route('/logout', methods=['GET', 'POST'])
def logout() -> Flask.route:
    try:
        supabase.auth.sign_out() #Signs user out of their account and removes session
        print("Logout Successful")
    except:
        print("Error during logout")
    if CheckAuth():
        return redirect(url_for('profile')) #Case is Supabase API fails for some reason
    return redirect(url_for('home'))

@app.route('/save-changes', methods=['GET', 'POST'])
def save_changes() -> Flask.route:
    try:
        data = request.json
        password = data.get('new_password')
        cfm_password = data.get('new_cfm_password')

        global user

        if password == cfm_password:
            
            # change password on supabase
            if CheckAuth():
                ChangePassword(cfm_password)
        else:
            pass

        return redirect(url_for('dashboard'))
    except Exception as ErrorLog:
        print(ErrorLog)
        return redirect(url_for('profile'))

if __name__ == '__main__':
    app.run(debug=True)