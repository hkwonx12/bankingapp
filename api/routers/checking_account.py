from fastapi import APIRouter, Response, Depends, HTTPException, status
from models import CheckingAccountIn, CheckingAccountOut, CheckingAccountOutWithDetails
from queries.accounts import DuplicateAccountError
from queries.checking_account import CheckingAccountRepository
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
        checking_account = repo.create_checking_account(info)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    return checking_account



@router.get('/api/checking_account', response_model=List[CheckingAccountOut])
def get_all_checking_account(
    repo: CheckingAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_checking_accounts()


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


@router.put('/api/checking_account/{id}', response_model=CheckingAccountOutWithDetails)
def update_checking_account(
    id: int,
    checking_account: CheckingAccountIn,
    repo: CheckingAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> CheckingAccountOutWithDetails:
    return repo.update_checking_account(id, checking_account)