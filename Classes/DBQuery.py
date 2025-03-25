class DBQuery:
    def __init__(self, pss, eml):
        self.pss = pss
        self.eml = eml

    def set_water(self, cups:int) -> bool:
        pass

    def set_steps(self, steps:int) -> bool:
        pass

    def set_mood(self, mood:int) -> bool:
        pass

    def set_sleep(self, sleep:float) -> bool:
        pass

    def set_meaningful_work_hours(self, meaningful_work_hours:float) -> bool:
        pass

    def get_water(self) -> int:
        pass

    def get_steps(self) -> int:
        pass

    def get_mood(self) -> int:
        pass

    def get_sleep(self) -> float:
        pass

    def get_meaningful_work_hours(self) -> float:
        pass