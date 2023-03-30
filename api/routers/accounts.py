from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
from models import UserIn, AccountForm, AccountToken
from queries.accounts import DuplicateAccountError
from queries.users import UserRepository
from authenticator import authenticator

router = APIRouter()

@router.post('/api/users')
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(user=user, **token.dict())
