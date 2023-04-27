from models import InvestmentAccountIn, InvestmentAccountOut, InvestmentAccountOutWithDetails, TransactionsIn, TransactionsTestIn
from queries.pool import pool
from typing import List



class InvestmentAccountRepository:
    def create_investment_account(self, investment_account:InvestmentAccountIn, user_id: int):
            # connect the DB
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Run our INSERT
                    result = db.execute(
                        """
                        INSERT INTO investment_account
                            (total_amount, owner_id)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                        investment_account.total_amount,
                        user_id

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


    def get_all_investment_accounts(self, account_data) -> List[InvestmentAccountOutWithDetails]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, account_number, total_amount, investment_value, owner_id
                    FROM investment_account
                    WHERE owner_id = %s;
                    """, [account_data['id']]
                )
                result = []
                for record in db:
                    id = InvestmentAccountOutWithDetails(
                        id=record[0],
                        account_number=record[1],
                        total_amount=record[2],
                        investment_value=record[3],
                        owner_id=record[4]

                    )
                    result.append(id)
                return result


    def update_investment_account(self, deposit: TransactionsTestIn, account_data):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE investment_account
                    SET total_amount = total_amount + %s
                    WHERE owner_id = %s
                    """,
                    [
                       deposit.amount,
                       account_data['id']
                    ]
                )
                conn.commit()
                return {"amount": deposit.amount, "id": account_data['id']}


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

    def investment_account_in_to_out(self, id: int, investment_account: InvestmentAccountOutWithDetails):
            old_data = investment_account.dict()
            return InvestmentAccountOutWithDetails(id=id, **old_data)
