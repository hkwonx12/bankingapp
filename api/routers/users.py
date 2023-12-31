from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
from models import UserIn, UserUpdateIn, UserOut, UserOutWithDetails, AccountForm, AccountToken
from queries.accounts import DuplicateAccountError
from queries.users import UserRepository
from authenticator import authenticator
from typing import List


router = APIRouter()


@router.post('/api/users', response_model=AccountToken)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = repo.create_user(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(user=user, **token.dict())


@router.get('/api/all_users', response_model=List[UserOutWithDetails])
def get_all_user_accounts(
    repo: UserRepository = Depends(),

):
    return repo.get_all_user_accounts()


@router.get('/api/users', response_model=List[UserOutWithDetails])
def get_all_users(
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),

):
    return repo.get_all_users(account_data)


@router.get('/api/users/{username}', response_model=UserOut)
def get_one_user(
    username: str,
    response: Response,
    repo: UserRepository = Depends(),
) -> UserOut:
    user = repo.get_one_user(username)
    if user is None:
        response.status_code = 404
    return user


@router.delete('/api/users/{user_id}', response_model=bool)
def delete_user(
    user_id: int,
    repo: UserRepository = Depends(),
) -> bool:
    return repo.delete_user(user_id)


@router.put('/api/users')
def update_user(
    user: UserUpdateIn,
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),

):
    return repo.update_user(user, account_data)


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }
