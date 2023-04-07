from models import SavingsAccountIn, SavingsAccountOut, SavingsAccountOutWithDetails
from queries.pool import pool
from typing import List


class SavingsRepository:
    def savings_account_in_to_out(self, id: int, savings_account: SavingsAccountIn):
        old_data = savings_account.dict()
        return SavingsAccountIn(id=id, **old_data)


    def create_savings_account(self, savings_account: SavingsAccountIn):
        # connect the DB
        with pool.connection() as conn:
            with conn.cursor() as db:
                # Run our INSERT
                result = db.execute(
                    """
                    INSERT INTO savings_account
                        (total_amount, interest_rate, account_number, routing_number, owner_id)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                    savings_account.total_amount,
                    savings_account.interest_rate,
                    savings_account.account_number,
                    savings_account.routing_number,
                    savings_account.owner_id
                    ]
                )
                id = result.fetchone()[0]
                old_data=savings_account.dict()
                return SavingsAccountOut(id=id, **old_data)


    def get_one_savings_account(self, owner_id: int) -> SavingsAccountOutWithDetails:
        #connect the DB
            with pool.connection() as conn:
                with conn.cursor() as db:
                    #Run our SELECT
                    result = db.execute(
                        """
                        SELECT id, total_amount, interest_rate, account_number, routing_number, owner_id
                        FROM savings_account
                        WHERE owner_id = %s
                        """,
                        [owner_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return SavingsAccountOutWithDetails(
                        id=record[0],
                        total_amount=record[1],
                        interest_rate=record[2],
                        account_number=record[3],
                        routing_number=record[4],
                        owner_id=record[5]
                        )


    def get_all_savings_accounts(self) -> List[SavingsAccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, account_number, owner_id
                    FROM savings_account;
                    """
                )
                result = []
                for record in db:
                    id = SavingsAccountOut(
                        id=record[0],
                        account_number=record[1],
                        owner_id=record[2]
                    )
                    result.append(id)
                return result


    def update_savings_account(self, id: str, savings_account: SavingsAccountIn) -> SavingsAccountOutWithDetails:
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
                        savings_account.routing_number,
                        id
                    ]
                )
                return self.savings_account_in_to_out(id, savings_account)


    def delete_savings_account(self, id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM savings_account
                    WHERE id=%s
                    """,
                    [id]
                )
                return True
