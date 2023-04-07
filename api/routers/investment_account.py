from fastapi import APIRouter, Response, Depends, HTTPException, status
from models import InvestmentAccountIn, InvestmentAccountOut, InvestmentAccountOutWithDetails
from queries.accounts import DuplicateAccountError
from queries.investment_account import InvestmentAccountRepository
from authenticator import authenticator
from typing import List



router = APIRouter()

@router.post('/api/investment_account', response_model=InvestmentAccountOut)
def create_investment_account(
    info: InvestmentAccountIn,
    repo: InvestmentAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),

):
    try:
        investment_account = repo.create_investment_account(info)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    return investment_account


@router.get('/api/investment_account', response_model=List[InvestmentAccountOut])
def get_all_investment_account(
    repo: InvestmentAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_investment_accounts()

@router.get('/api/investment_account/{owner_id}', response_model=InvestmentAccountOutWithDetails)
def get_one_investment_account(
    owner_id: int,
    response: Response,
    repo: InvestmentAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> InvestmentAccountOutWithDetails:
    investment_account = repo.get_one_investment_account(owner_id)
    if investment_account is None:
        response.status_code = 404
    return investment_account

@router.put('/api/investment_account/{owner_id}', response_model=InvestmentAccountOutWithDetails)
def update_investment_account(
    owner_id: int,
    investment_account: InvestmentAccountIn,
    repo: InvestmentAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> InvestmentAccountOutWithDetails:
    return repo.update_investment_account(owner_id, investment_account)




@router.delete('/api/checking_account/{id}', response_model=bool)
def delete_investment_account(
    id: int,
    repo: InvestmentAccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_investment_account(id)
