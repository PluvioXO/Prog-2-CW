#Goal class retrieves its information from the DB class. Before carrying out some parse operations on it.
class Goal:
    def __init__(self):
        self.name = ''
        self.description = ''
        self.progress = 0

    def get_name(self) -> str:
        return self.name

    def get_description(self) -> str:
        return self.description

    def get_progress(self) -> int:
        return self.progress

    def set_name(self, name) -> None:
        self.name = name

    def set_description(self, description) -> None:
        self.description = description

    def update_progress(self, progress) -> None:
        pass

