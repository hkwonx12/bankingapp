from models import CheckingAccountIn, CheckingAccountOut, CheckingAccountOutWithDetails, CheckingAccountUpdate, TransactionsTestIn
from queries.pool import pool
from typing import List


class CheckingAccountRepository:
    def update_checking_account(
            self, deposit: TransactionsTestIn, account_data):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE checking_account
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

    def delete_checking_account(self, id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM checking_account
                    WHERE id=%s
                    """,
                    [id]
                )
                return True

    def create_checking_account(
            self, checking_account: CheckingAccountIn, account_data):

        with pool.connection() as conn:
            with conn.cursor() as db:

                result = db.execute(
                    """
                    INSERT INTO checking_account
                        (total_amount, owner_id)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                    [
                        checking_account.total_amount,
                        account_data['id']
                    ]
                )
                id = result.fetchone()[0]
                old_data = checking_account.dict()
                return CheckingAccountOut(id=id, **old_data)

    def get_one_checking_account(
            self, account_data) -> CheckingAccountOutWithDetails:

        with pool.connection() as conn:
            with conn.cursor() as db:

                result = db.execute(
                    """
                    SELECT id, total_amount, account_number, routing_number, owner_id
                    FROM checking_account
                    WHERE owner_id = %s
                    """,
                    [account_data['id']]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return CheckingAccountOutWithDetails(
                    id=record[0],
                    total_amount=record[1],
                    account_number=record[2],
                    routing_number=record[3],
                    owner_id=record[4]
                )

    def get_all_checking_accounts(
            self, account_data) -> List[CheckingAccountOutWithDetails]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, total_amount, account_number, routing_number, owner_id
                    FROM checking_account
                    WHERE owner_id = %s;
                    """, [account_data['id']]
                )
                result = []
                for record in db:
                    id = CheckingAccountOutWithDetails(
                        id=record[0],
                        total_amount=record[1],
                        account_number=record[2],
                        routing_number=record[3],
                        owner_id=record[4]
                    )
                    result.append(id)
                return result

    def checking_account_in_to_out(
            self, id: int, checking_account: CheckingAccountUpdate):
        old_data = checking_account.dict()
        return CheckingAccountUpdate(id=id, **old_data)
