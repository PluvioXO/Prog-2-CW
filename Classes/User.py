from Classes.DBQuery import DBQuery

class User:
    def __init__(self):
        self.dbquery = None
        self.goals = {}

    def get_goals(self) -> dict:
        return self.goals

    def get_goal(self, goal_id: str) -> []:
        return self.goals[goal_id]

    def set_dbquery(self, pss, eml):
        self.dbquery = DBQuery(pss, eml)
