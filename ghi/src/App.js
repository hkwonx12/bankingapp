import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage';
import SignUpForm from './auth/signup';
import LoginForm from './auth/login';
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import CheckingStatements from './components/checking/checking';
import CheckingAccount from './components/checking/checkingAccount';
import CreateCheckingAccountForm from './components/checking/createCheckingAccount';
import CreateDepositForm from './components/checking/createDeposit';
import InvestmentStatements from './components/investment/investmentHistory';
import LandingPage from './LandingPage';
import CreateInvestmentAccountForm from './components/investment/createInvestmentAccount';
import CreateInvestmentDepositForm from './components/investment/investmentDeposit';
import InvestmentAccountDetail from './components/investment/investmentAccountDetail';
import UpdateUserForm from './components/user/userUpdate';
import User from './components/user/getUser';
import SavingsAccount from './components/savings/savingsAccount';
import SavingsStatements from './components/savings/savings';
import CreateSavingsAccountForm from './components/savings/createSavingsAccount';
import CreateSavingsDepositForm from './components/savings/createSavingsDeposit';
import CreateAccountsPage from './CreateAccountsPage';
import InvestmentDayChangeHistory from './components/investment/previousDayData';
import PrivateRoute from './PrivateRoute/private';

function App() {


    return (
      <BrowserRouter>
        <AuthProvider>
          {/* <Nav /> */}
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} />

              <Route>
                <Route path="/mainpage" element={<PrivateRoute><MainPage/></PrivateRoute>} />
              </Route>

              <Route>
                <Route path="/signup" element={<SignUpForm />} />
              </Route>

              <Route>
                <Route path="/login" element={<LoginForm />} />
              </Route>

              <Route>
                <Route path="/user" element={<PrivateRoute><User/></PrivateRoute>} />
                <Route path="/edituser" element={<PrivateRoute><UpdateUserForm /></PrivateRoute>}/>
              </Route>

              <Route>
                <Route path="/checking" element={<PrivateRoute><CheckingStatements/></PrivateRoute>}/>
                <Route path="/checkingaccount" element={<PrivateRoute><CheckingAccount/></PrivateRoute>}/>
                <Route path="/createchecking" element={<PrivateRoute><CreateCheckingAccountForm /></PrivateRoute>} />
                <Route path="/checkingdeposit" element={<PrivateRoute><CreateDepositForm/></PrivateRoute>}/>
              </Route>

              <Route>
                <Route path="/savings" element={<PrivateRoute><SavingsStatements/></PrivateRoute>}/>
                <Route path="/savingsaccount" element={<PrivateRoute><SavingsAccount/></PrivateRoute>}/>
                <Route path="/createsavings" element={<PrivateRoute><CreateSavingsAccountForm/></PrivateRoute>}/>
                <Route path="/savingsdeposit" element={<PrivateRoute><CreateSavingsDepositForm/></PrivateRoute>}/>
              </Route>

              <Route path='/investment'>
                <Route path='statements' element={<PrivateRoute><InvestmentStatements/></PrivateRoute>}/>
                <Route path='create' element={<PrivateRoute><CreateInvestmentAccountForm/></PrivateRoute>}/>
                <Route path='deposit' element={<PrivateRoute><CreateInvestmentDepositForm/></PrivateRoute>}/>
                <Route path='detail' element={<PrivateRoute><InvestmentAccountDetail/></PrivateRoute>}/>
                <Route path='chart' element={<PrivateRoute><InvestmentDayChangeHistory/></PrivateRoute>}/>
                {/* <Route path='account' element={<InvestmentInformation/>}/> */}
              </Route>

              <Route>
                <Route path="/createaccounts" element={<PrivateRoute><CreateAccountsPage /></PrivateRoute>} />
              </Route>

            </Routes>
          </div>
          </AuthProvider>
      </BrowserRouter>

    );
}

export default App;
