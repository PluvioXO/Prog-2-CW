from flask import Flask, render_template, request, redirect, url_for
from supabase import create_client, Client
from Classes.User import User

url: str = "https://xyoqfdhomalgeerfutzf.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5b3FmZGhvbWFsZ2VlcmZ1dHpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Mzk3OTAsImV4cCI6MjA1ODUxNTc5MH0.7jpSwPkLXXse1nc4Us9Kv6wf9qixMntB6i21Jxo9f_Q"
supabase: Client = create_client(url, key)
user = User()
user_data = {}

def Login(eml : str, pss : str) -> bool:
    try:
        response = supabase.auth.sign_in_with_password(
        {
        "email": eml, 
        "password": pss,
        }
        )
        print(response)
        return True
    except Exception as e:
        print(e)
    return False

def SignUp(pss : str, eml: str) -> bool:
    try:
        response = supabase.auth.sign_up(
        {
        "email": eml, 
        "password": pss,
        }
        )
        print(response)
    except Exception as e:
        print(e)
    return False

app = Flask(__name__)

@app.route('/', methods = ["GET"])
def home() -> Flask.route:
    return render_template('landing.html')

@app.route('/login', methods=["GET", "POST"])
def login() -> Flask.route:
    global user, user_data
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get("password")
        if Login(email, password):
            user = User()
            user.set_dbquery(email, password)
            return redirect(url_for('dashboard'))
    return render_template("auth/login.html")

@app.route('/register', methods = ["GET", "POST"])
def signup() -> Flask.route:
    if request.method == 'POST':
        password = request.form.get("password")
        confirm_pword = request.form.get("confirm_password")
        email = request.form.get("email")
        if SignUp(password, email) and password == confirm_pword:
            return redirect(url_for('/auth/login'))
    return render_template('auth/register.html')

@app.route('/dashboard')
def dashboard() -> Flask.route:
    return render_template('components/dashboard.html')

@app.route('/profile')
def profile() -> Flask.route:
    return render_template('components/profile.html')

@app.route('/input')
def input() -> Flask.route:
    return render_template('components/input.html')

@app.route('/goals')
def goals() -> Flask.route:
    return render_template('components/goals.html')

@app.route('/submit_data', methods=['POST'])
def submit_data() -> Flask.route:
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

if __name__ == '__main__':
    app.run(debug=True)