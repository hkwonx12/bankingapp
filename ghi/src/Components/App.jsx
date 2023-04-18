import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './user/User';
import Signup from './user/Signup';
import Login from './user/Login';
import Logout from './user/Logout';
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
