from models import SavingsAccountIn, SavingsAccountOut, SavingsForm
from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
from queries.accounts import DuplicateAccountError
from queries.savings_account import SavingsRepository
from authenticator import authenticator
from typing import List


router = APIRouter()

@router.post('/api/savingsaccount')
def create_savings_account(
    info: SavingsAccountIn,
    repo: SavingsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),

):
    try:
        savings_account = repo.create_savings_account(info)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )

    return savings_account


@router.get('/api/savingsaccount', response_model=SavingsAccountOut)
def get_all_savings_account(
    repo: SavingsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),

):
    return repo.get_all_savings()


@router.get('/api/savingsaccount/{id}', response_model=SavingsAccountOut)
def get_one_savings_account(
    account_number: int,
    response: Response,
    repo: SavingsRepository = Depends(authenticator.get_current_account_data),
) -> SavingsAccountOut:
    savings_account = repo.get_one_savings_account(account_number)
    if savings_account is None:
        response.status_code = 404
    return savings_account


@router.delete('/api/savingsaccount/{account_number}', response_model=SavingsAccountOut)
def delete_savings_account(
    account_number: int,
    repo: SavingsRepository = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_savings_account(account_number)


@router.put('/api/savingsaccount/{account_number}', response_model=SavingsAccountOut)
def update_savings_account(
    account_number: int,
    savings_account: SavingsAccountIn,
    repo: SavingsRepository = Depends(authenticator.get_current_account_data),
) -> SavingsAccountOut:
    return repo.update_savings_account(account_number, savings_account)
