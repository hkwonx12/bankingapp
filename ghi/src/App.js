import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage';
import SignUpForm from './auth/signup';
import LoginForm from './auth/login';
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

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
          </Routes>
        </div>
        </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
