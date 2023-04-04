# from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
# from models import BankAccountIn, BankAccountOut, AccountToken, AccountForm
# from authenticator import authenticator
# from queries.bank_account import BankAccountRepository
# from queries.accounts import DuplicateAccountError


# router = APIRouter()

# @router.post('/api/bank_accounts/', response_model=AccountToken)
# async def create_bank_account(
#     info: BankAccountIn,
#     request: Request,
#     response: Response,
#     repo: BankAccountRepository = Depends(),
# ):
#     try:
#         bank_account: repo.create_bank_account(info)
#     except DuplicateAccountError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Cannot create an account with those credentials",
#         )
#     form = AccountForm(username=info.username, )
