from models import InvestmentAccountIn, InvestmentAccountOut, InvestmentAccountOutWithDetails
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
                        INSERT INTO investment_account
                            (total_amount, investment_value, account_number, owner_id)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                        investment_account.total_amount,
                        investment_account.investment_value,
                        investment_account.account_number,
                        investment_account.owner_id
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data=investment_account.dict()
                    return InvestmentAccountOut(id=id, **old_data)


    def get_one_investment_account(self, owner_id: int) -> InvestmentAccountOutWithDetails:
        #connect the DB
            with pool.connection() as conn:
                with conn.cursor() as db:
                    #Run our SELECT
                    result = db.execute(
                        """
                        SELECT id, total_amount, investment_value, account_number, owner_id
                        FROM investment_account
                        WHERE owner_id = %s
                        """,
                        [owner_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return InvestmentAccountOutWithDetails(
                        id=record[0],
                        total_amount=record[1],
                        investment_value=record[2],
                        account_number=record[3],
                        owner_id=record[4]
                        )


    def get_all_investment_accounts(self) -> List[InvestmentAccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, account_number
                    FROM investment_account;
                    """
                )
                result = []
                for record in db:
                    id = InvestmentAccountOut(
                        id=record[0],
                        account_number=record[1]
                    )
                    result.append(id)
                return result


    def update_investment_account(self, owner_id: int, investment_account: InvestmentAccountIn) -> InvestmentAccountOutWithDetails:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE investment_account
                    SET account_number = %s
                      , total_amount = %s
                      , investment_value = %s
                    WHERE owner_id = %s
                    """,
                    [
                        investment_account.account_number,
                        investment_account.total_amount,
                        investment_account.investment_value,
                        owner_id
                    ]
                )
                return self.investment_account_in_to_out(id, investment_account)


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
