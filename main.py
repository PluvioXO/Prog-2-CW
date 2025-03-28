from App import App
from Classes.DB import DB


url: str = "https://xyoqfdhomalgeerfutzf.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5b3FmZGhvbWFsZ2VlcmZ1dHpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Mzk3OTAsImV4cCI6MjA1ODUxNTc5MH0.7jpSwPkLXXse1nc4Us9Kv6wf9qixMntB6i21Jxo9f_Q"

if __name__ == "__main__":
    DBInstance = DB(url, key)
    app_instance = App(DBInstance)  # Create an instance of the web app
    app_instance.run()