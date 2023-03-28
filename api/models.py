from pydantic import BaseModel

class AccountIn(BaseModel):
    email: str
    username: str
    password: str


class AccountOut(BaseModel):
    id: int
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str



