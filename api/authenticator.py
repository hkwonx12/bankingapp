import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UserRepository
from queries.checking_account import CheckingAccountRepository
from models import UserOut, UserOutWithPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        user: UserRepository,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return user.get_one_user(username)

    async def get_checking_account_data(
            self,
            account_number: int,
            checking_account: CheckingAccountRepository
    ):
        return checking_account.get_one_user(account_number)


    def get_account_getter(
        self,
        user: UserRepository = Depends(),
    ):
        # Return the user. That's it.
        return user

    def get_hashed_password(self, user: UserOutWithPassword):
        # Return the encrypted password value from your
        # account object
        return user.hashed_password

    def get_account_data_for_cookie(self, user: UserOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return user.username, UserOut(**user.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
