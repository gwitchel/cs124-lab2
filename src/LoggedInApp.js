import './LoggedInApp.css';
import EmailUnverified from './EmailUnverified';
import Lists from './Lists';
import {auth} from './firebase'
import {
  useAuthState,
} from 'react-firebase-hooks/auth';
import Loading from './Loading';

function LoggedInApp(props) {
  const [user, loading, error] = useAuthState(auth);
  console.log("user data",user.emailVerified)

  if (loading) { 
    return <Loading/>
  } else if (user && user.emailVerified) {
    console.log("user",user)
    return (
      <div className='app'>
        <Lists userData = {props.userData}/>
      </div>
    );
  } else if (user) {
    return <EmailUnverified />
  } else {
    return <>            
    {error && <p>Error App: {error.message}</p>}
    </>
  }
}

export default LoggedInApp;
