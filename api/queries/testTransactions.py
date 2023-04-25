from models import TransactionsIn, TransactionsOut, TransactionsOutWithDetails, TransactionCheckingIn
from queries.pool import pool
from typing import List


class TransactionsRepository:
    def transactions_in_to_out(self, id: int, transaction: TransactionsOutWithDetails):
        old_data = transaction.dict()
        return TransactionsOutWithDetails(id=id, **old_data)


    def create_transaction(self, transaction: TransactionsIn, account_data):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO transactions
                        (date, amount, institution, checking_account_id, savings_account_id, investment_account_id, owner_id)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                    transaction.date,
                    transaction.amount,
                    transaction.institution,
                    transaction.checking_account_id,
                    transaction.savings_account_id,
                    transaction.investment_account_id,
                    account_data['id']
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
                    SELECT id, date, amount, institution, checking_account_id, savings_account_id, investment_account_id
                    FROM transactions
                    WHERE id = %s
                    """,
                    [id]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return TransactionsOutWithDetails(
                    id=record[0],
                    date=record[1],
                    amount=record[2],
                    institution=record[3],
                    checking_account_id=record[4],
                    savings_account_id=record[5],
                    investment_account_id=record[6]
                )


    def get_all_transactions(self, account_data) -> List[TransactionsOutWithDetails]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, date, amount, institution, checking_account_id, savings_account_id, investment_account_id, owner_id
                    FROM transactions
                    WHERE owner_id = %s;
                    """, [account_data['id']]
                )
                result = []
                for record in db:
                    output = TransactionsOutWithDetails(
                        id=record[0],
                        date=record[1],
                        amount=record[2],
                        institution=record[3],
                        checking_account_id=record[4],
                        savings_account_id=record[5],
                        investment_account_id=record[6],
                        owner_id=record[7]
                    )
                    result.append(output)
                return result


    def update_transaction(self, id: int, transaction: TransactionsIn) -> TransactionsOutWithDetails:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE transactions
                    SET   date = %s
                        , amount = %s
                        , institution = %s
                        , checking_account_id = %s
                        , savings_account_id = %s
                        , investment_account_id = %s
                    WHERE id = %s
                    """,
                    [
                        transaction.date,
                        transaction.amount,
                        transaction.institution,
                        transaction.checking_account_id,
                        transaction.savings_account_id,
                        transaction.investment_account_id,
                        id

                    ]
                )
                return self.transactions_in_to_out(id, transaction)


    def delete_transaction(self, id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM transactions
                    WHERE id=%s
                    """,
                    [id]
                )
                return True
