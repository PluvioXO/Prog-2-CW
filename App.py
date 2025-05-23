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

                #email verification:
                special_chars = "!#$%&'*+-/=?^_`{|}~" #the special characters allowed in the prefix of an email address
                split_email = email.split('@')
                if len(split_email) != 2:
                    return jsonify({"success": False, "error": "Email is invalid"})
                prefix = split_email[0]
                prefix_first = prefix[0]
                prefix_last = prefix[len(prefix) - 1]
                #prefix cannot start or end with a fullstop
                if prefix_first == '.' or prefix_last == '.':
                    return jsonify({"success": False, "error": "Email is invalid"})
                split_prefix = prefix.split(".")
                for word in split_prefix:
                        if (not word.isalnum()):
                            for char in word:
                                if (not char.isalnum()) and (not (char in special_chars)):
                                    return jsonify({"success": False, "error": "Email is invalid"})
                domain = split_email[1]
                domain_first = domain[0]
                domain_last = domain[len(domain)-1]
                #domain cannot start or end with a fullstop or hyphen
                if domain_first == '-' or domain_first == '.' or domain_first == '-' or domain_first == '.':
                    return jsonify({"success": False, "error": "Email is invalid"})
                split_domain = domain.split('.') #this split is to check that there is at least one fullstop with characters before and after
                if len(split_domain) < 2:
                    return jsonify({"success": False, "error": "Email is invalid"})
                split_domain = domain.replace('-','.').split('.')
                all_numbers = True #all numeric domains are not allowed
                for word in split_domain:
                    if (not word.isalnum()):
                        return jsonify({"success": False, "error": "Email is invalid"})
                    elif (not word.isdigit()):
                        all_numbers = False
                if all_numbers:
                    return jsonify({"success": False, "error": "Email is invalid"})


                if len(password) < 7:
                    return jsonify({"success": False, "error": "Password must be at least 7 characters"})
                has_lower = False
                has_upper = False
                has_number = False
                for char in password:
                    if char.islower():
                        has_lower = True
                    elif char.isupper():
                        has_upper = True
                    elif char.isdigit():
                        has_number = True
                if not has_lower:
                    return jsonify({"success": False, "error": "Password must contain at least one lower case letter"})
                if not has_upper:
                    return jsonify({"success": False, "error": "Password must contain at least one upper case letter"})
                if not has_number:
                    return jsonify({"success": False, "error": "Password must contain at least one number"})

                #this block of code calculates the age based on inputted date of birth, stored in calculated_age, and determines whether it's in the permitted range
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

                #this block of code determines if the name entered is valid
                formatted_name = name.replace('-',' ') #allows use of hyphens in name, replaced with a space to pass the validation
                split_name = formatted_name.split()
                valid_name = True
                if len(split_name) == 0:
                    return jsonify({"success": False, "error": "Enter a valid name"})
                for word in split_name:
                    if not word.isalpha():
                        valid_name = False
                if not valid_name:
                    return jsonify({"success": False, "error": "Enter a valid name"})

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
                #Need to be fetched from db
                email = "email@gmail.com"
                name = "name"
                dob = "dob" #will need formatting to a string to display
                return render_template('components/profile.html', eml=email, name=name, dob=dob)
            return redirect(url_for('home'))

        @self.app.route('/input')
        def input() -> Flask.route:
            if self.supabase.isLoggedIn():
                return render_template('components/input.html')
            return redirect(url_for('home'))

        @self.app.route('/previous-inputs')
        def previous_inputs() -> Flask.route:
            if self.supabase.isLoggedIn():
                today = datetime.datetime.now(tz=datetime.timezone.utc).strftime("%Y-%m-%d")
                return render_template('components/previous_inputs.html', today=today)
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
                    "userID": self.supabase.getUUID(),
                    "sleep": float(request.form.get("sleep")),
                    "mood": int(request.form.get("mood")),
                    "screenTime": float(request.form.get("screen_time")),
                    "water": float(request.form.get("water")),
                    "steps": int(request.form.get("steps")),
                    "work": float(request.form.get("work")),
                }
                print(user_data)

                #verification of whether the user has already inputted data for today
                current_date = datetime.datetime.now(tz=datetime.timezone.utc)
                inputted_today = False
                all_data = self.supabase.getAllData() #can probably be improved
                for entry in all_data:
                    creation_date = entry["created_at"][:10].split("-")
                    if int(creation_date[0]) == current_date.year and int(creation_date[1]) == current_date.month and int(creation_date[2]) == current_date.day:
                        inputted_today = True
                        break

                if not inputted_today:
                    self.supabase.addEntry(user_data)
                    print("Added to entry table")
                else:
                    return redirect(url_for('previous_inputs'))

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
        
                has_lower = False
                has_upper = False
                has_number = False
                for char in password:
                    if char.islower():
                        has_lower = True
                    elif char.isupper():
                        has_upper = True
                    elif char.isdigit():
                        has_number = True
                if password == cfm_password and len(password) >= 7 and has_lower and has_upper and has_number:
                    
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
                self.supabase.deleteUser()
                print("Deleted (maybe)")
                return redirect(url_for('home'))
            except Exception as ErrorLog:
                print(ErrorLog)
                return redirect(url_for('profile'))

        @self.app.route('/get-data', methods=['GET'])
        def getData() -> dict:
            return self.supabase.getAllData()
        
        @self.app.route('/edit-entry-data', methods=['POST'])
        def editEntry() -> Flask.route:
            try:
                print("editing entry")
                data = request.json
                print(data)
                self.supabase.editEntry(data)
                print()
                return redirect(url_for('home'))

            except:
                return redirect(url_for('home'))
        
        @self.app.route('/delete-entry', methods=['POST'])
        def deleteEntry() -> Flask.route:
            try:
                data = request.json
                print(data)
                self.supabase.deleteEntry(data)
                print()
                return redirect(url_for('home'))

            except:
                return redirect(url_for('home'))

        @self.app.route('/check-entry-exists', methods=['GET'])
        def check_entry_exists():
            if self.supabase.isLoggedIn():
                user_id = self.supabase.getUUID()
                current_date = datetime.datetime.now(tz=datetime.timezone.utc).strftime("%Y-%m-%d")

                all_data = self.supabase.getAllData()

                entry_exists = any(
                    entry["userID"] == user_id and entry["created_at"][:10] == current_date
                    for entry in all_data
                )

                return jsonify({'exists': entry_exists})

            return jsonify({'exists': False})
            
        @self.app.route('/get-goals', methods=['GET'])
        def getGoals() -> dict:
            return self.supabase.getUserGoals()
        
        @self.app.route('/create-goal', methods=['POST'])
        def createGoal() -> dict:
            try:
                print("creating goal")
                data = request.json
                print(data)
                self.supabase.createGoal(data)
                print()
                return redirect(url_for('home'))

            except:
                return redirect(url_for('home'))

        @self.app.route('/get-points', methods=['GET'])
        def getPoints():
            return self.supabase.getPoints()

        @self.app.route('/add-points', methods=['GET', 'POST'])
        def addPoints():
            try:
                data = request.json
                points = data['totalPoints']
                print("adding points", points)
                self.supabase.addPoints(points)
                return redirect(url_for('goals'))

            except:
                print('failed to add points')
                return redirect(url_for('goals'))



    def run(self, debug=True):
        self.app.run(debug=debug)


