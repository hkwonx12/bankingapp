import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage';
import SignUpForm from './auth/signup';
import LoginForm from './auth/login';
import { AuthProvider, useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import CheckingStatements from './components/checking/checking';
import CheckingAccount from './components/checking/checkingAccount';
import CreateCheckingAccountForm from './components/checking/createCheckingAccount';
import CreateDepositForm from './components/checking/createDeposit';

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <div className="container">
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
              <Route path="/createchecking" element={<CreateCheckingAccountForm />} />
              <Route path="/checkingdeposit" element={<CreateDepositForm/>}/>
            </Route>
          </Routes>
        </div>
        </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
