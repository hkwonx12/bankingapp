from models import UserIn, UserOut, UserOutWithPassword
from queries.pool import pool
from typing import List


class UserRepository:
    def update_user(self, user_id: str, user: UserIn) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE users
                    SET username = %s
                      , hashed_password = %s
                      , email = %s
                      , address = %s
                      , phone = %s
                    WHERE id = %s
                    """,
                    [
                        user.username,
                        user.password,
                        user.email,
                        user.address,
                        user.phone,
                        user_id
                    ]
                )
                return self.user_in_to_out(user_id, user)


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


    def create_user(self, user:UserIn, hashed_password):
        # connect the DB
        with pool.connection() as conn:
            with conn.cursor() as db:
                # Run our INSERT
                result = db.execute(
                    """
                    INSERT INTO users
                        (username, hashed_password, email, address, phone, dob, checking, savings, investment)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                    user.username,
                    hashed_password,
                    user.email,
                    user.address,
                    user.phone,
                    user.dob,
                    user.checking,
                    user.savings,
                    user.investment
                    ]
                )
                id = result.fetchone()[0]
                old_data=user.dict()
                return UserOut(id=id, **old_data)


    def get_one_user(self, username: str) -> UserOutWithPassword:
    #connect the DB
        with pool.connection() as conn:
            with conn.cursor() as db:
                #Run our SELECT
                result = db.execute(
                    """
                    SELECT id, username, hashed_password, email, address, phone, dob, checking, savings, investment
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
                    dob=record[6],
                    checking=record[7],
                    savings=record[8],
                    investment=record[9]
                    )


    def get_all_users(self) -> List[UserOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, username
                    FROM users;
                    """
                )
                result = []
                for record in db:
                    user = UserOut(
                        id=record[0],
                        username=record[1]
                    )
                    result.append(user)
                return result


    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)
