from flask import Flask, render_template, request
from supabase import create_client, Client
import hashlib
import json 

url: str = "https://pawhaidfyqohrcjbuuna.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhd2hhaWRmeXFvaHJjamJ1dW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNzMzODksImV4cCI6MjA1Nzk0OTM4OX0.KWhRk_4rQOUowVCMTe93Au_KX3XHsEPFzIdXg0XVbKs"
supabase: Client = create_client(url, key)

def Login(eml : str, pss : str) -> bool:
    #Gives the given encrypted password as a hex hash. 
    print(eml,pss)
    try:
        response = supabase.auth.sign_in_with_password(
        {
        "email": eml, 
        "password": pss,
        }
        )
        print(response); 
        return True;
    except Exception as e:
        print(e)
    return False;

def SignUp(pss : str, eml: str) -> bool:
    #Gives the given encrypted password as a hex hash. 
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
    return False; 

app = Flask(__name__)

@app.route('/', methods = ["GET"])
def home():
    return render_template('landing.html')

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get("password")
        if Login(email, password):
            return 0;
    return render_template("auth/login.html")

@app.route('/register', methods = ["GET", "POST"])
def signup():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        email = request.form.get("email")
        if SignUp(password, email):
            return 0;
    return render_template('auth/register.html')

if __name__ == '__main__':
    app.run(debug=True)