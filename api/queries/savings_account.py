from models import SavingsAccountIn, SavingsAccountOut
from queries.pool import pool
from typing import List


class SavingsRepository:
    def savings_account_in_to_out(self, id: int, savings_account: SavingsAccountIn):
        old_data = savings_account.dict()
        return SavingsAccountIn(id=id, **old_data)


    def create_savings_account(self, savings_account: SavingsAccountIn) -> SavingsAccountOut:
        # connect the DB
        with pool.connection() as conn:
            with conn.cursor() as db:
                # Run our INSERT
                result = db.execute(
                    """
                    INSERT INTO savings_account
                        (total_amount, interest_rate, account_number, routing_number)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                    savings_account.total_amount,
                    savings_account.interest_rate,
                    savings_account.account_number,
                    savings_account.routing_number,
                    ]
                )
                id = result.fetchone()[0]
                old_data=savings_account.dict()
                return SavingsAccountOut(id=id, **old_data)


    def get_one_savings_account(self, account_number: str) -> SavingsAccountOut:
        #connect the DB
            with pool.connection() as conn:
                with conn.cursor() as db:
                    #Run our SELECT
                    result = db.execute(
                        """
                        SELECT id, total_amount, interest_rate, account_number, routing_number
                        FROM savings_account
                        WHERE account_number = %s
                        """,
                        [account_number]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return SavingsAccountOut(
                        id=record[0],
                        total_amount=record[1],
                        interest_rate=record[2],
                        account_number=record[3],
                        routing_number=record[4]
                        )


    def get_all_savings(self) -> List[SavingsAccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, account_number
                    FROM savings_account;
                    """
                )
                result = []
                for record in db:
                    savings_account = SavingsAccountOut(
                        id=record[0],
                        account_number=record[1]
                    )
                    result.append(savings_account)
                return result


    def update_savings_account(self, account_number: str, savings_account: SavingsAccountIn) -> SavingsAccountOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE savings_account
                    SET total_amount = %s
                        , interest_rate = %s
                        , account_number = %s
                        , routing_number = %s
                    WHERE id = %s
                    """,
                    [
                        savings_account.total_amount,
                        savings_account.interest_rate,
                        savings_account.account_number,
                        savings_account.routing_number
                    ]
                )
                return self.savings_account_in_to_out(id, savings_account)


    def delete_user(self, account_number: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM savings_account
                    WHERE id=%s
                    """,
                    [account_number]
                )
                return True
