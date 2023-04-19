from models import CheckingAccountIn, CheckingAccountOut, CheckingAccountOutWithDetails, CheckingAccountUpdate, TransactionsIn
from queries.pool import pool
from typing import List

class CheckingAccountRepository:
    def update_checking_account(self, deposit: TransactionsIn):

        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE checking_account
                    SET total_amount = total_amount + %s
                    WHERE id = %s
                    """,
                    [
                        deposit.amount,
                        deposit.checking_account_id
                    ]
                )
                # data = db.fetchone()
                conn.commit()
                return {"amount": deposit.amount, "id": deposit.checking_account_id}
                # return data

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


    def create_checking_account(self, checking_account: CheckingAccountIn):
        # connect the DB
        with pool.connection() as conn:
            with conn.cursor() as db:
                # Run our INSERT
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
                        checking_account.owner_id
                    ]
                )
                id = result.fetchone()[0]
                old_data=checking_account.dict()
                return CheckingAccountOut(id=id, **old_data)


    def get_one_checking_account(self, owner_id: int) -> CheckingAccountOutWithDetails:
    #connect the DB
        with pool.connection() as conn:
            with conn.cursor() as db:
                #Run our SELECT
                result = db.execute(
                    """
                    SELECT id, total_amount, account_number, routing_number, owner_id
                    FROM checking_account
                    WHERE owner_id = %s
                    """,
                    [owner_id]
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


    def get_all_checking_accounts(self) -> List[CheckingAccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, account_number, owner_id
                    FROM checking_account;
                    """
                )
                result = []
                for record in db:
                    id = CheckingAccountOut(
                        id=record[0],
                        account_number=record[1],
                        owner_id=record[2]
                    )
                    result.append(id)
                return result


    def checking_account_in_to_out(self, id: int, checking_account: CheckingAccountUpdate):
        old_data = checking_account.dict()
        return CheckingAccountUpdate(id=id, **old_data)
