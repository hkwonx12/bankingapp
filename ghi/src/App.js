import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import CreateInvestmentWithdrawForm from './components/investment/investmentWithdraw';

function App() {

    return (
      <BrowserRouter>
        <AuthProvider>
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} />

              <Route>
                <Route path="/mainpage" element={<MainPage/>} />
              </Route>

              <Route>
                <Route path="/signup" element={<SignUpForm />} />
              </Route>

              <Route>
                <Route path="/login" element={<LoginForm />} />
              </Route>

              <Route>
                <Route path="/user" element={<User/>} />
                <Route path="/edituser" element={<UpdateUserForm />}/>
              </Route>

              <Route>
                <Route path="/checking" element={<CheckingStatements />} />
                <Route path="/checkingaccount" element={<CheckingAccount/>}/>
                <Route path="/createchecking" element={<CreateCheckingAccountForm />} />
                <Route path="/checkingdeposit" element={<CreateDepositForm/>}/>
              </Route>

              <Route>
                <Route path="/savings" element={<SavingsStatements/>}/>
                <Route path="/savingsaccount" element={<SavingsAccount/>}/>
                <Route path="/createsavings" element={<CreateSavingsAccountForm/>}/>
                <Route path="/savingsdeposit" element={<CreateSavingsDepositForm/>}/>
              </Route>

              <Route path='/investment'>
                <Route path='statements' element={<InvestmentStatements/>}/>
                <Route path='create' element={<CreateInvestmentAccountForm/>}/>
                <Route path='deposit' element={<CreateInvestmentDepositForm/>}/>
                <Route path='detail' element={<InvestmentAccountDetail/>}/>
                <Route path='chart' element={<InvestmentDayChangeHistory/>}/>
                <Route path='withdraw' element={<CreateInvestmentWithdrawForm/>}/>
              </Route>

              <Route>
                <Route path="/createaccounts" element={<CreateAccountsPage />} />
              </Route>

            </Routes>
          </div>
          </AuthProvider>
      </BrowserRouter>

    );
}

export default App;
