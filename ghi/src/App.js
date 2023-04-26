import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
// import MainPage from './MainPage';
import SignUpForm from './auth/signup';
import LoginForm from './auth/login';
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import CheckingStatements from './components/checking/checking';
import CheckingAccount from './components/checking/checkingAccount';
import CreateCheckingAccountForm from './components/checking/createCheckingAccount';
import CreateDepositForm from './components/checking/createDeposit';import InvestmentStatements from './components/investment/investmentHistory';
// import InvestmentInformation from './components/investment/investmentt';
import LandingPage from './LandingPage';
import CreateInvestmentAccountForm from './components/investment/createInvestmentAccount';
import CreateInvestmentDepositForm from './components/investment/investmentDeposit';
import InvestmentAccountDetail from './components/investment/investmentAccountDetail';

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route>
              {/* <Route path="/mainpage" element={<MainPage/>} /> */}
            </Route>

            <Route>
              <Route path="/signup" element={<SignUpForm />} />
            </Route>

            <Route>
              <Route path="/login" element={<LoginForm />} />
            </Route>


            <Route>
              <Route path="/checking" element={<CheckingStatements/>}/>
              <Route path="/checkingaccount" element={<CheckingAccount/>}/>
              <Route path="/createchecking" element={<CreateCheckingAccountForm />} />
              <Route path="/checkingdeposit" element={<CreateDepositForm/>}/>
            </Route>

            <Route path='/investment'>
              <Route path='statements' element={<InvestmentStatements/>}/>
              <Route path='create' element={<CreateInvestmentAccountForm/>}/>
              <Route path='deposit' element={<CreateInvestmentDepositForm/>}/>
              <Route path='detail' element={<InvestmentAccountDetail/>}/>
              {/* <Route path='account' element={<InvestmentInformation/>}/> */}
            </Route>

          </Routes>
        </div>
        </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
