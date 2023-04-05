from models import CheckingAccountIn, CheckingAccountOut, UserOutWithPassword, UserOut
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


    def delete_checking_account(self, checking_account_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM checking_account
                    WHERE id=%s
                    """,
                    [checking_account_id]
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
                        (id, date, deposit, total_amount, account_number, routing_number)
                    VALUES
                        (%s, %s, %s, %s, %s, %s,)
                    RETURNING id;
                    """,
                    [
                        checking_account.id,
                        checking_account.date,
                        checking_account.deposit,
                        checking_account.total_amount,
                        checking_account.account_number,
                        checking_account.routing_number
                    ]
                )
                id = result.fetchone()[0]
                old_data=checking_account.dict()
                return CheckingAccountOut(id=id, **old_data)


    def get_one_checking_account(self, checking_account: str) -> CheckingAccountOut:
    #connect the DB
        with pool.connection() as conn:
            with conn.cursor() as db:
                #Run our SELECT
                result = db.execute(
                    """
                    SELECT id, date, deposit, total_amount, account_number, routing_number
                    FROM checking_account
                    WHERE username = %s
                    """,
                    [checking_account]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return CheckingAccountIn(
                    id=record[0],
                    date=record[1],
                    deposit=record[2],
                    total_amount=record[3],
                    account_number=record[4],
                    routing_number=record[5]
                    )


    def get_all_checking_accounts(self) -> List[CheckingAccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, account_number
                    FROM checking_account;
                    """
                )
                result = []
                for record in db:
                    id = CheckingAccountOut(
                        id=record[0],
                        account_number=record[1]
                    )
                    result.append(id)
                return result


    def checking_account_in_to_out(self, id: int, checking_account: CheckingAccountIn):
        old_data = checking_account.dict()
        return CheckingAccountOut(id=id, **old_data)
