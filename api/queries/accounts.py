from pydantic import BaseModel
from models import AccountIn, AccountOut, AccountOutWithPassword


class DuplicateAccountError(ValueError):
    pass


class Repositories(Queries):
    def get(self, username:str ) -> AccountOutWithPassword:
        pass

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        pass
