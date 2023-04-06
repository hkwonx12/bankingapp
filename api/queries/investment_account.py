from models import InvestmentAccountIn, InvestmentAccountOut
from queries.pool import pool
from typing import List



class InvestmentAccountRepository:
    def create_investment_account(self, investment_account:InvestmentAccountIn):
            # connect the DB
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Run our INSERT
                    result = db.execute(
                        """
                        INSERT INTO users
                            (date, total_amount, investment_value, account_number)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                        investment_account.date,
                        investment_account.total_amount,
                        investment_account.investment_value,
                        investment_account.account_number,
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data=investment_account.dict()
                    return InvestmentAccountOut(id=id, **old_data)


    def get_one_investment_account(self, account_number: int) -> InvestmentAccountOut:
        #connect the DB
            with pool.connection() as conn:
                with conn.cursor() as db:
                    #Run our SELECT
                    result = db.execute(
                        """
                        SELECT id, date, total_amount, investment_value, account_number
                        FROM investment_account
                        WHERE account_number = %s
                        """,
                        [account_number]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return InvestmentAccountOut(
                        id=record[0],
                        date=record[1],
                        total_amount=record[2],
                        investment_value=[3],
                        account_number=record[4],
                        )

    def update_investment_account(self, account_number: int, investment_account: InvestmentAccountIn) -> InvestmentAccountOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE users
                    SET date = %s
                      , total_amount = %s
                      , invesment_value = %s
                      , account_number = %s
                    WHERE id = %s
                    """,
                    [
                        investment_account.date,
                        investment_account.total_amount,
                        investment_account.investment_value,
                        account_number
                    ]
                )
                return self.user_in_to_out(account_number, investment_account)


    def delete_investment_account(self, investment_account_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM investment_account
                    WHERE id=%s
                    """,
                    [investment_account_id]
                )
                return True

    def investment_account_in_to_out(self, id: int, investment_account: InvestmentAccountIn):
            old_data = investment_account.dict()
            return InvestmentAccountIn(id=id, **old_data)
