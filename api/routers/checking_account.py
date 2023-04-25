from fastapi import APIRouter, Response, Depends, HTTPException, status
from models import CheckingAccountIn, CheckingAccountOut, CheckingAccountOutWithDetails, TransactionsIn, CheckingAccountUpdate, TransactionCheckingIn
from queries.accounts import DuplicateAccountError
from queries.checking_account import CheckingAccountRepository
from queries.transactions import TransactionsRepository
from authenticator import authenticator
from typing import List


router = APIRouter()

@router.post('/api/checking_account', response_model=CheckingAccountOut)
def create_checking_account(
    info: CheckingAccountIn,
    repo: CheckingAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),

):
    try:
        user_id = account_data['id']
        checking_account = repo.create_checking_account(info, user_id)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    return checking_account



@router.get('/api/checking_account', response_model=List[CheckingAccountOutWithDetails])
def get_all_checking_account(
    repo: CheckingAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_checking_accounts(account_data)


@router.get('/api/checking_account/{owner_id}', response_model=CheckingAccountOutWithDetails)
def get_one_checking_account(
    owner_id: int,
    response: Response,
    repo: CheckingAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> CheckingAccountOutWithDetails:
    checking_account = repo.get_one_checking_account(owner_id)
    if checking_account is None:
        response.status_code = 404
    return checking_account


@router.delete('/api/checking_account/{id}', response_model=bool)
def delete_checking_account(
    id: int,
    repo: CheckingAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_checking_account(id)


@router.put('/api/checking_account')
def update_checking_account(
    transaction: TransactionsIn,
    repo: CheckingAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    checking_account_response = repo.update_checking_account(transaction)
    instance = TransactionsRepository()
    if checking_account_response:
        instance.create_transaction(transaction, account_data)
    return checking_account_response
