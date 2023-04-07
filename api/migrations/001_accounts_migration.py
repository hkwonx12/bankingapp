steps = [
    [
        """
            CREATE TABLE users (
                id SERIAL PRIMARY KEY NOT NULL,
                username VARCHAR(250) NOT NULL UNIQUE,
                hashed_password VARCHAR(250) NOT NULL,
                email VARCHAR(250) NOT NULL,
                address VARCHAR(250) NOT NULL,
                phone TEXT NOT NULL,
                dob DATE NOT NULL,
                checking BOOL NOT NULL,
                savings BOOL NOT NULL,
                investment BOOL NOT NULL
        );
        """,

        """
        DROP TABLE users
        """

    ],

    [
        """
        CREATE TABLE checking_account (
            id SERIAL PRIMARY KEY NOT NULL,
            total_amount MONEY,
            account_number BIGINT UNIQUE NOT NULL,
            routing_number BIGINT NOT NULL,
            owner_id INTEGER NOT NULL REFERENCES users("id") ON DELETE CASCADE

        );
        """,

        """
        DROP TABLE checking_account
        """
    ],

    [
        """
        CREATE TABLE savings_account (
            id SERIAL PRIMARY KEY NOT NULL,
            total_amount MONEY NOT NULL,
            interest_rate FLOAT4 NOT NULL,
            account_number BIGINT UNIQUE NOT NULL,
            routing_number BIGINT NOT NULL,
            owner_id INTEGER NOT NULL REFERENCES users("id") ON DELETE CASCADE

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
            account_number BIGINT UNIQUE NOT NULL,
            owner_id INTEGER NOT NULL REFERENCES users("id") ON DELETE CASCADE

        );
        """,

        """
        DROP TABLE investment_account;
        """
    ],

    [
        """
        CREATE TABLE transactions (
            id SERIAL PRIMARY KEY NOT NULL,
            date DATE NOT NULL,
            amount MONEY NOT NULL,
            institution VARCHAR(250) NOT NULL,
            checking_account_id INTEGER REFERENCES checking_account("id") ON DELETE CASCADE,
            savings_account_id INTEGER REFERENCES savings_account("id") ON DELETE CASCADE,
            investment_account_id INTEGER REFERENCES investment_account("id") ON DELETE CASCADE
        );
        """,

        """
        DROP TABLE transactions;
        """

    ]
]
