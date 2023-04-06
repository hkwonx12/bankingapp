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


class CheckingAccountIn(BaseModel):
    total_amount: int
    account_number: int
    routing_number: int

class CheckingAccountOut(BaseModel):
    id: int
    account_number: int



class SavingsAccountIn(BaseModel):
    total_amount: int
    interest_rate: int
    account_number: int
    routing_number: int


class SavingsAccountOut(BaseModel):
    id: int
    total_amount: int
    interest_rate: int
    account_number: int
    routing_number: int


class CheckingForm(BaseModel):
    account_number: int


class SavingsForm(BaseModel):
    account_number: int

class InvestmentAccountIn(BaseModel):
    total_amount: int
    account_number: int
    routing_number: int


class InvestmentAccountOut(BaseModel):
    id: int
    account_number: int
