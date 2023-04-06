from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
from models import InvestmentAccountIn, InvestmentAccountOut, AccountToken
from queries.accounts import DuplicateAccountError
from queries.users import InvestmentAccountRepository
from authenticator import authenticator
from typing import List



router = APIRouter()

@router.post('/api/investment_account', response_model=InvestmentAccountOut)
def create_checking_account(
    info: InvestmentAccountIn,
    repo: InvestmentAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),

):
    try:
        investment_account = repo.create_investment_account(info)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    return investment_account

@router.delete('/api/checking_account/{id}', response_model=bool)
def delete_investment_account(
    id: int,
    repo: InvestmentAccountRepository = Depends(),
) -> bool:
    return repo.delete_investment_account(id)
