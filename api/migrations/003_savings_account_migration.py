steps = [

    [
        """
        CREATE TABLE savings_account (
            id SERIAL PRIMARY KEY NOT NULL,
            total_amount MONEY NOT NULL,
            interest_rate FLOAT4 NOT NULL,
            account_number BIGINT UNIQUE NOT NULL,
            routing_number BIGINT NOT NULL
        );
        """,

        """
        DROP TABLE savings_account;
        """

    ],
    [

        """
        CREATE TABLE investment_account (
            id SERIAL PRIMARY KEY NOT NULL,
            total_amount MONEY NOT NULL,
            investment_value FLOAT4 NOT NULL,
            account_number BIGINT UNIQUE NOT NULL
        );
        """,

        """
        DROP TABLE investment_account;
        """
    ],
    [
        """
        CREATE TABLE deposit (
            id SERIAL PRIMARY KEY NOT NULL,
            date DATE NOT NULL,
            deposit MONEY NOT NULL,
            institution VARCHAR(250) NOT NULL
        );
        """,

        """
        DROP TABLE investment_account;
        """
    ]
]
