# from models import SavingsAccountIn, SavingsAccountOut, SavingsForm
# from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
# from queries.accounts import DuplicateAccountError
# from queries.savings_account import SavingsRepository
# from authenticator import authenticator
# from typing import List


# router = APIRouter()

# @router.post('/api/savingsaccount', response_model=SavingsAccountIn)
# async def create_savings_account(
#     info: SavingsAccountIn,
#     request: Request,
#     response: Response,
#     repo: SavingsRepository = Depends(),
# ):
#     account_number = #logic for creating random account
#     try:
#         savings_account = repo.create_savings_account(info)
#     except DuplicateAccountError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Cannot create an account with those credentials",
#         )
#     form = SavingsForm(account_number=info.account_number)
