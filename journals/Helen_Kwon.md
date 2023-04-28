# March 20, 2023
The team worked on completing the Code of Conduct. We came up with ideas for the module 3 project.
We will work on a Bank App that simulates real-life banking with pseudo money.
We came up with MVP for the project.


# March 21, 2023
We created the wire-frame today on excalidraw. This helped us to flesh out what we want the app to look like,
and what kind of components/features we want to create.


# March 22, 2023
We cleaned up the wire-frame today and began the api design.


# March 23, 2023
We finished up the wireframe today and added more details to the features. We cleared up what kind of data we want to work with today.
We planned for a rough timeline of how we want to work on the project.


# March 24, 2023
We decided as a group to use SQL as our database. We will continue to research throughout the weekend and come together to begin coding on Monday.


# March 27, 2023
We have tried to complete our docker-compose.yaml file, requirements.txt, and begin authentication today. We are planning to work as much as we can and if we run into any issues, we will listen to the lecture tomorrow.


# March 28, 2023
We began our authentication today. We tried to set a goal to finish majority of authentication today but realized that it is a bigger portion of the project that we need to spend time on. We have set an 'end-of-the-week' goal to finish authentication.


# March 29, 2023
We wrote our code for creating authentication account today. We also fixed our Database Url login. Everytime we change the docker-compose.yml, we have to delete our volume and rebuild. We got rid of the external db and wrote in the yml to create every time we compose up.


# March 30, 2023
I could not contribute to the progress today as I had to step out of bootcamp. The team figured out how to create and get a user using the authenticator. They created notes on the bugs and solutions to keep me updated. We will continue with deleting the token, updating a user, etc. on Monday.


# April 3, 2023
Today we continued to debugg the user authentication and git issues. We broke up the backend to different components and created issues on gitlab for them. After speaking with Candice, we changed our plan to have individual work to group work. We will have a leader each day to build his or her component while navigators assist the leader in creating the components.


# April 4, 2023
We finished User endpoint and began the Checking Account database, endpoint, etc. We had a lot of git issues and needed to figure those out before we could move on. We decided to finish the endpoints for Checking Account tomorrow as we have been debugging today. Adrian and I stayed behind to begin the Savings Account and Investment database tables, models, and one endpoint.

# April 5, 2023
We debugged CRUD endpoints for Checking Account today. We worked on creating a Checking Account with a login requirement. We each took turns trying to debug as we looked up videos and resources online. With the POST working for Checking Account, we will now use that as a model to write our Savings and Investment Account.


# April 6, 2023
Reconfigured the models and tables in order to better fit our application.


# April 7, 2023
We completed all the routes for the backend. Transactions was completed today.


# April 17, 2023
We began front-end authentication today. We created sign up, login, logout, and users using Redux in React. We learned about slices, stores, and connected everything to our backend endpoints to make it all functional.


# April 18, 2023
We completed the front-end sign up, login, and logout features today. We need to continue testing to see if authentication will work as we build out our components. However, we ran into a bug with the transactions as we discussed how we will implement deposits to the accounts. We rewrote the transactionin and transactionout model using typing.Any so that it takes in a "null" as a typefield. This is so that we can choose just one account to deposit the money into. We recognized that we must write a logic either in the backend queries or routers or front-end in order to actually make the transactions "post" into an account's "post" to update the deposit money. We will continue working on this tomorrow.


# April 19, 2023
We had to go back to the backend today in order to complete the deposit feature. We fixed the update routers for accounts and create queries for transactions in order for accounts to be updated while transaction history is created.


# April 20, 2023
We created slices for our components and jsx files for them. I am learning to read through documentations. It is still difficult to understand, but I believe that's because I do not have exposure to this and need to practice more.

# April 21, 2023
We decided to take out redux for our front end as we did not feel as though we had a good grasp on the concepts. We were getting more confused by the time that we were trying to get components to work. We deleted the redux files and began to work with React only. I learned that Redux works better with a larger app that has a lot of communication between the components. Since ours is a simple monolith app, it would be better to use React for now. Maybe as a stretch goal we can use Redux. We are storing it in a different branch to keep the code.

# April 24, 2023
Front-end authorization was completed with JWTDown instead of RKTQ. A landing page was created with the navigation bar. Checking account forms and list pages were created but still needs to be worked on to make it fully functional.

# April 25, 2023
I finished making ghi forms and list pages for checking account. I was able to create a checking account, deposit money, see the amount total, and list the transactions. We started on savings account to replicate all of those from checkings, and a main page has been started for the user to view all of their accounts.


# April 26, 2023
I am finished creating a functional edit user information page and a user details page. I formatted the forms to make it more clean. I also assisted Matt in creating his savings account components and debugging it. I finished up with storing the access token to the local storage when a user signs up for an account.


# April 27, 2023
Today I fixed the sign up sheet to log in the user after they submit the form. I also debugged transactions/statements to filter through the correct statement for that account. I assisted in correcting and adding to our api documentation.


# April 28, 2023
Today I completed the Checking Account unit test. It passed when tested in Docker. I learned to re-render the statement page using the setStatements hook in Savings Statements by passing the data through the handleSubmit in Savings Deposit Form. 
