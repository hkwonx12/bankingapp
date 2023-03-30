steps = [
    [
        ## Create the table
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(250) NOT NULL,
            hashed_password VARCHAR(250) NOT NULL,
            email VARCHAR(250) NOT NULL
        );
        """,

        ## Drop the table
        """
        DROP TABLE users;
        """,

        """
        CREATE TABLE bank_accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(250) NOT NULL,
            password VARCHAR(250) NOT NULL,
            email VARCHAR(250) NOT NULL,
            address TEXT NOT NULL,
            phone TEXT NOT NULL,
            dob DATE NOT NULL,
            checking BOOL NOT NULL,
            savings BOOL NOT NULL,
            investment BOOL NOT NULL
        );
        """,

        """
        DROP TABLE bank_accounts;
        """

    ]
]
