from pydantic import BaseModel
from fastapi import FastAPI
from datetime import date
from jwtdown_fastapi.authentication import Token
import typing
from typing import Optional

app = FastAPI()
class UserIn(BaseModel):
    email: str
    full_name: str
    username: str
    password: str
    address: str
    phone: str
    dob: date


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
    # owner_id: int # today

class CheckingAccountUpdate(BaseModel):
    total_amount: int

class CheckingAccountOut(BaseModel):
    id: int
    # account_number: int


class CheckingAccountOutWithDetails(CheckingAccountOut):
    total_amount: int
    routing_number: int
    owner_id: int



class SavingsAccountIn(BaseModel):
    total_amount: int
    interest_rate: int
    account_number: int
    routing_number: int
    owner_id: int


class SavingsAccountOut(BaseModel):
    id: int
    account_number: int
    owner_id: int


class SavingsAccountOutWithDetails(SavingsAccountOut):
    total_amount: int
    interest_rate: int
    routing_number: int
    owner_id: int


class InvestmentAccountIn(BaseModel):
    total_amount: int
    account_number: int
    routing_number: int
    investment_value: int
    owner_id: int


class InvestmentAccountOut(BaseModel):
    id: int
    account_number: int



class InvestmentAccountOutWithDetails(InvestmentAccountOut):
    total_amount: int
    investment_value: int
    owner_id: int


class TransactionsIn(BaseModel):
    date: date
    amount: int
    institution: str
    checking_account_id : Optional[int] = 'null'
    savings_account_id : Optional[int] = 'null'
    investment_account_id : Optional[int] = 'null'

class TransactionCheckingIn(BaseModel):
    amount: int
    checking_account_id : int

class TransactionsOut(BaseModel):
    id: int


class TransactionsOutWithDetails(TransactionsOut):
    date: date
    amount: int
    institution: str
    checking_account_id : Optional[int] = 'null'
    savings_account_id : Optional[int] = 'null'
    investment_account_id : Optional[int] = 'null'
    owner_id: int

class Stockout(BaseModel):
    c: float
    h: float
    l: float
    o: float
    pc: float
    t: int
    dp: float
