# from models import BankAccountIn, BankAccountOut
# from queries.pool import pool

# class BankAccountRepository:
#     def create_bank_account(self, bank_account:BankAccountIn):
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 result = db.execute(
#                     """
#                     INSERT INTO bank_accounts
#                         (username, hashed_password, email, address, phone, dob, checking, savings, investment, user_id)
#                     VALUES
#                         (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#                     RETURNING id;
#                     """,
#                     [
#                     bank_account.username,
#                     bank_account.hashed_password,
#                     bank_account.email,
#                     bank_account.address,
#                     bank_account.phone,
#                     bank_account.dob,
#                     bank_account.checking,
#                     bank_account.savings,
#                     bank_account.investment,
#                     bank_account.user_id
#                     ]
#                 )
#                 id = result.fetchone()[0]
#                 old_data=bank_account.dict()
#                 return BankAccountOut(id=id, **old_data)


# def get_one_bank_account(self, username: str) -> BankAccountOut:
#     #connect the DB
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 #Run our SELECT
#                 result = db.execute(
#                     """
#                     SELECT id, username, hashed_password, email, address, phone, dob, checking, savings, investment, user_id
#                     FROM bank_account
#                     WHERE username = %s
#                     """,
#                     [username]
#                 )
#                 record = result.fetchone()
#                 if record is None:
#                     return None
#                 return BankAccountOut(
#                     id=record[0],
#                     username=record[1],
#                     hashed_password=record[2],
#                     email=record[3],
#                     address=record[4],
#                     phone=record[5],
#                     dob=record[6],
#                     checking=record[7],
#                     savings=record[8],
#                     investment=record[9],
#                     user_id=record[10]
#                     )
