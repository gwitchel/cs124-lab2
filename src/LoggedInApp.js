import './LoggedInApp.css';
import Lists from './Lists';
import {auth} from './firebase'
import {
  useAuthState,
} from 'react-firebase-hooks/auth';

function LoggedInApp(props) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) { 
    return <p>Loading</p>
  } else if (user) {
    console.log("UserData",user)
    return (
      <div className='app'>
        <Lists userData = {props.userData}/>
      </div>
    );
  } else {
    return <>            
    {error && <p>Error App: {error.message}</p>}
    </>
  }
}

export default LoggedInApp;
