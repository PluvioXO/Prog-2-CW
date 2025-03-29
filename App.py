from flask import Flask, render_template, request, redirect, url_for, jsonify
from Classes.DB import DB
import datetime

class App():
    user_data = {}

    def __init__(self, DBInstance: DB) -> None:
        self.app = Flask(__name__)
        self.supabase = DBInstance
        self.setupRoutes()

    def setupRoutes(self) -> Flask.route: 
        @self.app.route('/')
        def home() -> Flask.route:
            return render_template('landing.html')

        @self.app.route('/login', methods=["POST"])
        def login() -> Flask.route:
            # global user, user_data
            global user_data
            if request.method == 'POST':
                email = request.form.get("email")
                password = request.form.get("password")
                if self.supabase.login(email, password):
                    return jsonify({"success": True, "redirect": url_for('dashboard')})
            return jsonify({"success": False, "error": "Invalid credentials"})

        @self.app.route('/register', methods = ["POST"])
        def signup() -> Flask.route:
            if request.method == 'POST':
                name = request.form.get("full_name")
                dob = request.form.get("date_of_birth")
                password = request.form.get("password")
                confirm_pword = request.form.get("confirm_password")
                email = request.form.get("email")
                #Previous logic statement allows a user to signup where conf_pswrd != pswrd. Also supabase requires len(pswrd) > 6.
                if not email or not password or not name or not dob:
                    return jsonify({"success": False, "error": "Missing email or password"})

                if password != confirm_pword:
                    return jsonify({"success": False, "error": "Passwords do not match"})

                if len(password) < 7:
                    return jsonify({"success": False, "error": "Password must be at least 7 characters"})

                #this block of code calculates the age based on inputted date of birth, stored in calculated_age
                min_age = 10
                max_age = 100
                split_dob = dob.split("-")
                formatted_dob = datetime.datetime(int(split_dob[0]),int(split_dob[1]),int(split_dob[2]))
                current_date = datetime.datetime.now(tz=datetime.timezone.utc)
                calculated_age = current_date.year - formatted_dob.year
                if current_date.month < formatted_dob.month:
                    calculated_age -= 1
                elif current_date.month == formatted_dob.month and current_date.day < formatted_dob.day:
                    calculated_age -= 1

                if calculated_age < min_age or calculated_age > max_age:
                    return jsonify({"success": False, "error": "Not within permitted age range"})

                if self.supabase.signup(email, password): # needs name and dob added
                    return jsonify({"success": True, "redirect": url_for('dashboard')})

                return jsonify({"success": False, "error": "Signup failed"})
            return jsonify({"success": False, "error": "Signup failed"})

        @self.app.route('/dashboard')
        def dashboard() -> Flask.route:
            if self.supabase.isLoggedIn():
                return render_template('components/dashboard.html')
            return redirect(url_for('home'))

        @self.app.route('/profile', methods=["GET", "POST"])
        def profile() -> Flask.route:
            if self.supabase.isLoggedIn():
                # Need to be fetched from db
                email = "email@gmail.com"
                name = "name"
                dob = "dob" # will need formatting to a string to display
                return render_template('components/profile.html', eml=email, name=name, dob=dob)
            return redirect(url_for('home'))

        @self.app.route('/input')
        def input() -> Flask.route:
            if self.supabase.isLoggedIn():
                return render_template('components/input.html')
            return redirect(url_for('home'))

        @self.app.route('/goals')
        def goals() -> Flask.route:
            if self.supabase.isLoggedIn():
                return render_template('components/goals.html')
            return redirect(url_for('home'))

        @self.app.route('/submit_data', methods=['POST'])
        def submit_data() -> Flask.route:
            if self.supabase.isLoggedIn():

                global user_data
                user_data = {
                    "userID": self.supabase.getUserID(),
                    "timestamp": datetime.datetime.now(tz=datetime.timezone.utc).isoformat(),
                    "sleep": float(request.form.get("sleep")),
                    "mood": int(request.form.get("mood")),
                    "screenTime": float(request.form.get("screen_time")),
                    "water": float(request.form.get("water")),
                    "steps": int(request.form.get("steps")),
                    "work": float(request.form.get("work")),
                }
                print(user_data)


                self.supabase.addEntry(user_data)
                print("Added to entry table")

                return redirect(url_for('dashboard'))
            return redirect(url_for('home'))

        #CheckAuth is not needed for this method by default. 
        @self.app.route('/logout', methods=['GET', 'POST'])
        def logout() -> Flask.route:
            if self.supabase.signout():
                return redirect(url_for('home'))
            return redirect(url_for('profile')) #Case is Supabase API fails for some reason
        

        @self.app.route('/save-changes', methods=['GET', 'POST'])
        def save_changes() -> Flask.route:
            try:
                data = request.json
                password = data.get('new_password')
                cfm_password = data.get('new_cfm_password')
        
                if password == cfm_password:
                    
                    # change password on supabase
                    self.supabase.changePassword(cfm_password)
                    print("Password Changed successfully")
                    return redirect(url_for('home'))
                else:
                    return redirect(url_for('profile'))
                        
            except Exception as ErrorLog:
                print(ErrorLog)
                return redirect(url_for('profile'))

        @self.app.route('/delete-profile', methods=['GET', 'POST'])
        def delete_profile() -> Flask.route:
            try:
                pass
                # supabase delete profile
            except Exception as ErrorLog:
                print(ErrorLog)
                return redirect(url_for('profile'))


        @self.app.route('/get-data', methods=['GET'])
        def getData() -> dict:
            return self.supabase.getAllData()
    
    
    def run(self, debug=True):
        self.app.run(debug=debug)
