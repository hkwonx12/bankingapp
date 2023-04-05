steps = [
    [

        """
        CREATE TABLE checking_account (
            id SERIAL PRIMARY KEY NOT NULL,
            total_amount MONEY,
            account_number BIGINT UNIQUE NOT NULL,
            routing_number BIGINT NOT NULL
        );
        """,

        """
        DROP TABLE checking_account;
        """

    ]
]
