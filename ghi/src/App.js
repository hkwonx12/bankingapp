import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage';
import SignUpForm from './auth/signup';
import LoginForm from './auth/login';
import { AuthProvider, useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import CheckingStatements from './components/checking/checking';
import CheckingAccount from './components/checking/checkingAccount';
import InvestmentStatements from './components/investment/investmentHistory';
import InvestmentInformation from './components/investment/investmentt';


function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <Nav /> */}
        <div>
          <Routes>
              <Route path="/" element={<MainPage />} />

              <Route>
                <Route path="/signup" element={<SignUpForm />} />
              </Route>

            <Route>
              <Route path="/login" element={<LoginForm />} />
            </Route>

            <Route >
              <Route path="/checking" element={<CheckingStatements/>}/>
              <Route path="/checkingaccount" element={<CheckingAccount/>}/>
            </Route>

            <Route path='/investment'>
              <Route path='statements' element={<InvestmentStatements/>}/>
              <Route path='account' element={<InvestmentInformation/>}/>
            </Route>
          </Routes>
        </div>
        </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
