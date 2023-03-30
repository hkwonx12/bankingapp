from models import UserIn, UserOut, UserOutWithPassword
from queries.pool import pool

class UserRepository:
    def create(self, user:UserIn, hashed_password):
        # connect the DB
        with pool.connection() as conn:
            with conn.cursor() as db:
                # Run our INSERT
                result = db.execute(
                    """
                    INSERT INTO users
                        (username, hashed_password, email)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                    user.username,
                    hashed_password,
                    user.email
                    ]
                )
                id = result.fetchone()[0]
                old_data=user.dict()
                return UserOut(id=id, **old_data)

    def get(self, username: str) -> UserOutWithPassword:
    #connect the DB
        with pool.connection() as conn:
            with conn.cursor() as db:
                #Run our SELECT
                result = db.execute(
                    """
                    SELECT id, username, hashed_password, email
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
                    email=record[3]
                    )
