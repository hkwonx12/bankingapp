import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './User';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import './App.css';
import { useGetUserQuery } from './services/auth';
import Nav from './Nav'

function App() {
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path='/login'>
          <Route index element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
