from pydantic import BaseModel
from models import  UserIn, UserOutWithPassword

class Queries(BaseModel):
    pass

class DuplicateAccountError(ValueError):
    pass


class AccountsRepo(Queries):
    def get(self, username:str ) -> UserOutWithPassword:
        pass

    def create(self, info: UserIn, hashed_password: str) -> UserOutWithPassword:
        pass
