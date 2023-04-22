import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import MainPage from 'MainPage'
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path='/login'>
          <Route index element={<Login/>}/>
        </Route>

        <Route path='/signup'>
          <Route index element={<Signup/>}/>
        </Route>

        <Route path='/logout'>
          <Route index element={<Logout/>}/>
        </Route>

        <Route path='/checking'>
          <Route index element={<CheckingDeposit/>}/>
        </Route>

        <Route path='/savings'>
            <Route index element={< SavingsDetail/>}/>
          </Route>

        <Route path='/investment'>
            <Route/>
          </Route>

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
