## Project Documentation

# Croissant United Bank

- Adrian Olivares
- Aaron Cornwell
- Helen Kwon
- Matt Bowes

Croissant United Bank – Experience a taste of financial excellence with Croissant United Bank.

Croissant United Bank - From doughs to dollars, Trust Croissant United Bank.

Croissant United Bank - Let us butter you up with unbeatable investments at Croissant National Bank.

## Design

- [API design](docs/api.md)
- React Front End
- PostgreSQL Back End

  This project does not use real money to deposit into accounts. It is solely used to simulate some aspects of online banking experience. 

## Intended market

We are targeting general consumers in the banking market looking for a secure tailored banking experience. Consumers of the economy can enjoy checking, saving, and investing their hard-earned money.


## Functionality

- User can sign up for a general account:
    - User may view and edit their information

- Users of the site can sign up for:
  - Checking Account
    - Deposit money using a form and view statements instantaneously
    - View current balance
  - Savings Account
    - Deposit money using a form and view statements instantaneously
    - View current balance
  - Investment Account
    - Deposit money using a form and view statements instantaneously
    - View current balance
    - View real-time daily percent change in stock (QQQ)

One area where improvements can be made for a more seamless user experience is automatically re-directing the user to the deposit page when signing up so that when the page re-renders, it does not look as if their login or information has been lost. Another improvement that can be made is to show the initial deposits in the account transaction history. Stretch goals can include a withdrawal feature, having the username in the top right-hand corner to show that one is logged in, and making the investment page graph more viewable. 

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker compose build`
4. Run `docker compose up`
5. Enter `localhost:3000` in your browser, and enjoy Croissant United Bank to its fullest!
