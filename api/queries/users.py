from models import UserIn, UserOut, UserOutWithPassword, UserUpdateIn, UserUpdateOut, UserOutWithDetails
from queries.pool import pool
from typing import List


class UserRepository:
    def update_user(self, user: UserUpdateIn, account_data):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE users
                    SET email = %s
                      , full_name = %s
                      , address = %s
                      , phone = %s
                    WHERE id = %s
                    """,
                    [
                        user.email,
                        user.full_name,
                        user.address,
                        user.phone,
                        account_data['id']
                    ]
                )
                conn.commit()
                return {"email": user.email, "full_name": user.full_name,
                        "address": user.address, "phone": user.phone, "id": account_data['id']}

    def delete_user(self, user_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM users
                    WHERE id=%s
                    """,
                    [user_id]
                )
                return True

    def create_user(self, user: UserIn, hashed_password):

        with pool.connection() as conn:
            with conn.cursor() as db:

                result = db.execute(
                    """
                    INSERT INTO users
                        (full_name, username, hashed_password, email, address, phone, dob)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        user.full_name,
                        user.username,
                        hashed_password,
                        user.email,
                        user.address,
                        user.phone,
                        user.dob,
                    ]
                )
                id = result.fetchone()[0]
                old_data = user.dict()
                return UserOut(id=id, **old_data)

    def get_one_user(self, username: str) -> UserOutWithPassword:

        with pool.connection() as conn:
            with conn.cursor() as db:

                result = db.execute(
                    """
                    SELECT id, username, hashed_password, email, address, phone, dob
                    FROM users
                    WHERE username = %s
                    """,
                    [username]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return UserOutWithPassword(
                    id=record[0],
                    username=record[1],
                    hashed_password=record[2],
                    email=record[3],
                    address=[4],
                    phone=record[5],
                    dob=record[6]
                )

    def get_all_user_accounts(self) -> List[UserOutWithDetails]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        SELECT id, email, full_name, username, hashed_password, address, phone, dob
                        FROM users;
                        """
                )
                result = []
                for record in db:
                    user = UserOutWithDetails(
                        id=record[0],
                        email=record[1],
                        full_name=record[2],
                        username=record[3],
                        hashed_password=record[4],
                        address=record[5],
                        phone=record[6],
                        dob=record[7]
                    )
                    result.append(user)
                return result

    def get_all_users(self, account_data) -> List[UserOutWithDetails]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, email, full_name, username, hashed_password, address, phone, dob
                    FROM users
                    WHERE id = %s;
                    """, [account_data['id']]
                )
                result = []
                for record in db:
                    user = UserOutWithDetails(
                        id=record[0],
                        email=record[1],
                        full_name=record[2],
                        username=record[3],
                        hashed_password=record[4],
                        address=record[5],
                        phone=record[6],
                        dob=record[7]
                    )
                    result.append(user)
                return result

    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)
