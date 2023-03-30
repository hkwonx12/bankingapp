from pydantic import BaseModel
from models import  UserIn, UserOutWithPassword
from .users import UserRepository

class Queries(BaseModel):
    pass

class DuplicateAccountError(ValueError):
    pass


class UserRepository(Queries):
    def get(self, username:str ) -> UserOutWithPassword:
        pass

    def create(self, info: UserIn, hashed_password: str) -> UserOutWithPassword:
        pass
