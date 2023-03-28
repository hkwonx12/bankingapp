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
      "account": {
        username: str,
        password: str
      },
      "token": string
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


## User Sign Up

* Endpoint path: /signup
* Endpoint method: POST

* Request shape (form):
    * username: str,
    * password: str,
    * full_name: str,
    * email: str,
    * address: str,
    * phone_number: int,
    * dob: date,
    * checking: bool,
    * savings: bool,
    * investment: bool,

* Response: Account information
* Response shape (JSON):
    ```json
    {
        "account": {
            username: str,
            password: str,
            full_name: str,
            email: str,
            address: str,
            phone_number: int,
            dob: date,
            checking: bool,
            savings: bool,
            investment: bool
        }
    }
    ```


## User Account

* Endpoint path: /account/
* Endpoint method: GET

* Response: Account information
* Response shape (JSON):
    ```json
    {
        "account": {
            username: str,
            password: str,
            full_name: str,
            email: str,
            address: str,
            phone_number: int,
            dob: date,
            checking: bool,
            savings: bool,
            investment: bool
        }
    }
    ```


## Edit User Account

* Endpoint path: /signup
* Endpoint method: PUT

* Request shape (form):
    * username: str,
    * password: str,
    * email: str,
    * address: str,
    * phone_number: int


* Response: Account information
* Response shape (JSON):
    ```json
    {
        "account": {
            username: str,
            password: str,
            email: str,
            address: str,
            phone_number: int
        }
    }
    ```


## Delete User Account

* Endpoint path: /account/
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


## View Checking Account

* Endpoint path: /checking/
* Endpoint method: GET

* Response: Checking Account information
* Response shape (JSON):
    ```json
    {
        "checking": {
            amount: int,
            company: varchar,
            date: date,
            checking_account_number: int,
        }
    }
    ```


## View Savings Account

* Endpoint path: /checking/
* Endpoint method: GET

* Response: Savings account information
* Response shape (JSON):
    ```json
    {
        "savings": {
            amount: int,
            company: varchar,
            date: date,
            savings_account_number: int,
        }
    }
    ```


## Deposit Money

* Endpoint path: /deposit/
* Endpoint method: POST

* Request shape (form):
    * routing_number: int,
    * account_number: int,
    * institution: varchar,
    * check_number: int,
    * amount: int,

* Response: Deposit information
* Response shape (JSON):
    ```json
    {
        "deposit": {
            routing_number: int,
            account_number: int,
            institution: varchar,
            check_number: int,
            amount: int,
        }
    }
    ```


## Transfer Funds

* Endpoint path: /transfer/
* Endpoint method: PUT

* Request shape (form):
    * savings_account_number: int, | OPTIONAL**
    * checkings_account_number: int, | OPTIONAL**
    * amount: int,
    * date: int,

* Response: Transfer information
* Response shape (JSON):
    ```json
    {
        "transfer": {
            amount: int,
            (FROM)account: int,
            (TO)account: int,
            date: date,


        }
    }

    ```


## Investment Account

* Endpoint path: /investment/
* Endpoint method: POST

* Request shape (form):

* Response:
* Response shape (JSON):
    ```json

    ```
