from models import SavingsAccountIn, SavingsAccountOut, SavingsAccountOutWithDetails, TransactionsIn, TransactionsTestIn
from fastapi import APIRouter, Response, Depends, HTTPException, status
from queries.accounts import DuplicateAccountError
from queries.savings_account import SavingsRepository
from queries.transactions import TransactionsRepository
from queries.testTransactions import TransactionsTestRepository
from authenticator import authenticator
from typing import List


router = APIRouter()

@router.post('/api/savings_account', response_model=SavingsAccountOut)
def create_savings_account(
    info: SavingsAccountIn,
    repo: SavingsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        user_id = account_data['id']
        savings_account = repo.create_savings_account(info, user_id)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    return savings_account


@router.get('/api/savings_account', response_model=List[SavingsAccountOutWithDetails])
def get_all_savings_account(
    repo: SavingsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_savings_accounts(account_data)


@router.get('/api/savings_account/{owner_id}', response_model=SavingsAccountOutWithDetails)
def get_one_savings_account(
    owner_id: int,
    response: Response,
    repo: SavingsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> SavingsAccountOutWithDetails:
    savings_account = repo.get_one_savings_account(owner_id)
    if savings_account is None:
        response.status_code = 404
    return savings_account


@router.delete('/api/savings_account/{id}', response_model=bool)
def delete_savings_account(
    id: int,
    repo: SavingsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_savings_account(id)


@router.put('/api/savings_account')
def update_savings_account(
    transaction: TransactionsTestIn,
    repo: SavingsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    savings_account_response = repo.update_savings_account(transaction, account_data)
    instance = TransactionsTestRepository()
    if savings_account_response:
        instance.create_savings_transaction(transaction, account_data)
    return savings_account_response
