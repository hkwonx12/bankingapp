from fastapi import APIRouter, Response, Depends, HTTPException, status
from models import TransactionsIn, TransactionsOut, TransactionsOutWithDetails
from queries.accounts import DuplicateAccountError
from queries.transactions import TransactionsRepository
from authenticator import authenticator
from typing import List


router = APIRouter()


@router.post('/api/transactions', response_model=TransactionsOut)
def create_transaction(
    info: TransactionsIn,
    repo: TransactionsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        transaction = repo.create_transaction(info)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a transaction with that data",
        )
    return transaction


@router.get('/api/transactions', response_model=List[TransactionsOut])
def get_all_transactions(
    repo: TransactionsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_transactions()


@router.get('/api/transactions/{id}', response_model=TransactionsOutWithDetails)
def get_one_transaction(
    id: int,
    response: Response,
    repo: TransactionsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> TransactionsOutWithDetails:
    transaction = repo.get_one_transaction(id)
    if transaction is None:
        response.status_code = 404
    return transaction


@router.delete('/api/transactions/{id}', response_model=bool)
def delete_transaction(
    id: int,
    repo: TransactionsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_transaction(id)


@router.put('/api/savings_account/{id}', response_model=TransactionsOutWithDetails)
def update_savings_account(
    id: int,
    transaction: TransactionsIn,
    repo: TransactionsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> TransactionsOutWithDetails:
    return repo.update_transaction_account(id, transaction)
