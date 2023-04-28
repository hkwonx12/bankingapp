### Login

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "access_token": str,
        "token_type": "Bearer"
    }
    ```


### Logout

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


## Create User

* Endpoint path: /users
* Endpoint method: POST

* Request shape (form):
    * email: str,
    * full_name: str,
    * username: str,
    * password: str,
    * address: str,
    * phone_number: int,
    * dob: date,


* Response: Account information
* Response shape (JSON):
    ```json
    {
        "account": {
            email: str,
            full_name: str,
            username: str,
            password: str,
            address: str,
            phone_number: int,
            dob: date,
        }
    }
    ```


## Get All Users

* Endpoint path: /users
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Account information
* Response shape (JSON):
    ```json
    {
        "account": {
            id: int,
            email: str,
            full_name: str,
            username: str,
            hashed_password: str,
            address: str,
            phone_number: int,
            dob: date,
        }
    }
    ```

## Get All User Accounts

* Endpoint path: /all_users
* Endpoint method: GET

* Response: Account information
* Response shape (JSON):
    ```json
    [
        {

            id: int,
            email: str,
            full_name: str,
            username: str,
            hashed_password: str,
            address: str,
            phone_number: int,
            dob: date,

        }
    ]
    ```


## Edit User Account

* Endpoint path: /users/{username}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (form):
    * email: str,
    * full_name: str,
    * address: str,
    * phone: str


* Response: Account information
* Response shape (JSON):
    ```json
    {
        "account": {

            email: str,
            full_name: str,
            address: str,
            phone: str
        }
    }
    ```


## Delete User Account

* Endpoint path: /users/{user_id}
* Endpoint method: DELETE

* Request shape:
    * user_id: int

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

## Get Token
* Endpoint path: /token
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Token
* Response shape (JSON):
    ```json
    {
        access_token: str,
        token_type: "Bearer",
        "user" :{
            "id": int,
            "username": str
        }
    }

    ```

## Create Checking Account
* Endpoint path: /checking_account
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Response: Create Checking Account
* Request Shape (JSON):
    ```json
    {
    total_amount: int
    }
    ```


## Get All Checking Account

* Endpoint path: /checking_account
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Checking Account information
* Response shape (JSON):
    ```json
    [
         {
            id: int,
            total_amount: int,
            routing_number: int,
            owner_id: int
        }
    ]
    ```

## Get One Checking Account
* Endpoint path: /checking_account/{owner_id}
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Request Body (JSON):
    ```json
    {
        owner_id: int
    }
    ```

* Response: Checking Account information
* Response shape (JSON):
    ```json
    [
         {
            id: int,
            total_amount: int,
            routing_number: int,
            owner_id: int
        }
    ]
    ```

## Update Checking Account

* Endpoint path:/checking_account
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Response: Update Checking Account
* Request Shape (JSON):
    ```json
    {
    date: date,
    amount: int,
    institution: string
    }
    ```
* Headers:
  * Authorization: Bearer token

## Delete Checking Account
* Endpoint path: /checking_account/{owner_id}
* Endpoint method: DELETE

* Request shape:
    * owner_id: int

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


## View Savings Account

* Endpoint path: /savings_account
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Savings account information
* Response shape (JSON):
    ```json
    {
        "savings": {
            id:,
            total_amount: int,
            interest_rate: int,
            routing_number: int,

        }
    }
    ```

## Update Savings Account

* Endpoint path: /savings_account
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Response: Update Savings account
* Response shape (JSON):
    ```json
    {
        "savings": {

            date: string,
            amount: int,
            institution: int,

        }
    }
    ```

## Create Savings Account

* Endpoint path: /savings_account
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Response: Create Savings account
* Response shape (JSON):
    ```json
    {
        "savings": {

            total_amount: int

        }
    }
    ```

## Get one Savings Account

* Endpoint path: /savings_account/owner_id
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Response: Get one Savings account
* Response shape (JSON):
    ```json
    {
        "savings": {

            id: int,
            total_amount: int,
            interest_rate: int,
            routing_numbeR: int,
            owner_id: int

        }
    }
    ```

## Delete Savings Account

* Endpoint path: /savings_account/{id}}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Delete one Savings account
* Response shape (JSON):
    ```json
    {
        "savings": {


        }
    }
    ```


## Get All Investment Account

* Endpoint path: /investment_account
* Endpoint method: GET


## Update Investment Account

* Endpoint path: /investment_account
* Endpoint method: PUT

* Response: Update Investment Account
* Headers:
  * Authorization: Bearer token
* Request Shape (JSON):
    ```json
    {
    date: date,
    amount: int,
    institution: string
    }
    ```

## Create Investment Account

* Endpoint path: /investment_account
* Endpoint method: POST

* Response: Create Investment Account
* Headers:
  * Authorization: Bearer token
* Request Shape (JSON):
    ```json
    {
    total_amount: int
    }
    ```

## Get Investment Account

* Endpoint path: /investment_account/{owner_id}
* Endpoint method: GET

* Response: Get Investment Account
* Headers:
  * Authorization: Bearer token
* Response Shape (JSON):
    ```json
    {
    id: int,
    total_amount: int,
    investment_value: int,
    owner_id: int
    }
    ```
## Delete Investment Account
* Endpoint path: /investment_account/{id}
* Endpoint method: Delete
* Headers:
  * Authorization: Bearer token

## Get All Transactions

* Endpoint path: /transactions
* Endpoint method: GET

* Response: All Transactions accounts
* Headers:
  * Authorization: Bearer token
* Response shape (JSON):
    ```json
    [
        {
        id: int,
        date: date,
        amount: int,
        institution: string,
        checking_account_id: int,
        savings_account_id: int,
        investment_account_id: int,
        owner_id: int
        }
    ]

    ```
## Create Transaction

* Endpoint path: /transactions
* Endpoint method: POST

* Response: Create Savings account
* Headers:
  * Authorization: Bearer token
* Response shape (JSON):
    ```json
    {
    date: date,
    amount: int,
    institution: string,
    checking_account_id: int,
    savings_account_id: int,
    investment_account_id: int,
    }
    ```
## Get One Transaction

* Endpoint path: /transaction/{id}
* Endpoint method: GET

* Response: Get One Transaction
* Headers:
  * Authorization: Bearer token
* Response Shape (JSON):
    ```json
    {
    id: int,
    date: date,
    amount: int,
    institution: string,
    checking_account_id: int,
    savings_account_id: int,
    investment_account_id: int,
    owner_id: int
    }
    ```
## Update Transaction

* Endpoint path: /transactions
* Endpoint method: PUT

* Response: Update Transaction
* Headers:
  * Authorization: Bearer token
* Request Shape (JSON):
    ```json
    {
    date: date,
    amount: int,
    institution: string,
    checking_account_id: int,
    savings_account_id: int,
    investment_account_id: int,
    }
    ```
## Delete Transaction
* Endpoint path: /transactions/{id}
* Endpoint method: Delete
* Headers:
  * Authorization: Bearer token
