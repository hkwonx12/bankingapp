steps = [
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            full_name VARCHAR(250) NOT NULL,
            username VARCHAR(250) NOT NULL UNIQUE,
            hashed_password VARCHAR(250) NOT NULL,
            email VARCHAR(250) NOT NULL,
            address VARCHAR(250) NOT NULL,
            phone TEXT NOT NULL,
            dob DATE NOT NULL
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
            total_amount FLOAT4 DEFAULT 0 NOT NULL,
            account_number SERIAL UNIQUE NOT NULL,
            routing_number BIGINT DEFAULT '72933358430' NOT NULL,
            owner_id SERIAL NOT NULL REFERENCES users("id") ON DELETE CASCADE

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
            total_amount FLOAT4 DEFAULT 0 NOT NULL,
            interest_rate FLOAT4 NOT NULL,
            account_number SERIAL UNIQUE NOT NULL,
            routing_number BIGINT DEFAULT '72933358430' NOT NULL,
            owner_id SERIAL NOT NULL REFERENCES users("id") ON DELETE CASCADE

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
            total_amount FLOAT4 DEFAULT 0 NOT NULL,
            investment_value INT NOT NULL,
            account_number SERIAL UNIQUE NOT NULL,
            owner_id SERIAL NOT NULL REFERENCES users("id") ON DELETE CASCADE

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
            amount FLOAT4 NOT NULL,
            institution VARCHAR(250),
            checking_account_id INT REFERENCES checking_account("id") ON DELETE CASCADE,
            savings_account_id INT REFERENCES savings_account("id") ON DELETE CASCADE,
            investment_account_id INT REFERENCES investment_account("id") ON DELETE CASCADE,
            owner_id INT NOT NULL REFERENCES users("id") ON DELETE CASCADE
        );
        """,

        """
        DROP TABLE transactions;
        """

    ]
]
