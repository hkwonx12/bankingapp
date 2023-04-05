from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
from models import InvestmentAccountIn, InvestmentAccountOut, AccountToken
from queries.accounts import DuplicateAccountError
from queries.users import InvestmentAccountRepository
from authenticator import authenticator
from typing import List



router = APIRouter()


@router.post('/api/users', response_model=AccountToken)
async def create_user(
    info: InvestmentAccountIn,
    request: Request,
    response: Response,
    repo: InvestmentAccountRepository = Depends(),
):
    account_number = # account number logic
    try:
        user = repo.create_user(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    print(form)
    token = await authenticator.login(response, request, form, repo)
    print(token)
    return AccountToken(user=user, **token.dict())
