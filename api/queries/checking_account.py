from models import CheckingAccountIn, CheckingAccountOut
from queries.pool import pool
from typing import List

class CheckingAccountRepository:
    def update_checking_account(self, checking_account_id: int, checking_account: CheckingAccountIn) -> CheckingAccountOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE checking_account
                    SET date = %s
                      , deposit = %s
                      , total_amount = %s
                      , account_number = %s
                      , routing_number = %s
                    WHERE id = %s
                    """,
                    [
                        checking_account.date,
                        checking_account.deposit,
                        checking_account.total_amount,
                        checking_account.account_number,
                        checking_account.routing_number,
                        checking_account_id
                    ]
                )
                return self.checking_account_in_to_out(checking_account_id, checking_account)


    def checking_account_in_to_out(self, id: int, checking_account: CheckingAccountIn):
        old_data = checking_account.dict()
        return CheckingAccountOut(id=id, **old_data)
