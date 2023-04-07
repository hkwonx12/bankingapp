from models import TransactionsIn, TransactionsOut, TransactionsOutWithDetails
from queries.pool import pool
from typing import List


class TransactionsRepository:
    def transactions_in_to_out(self, id: int, transaction: TransactionsIn):
        old_data = transaction.dict()
        return TransactionsOutWithDetails(id=id, **old_data)


    def create_transaction(self, transaction: TransactionsIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO transactions
                        (date, amount, institution, checking_account_id, savings_account_id, investment_account_id)
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [

                    transaction.date,
                    transaction.amount,
                    transaction.institution,
                    transaction.checking_account_id,
                    transaction.savings_account_id,
                    transaction.investment_account_id

                    ]
                )
                id = result.fetchone()[0]
                old_data = transaction.dict()
                return TransactionsOut(id=id, **old_data)


    def get_one_transaction(self, id: int) -> TransactionsOutWithDetails:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, amount, institution, checking_account_id, savings_account_id, investment_account_id
                    FROM transaction
                    WHERE id = %s
                    """,
                    [id]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return TransactionsOutWithDetails(
                    id=record[0],
                    amount=record[1],
                    institution=record[2],
                    checking_account_id=record[3],
                    savings_account_id=record[4],
                    investment_account_id=record[5]
                )


    def get_all_transactions(self): -> List[TransactionsOut]
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                    FROM transaction;
                    """
                )
                result = []
                for record in db:
                    id = TransactionsOut(
                        id=record[0]
                    )
                    result.append(id)
                return result


    def update_transaction(self, id: int, transaction: TransactionsIn) -> TransactionsOutWithDetails:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE transaction
                    SET amount = %s
                        , institution = %s
                    WHERE checking_account_id = %s or
                    """
                )


    def delete_transaction(self, id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM transaction
                    WHERE id=%s
                    """,
                    [id]
                )
                return True
