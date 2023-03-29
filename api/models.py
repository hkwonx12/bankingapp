from pydantic import BaseModel
from fastapi import FastAPI
from datetime import date

app = FastAPI()
class AccountIn(BaseModel):
    email: str
    username: str
    password: str


class AccountOut(BaseModel):
    id: int
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class User(BaseModel):
    id: int
    username: str
    password: str
    email: str
    address: str
    phone: str
    dob: date
    checking: bool
    savings: bool
    investment: bool
