from pydantic import BaseModel
from fastapi import FastAPI
from datetime import date
from jwtdown_fastapi.authentication import Token

app = FastAPI()
class UserIn(BaseModel):
    email: str
    username: str
    password: str
    address: str
    phone: str
    dob: date
    checking: bool
    savings: bool
    investment: bool



class AccountForm(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str

class AccountToken(Token):
    user: UserOut


class UserOutWithPassword(UserOut):
    hashed_password: str
