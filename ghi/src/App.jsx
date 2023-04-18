import User from './User';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import './App.css';
import { useGetUserQuery } from './services/auth';

function App() {
  const { data: user } = useGetUserQuery()

  const showAuthForms = () => (
    <div className='row'>
      <div className='col'><Login/></div>
      <div className='col'><Signup/></div>
    </div>
  )


  return (
    <div className='text-3xl font-bold underline'>
      <h1 className='text-3xl font-bold underline'> Hey, {user?.username || 'Friend'}</h1>
      <hr />
      {user && <Logout />}
      {showAuthForms() }
    </div>

  );
}

export default App;
