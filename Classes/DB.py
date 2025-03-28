from supabase import create_client, Client

class DB():
    def __init__(self, url: str, key: str) -> Client:
        self.supabase = create_client(url,key)
    
    #UTIL METHODS
    def getUUID(self):
        user = self.supabase.auth.get_user()
        if user:
            return user.user.id
        else:
            return None

    #AUTH METHODS
    def login(self, eml: str, pss: str) -> bool:
        try:
            self.supabase.auth.sign_in_with_password({"email": eml, "password": pss})
            print("User login successful")
            return True
        except Exception as error:
            print(error)
            return False
        
    def signup(self, eml: str, pss: str) -> bool:
        try: 
            self.supabase.auth.sign_up({"email": eml, "password": pss})
            return True
        except Exception as error:
            print(error)
            return False
        
    def signout(self) -> bool:
        try: 
            self.supabase.auth.sign_out()
            print("User signed out")
            return True
        except Exception as error:
            print(error)
            return False

    def isLoggedIn(self) -> bool:
        return self.supabase.auth.get_session() is not None
    

    def changePassword(self, newPassword) -> bool:

        if self.isLoggedIn():
            response = self.supabase.auth.update_user(
                    {"password": newPassword}
                    )   
            return True
        else:
            return False
        
    def getUserID(self) -> bool:
        try:
            user = self.supabase.auth.get_user()
            user_id = user.user.id

            return user_id
        except: 
            return None 
        
    #QUERY METHODS [All are obtained from the given uuid from auth table. No need for the email or password to be parsed to any method]
    def set_water(self, cups : int) -> bool:
        try:
            return self.supabase.from_("userData").update({"water": cups}).eq("uuid", self.getUUID).execute() is not None
        except:
            return False

    def set_steps(self, steps : int) -> bool:
        try:
            return self.supabase.from_("userData").update({"steps": steps}).eq("uuid", self.getUUID).execute() is not None
        except:
            return False

    def set_mood(self, mood : int) -> bool:
        try:
            return self.supabase.from_("userData").update({"mood": mood}).eq("uuid", self.getUUID).execute() is not None
        except:
            return False

    def set_sleep(self, sleep : float) -> bool:
        try:
            return self.supabase.from_("userData").update({"sleep": sleep}).eq("uuid", self.getUUID).execute() is not None
        except:
            return False

    def set_meaningful_work_hours(self, meaningful_work_hours : float) -> bool:
        try:
            return self.supabase.from_("userData").update({"work": work}).eq("uuid", self.getUUID).execute() is not None
        except:
            return False

    #ALL GET METHODS WILL RETURN 0 IF NO RECORD EXISTS. 
    def get_water(self) -> int:
        try:
            response = self.supabase.from_("userData").select("water").eq("uuid", self.getUUID()).execute()
            return response.data
        except:
            return 0

    def get_steps(self) -> int:
        try:
            response = self.supabase.from_("userData").select("steps").eq("uuid", self.getUUID()).execute()
            return response.data
        except:
            return 0

    def get_mood(self) -> int:
        try:
            response = self.supabase.from_("userData").select("mood").eq("uuid", self.getUUID()).execute()
            return response.data
        except:
            return 0

    def get_sleep(self) -> float:
        try: 
            response = self.supabase.from_("userData").select("sleep").eq("uuid", self.getUUID()).execute()
            return response.data
        except:
            return 0

    def get_meaningful_work_hours(self) -> float:
        try:
            response = self.supabase.from_("userData").select("work").eq("uuid", self.getUUID()).execute()
            return response.data
        except:
            return 0
        

    def addEntry(self, entryDict) -> float:
        try:
            response = (
                self.supabase.table("entry").insert([entryDict,]).execute()
            )
            print(response)
            return True
        except:
            return False