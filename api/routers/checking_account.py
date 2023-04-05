from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
from models import CheckingAccountIn, CheckingAccountOut, CheckingForm, AccountToken
from queries.accounts import DuplicateAccountError
from queries.users import UserRepository
from queries.checking_account import CheckingAccountRepository
from authenticator import authenticator
from typing import List


router = APIRouter()

@router.post('/api/checking_account', response_model=CheckingAccountOut)
async def create_checking_account(
    info: CheckingAccountIn,
    # request: Request,
    # response: Response,
    repo: CheckingAccountRepository = Depends(),
    # checking_account: dict = Depends(authenticator.get_checking_account_data),


):
    try:
        checking_account = repo.create_checking_account(info)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    # form = CheckingForm(checking_account=info)
    # print(form)
    # token = await authenticator.login(response, request, repo)
    return checking_account



# @router.post('/api/logout/')
# async def logout_user(

# )


@router.get('/api/checking_account', response_model=List[CheckingAccountOut])
def get_all_checking_account(
    repo: CheckingAccountRepository = Depends(),
):
    return repo.get_all_checking_accounts()


@router.get('/api/checking_account/{checking_account}', response_model=CheckingAccountOut)
def get_one_checking_account(
    checking_account: str,
    response: Response,
    repo: CheckingAccountRepository = Depends(),
) -> CheckingAccountOut:
    checking_account = repo.get_one_checking_account(checking_account)
    if checking_account is None:
        response.status_code = 404
    return checking_account


@router.delete('/api/checking_account/{account_number}', response_model=bool)
def delete_checking_account(
    account_number: int,
    repo: CheckingAccountRepository = Depends(),
) -> bool:
    return repo.delete_checking_account(account_number)


@router.put('/api/checking_account/{account_number}', response_model=CheckingAccountOut)
def update_checking_account(
    account_number: int,
    checking_account: CheckingAccountIn,
    repo: UserRepository = Depends(),
) -> CheckingAccountOut:
    return repo.update_checking_account(account_number, checking_account)
