import User from './User';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import './App.css';
import { useGetUserQuery } from './services/auth';

function App() {
  const { data: user } = useGetUserQuery()

  // const showUsers = () => (
  //   <div className='row'>
  //     <div className='col'>
  //   <User />
  //   </div>
  //   </div>

  // )

  const showAuthForms = () => (
    <div className='row'>
      <div className='col'><Login/></div>
      <div className='col'><Signup/></div>
    </div>
  )


  return (
    <div className='container'>
      <h1> Hey, {user?.username || 'Friend'}</h1>
      <hr />
      {user && <Logout />}
      {showAuthForms() }
    </div>

  );
}

export default App;
