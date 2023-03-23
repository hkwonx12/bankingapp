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

* Response:
* Response shape (JSON):
    ```json

    ```
