import React, {useState } from "react";
import { useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithGoogle,
    useSignInWithEmailAndPassword,} from "react-firebase-hooks/auth";
import "./Login.css";
import LoggedInApp from "./LoggedInApp"
import {auth} from './firebase'
import {sendEmailVerification} from "firebase/auth"
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Loading from './Loading'
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
function SignIn(props) {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
  
    const [ signInWithEmailAndPassword, user1, loading1, error1 ] = 
    useSignInWithEmailAndPassword(auth)

    const [ signInWithGoogle, user2, loading2, error2] = 
    useSignInWithGoogle(auth);
  
    if (user1 || user2) {
      // Shouldn't happen because App should see that
      // we are signed in.
      return <div>Unexpectedly signed in already</div>
    } else if (loading1 || loading2) {
        return <Loading/>
    }  
  return <div>
      {error1 &&  <Stack alignItems="center"> <Alert severity="error" sx={{ maxWidth: '300px' }}> {error1.message.slice(10,-1)}</Alert> </Stack>}
      {error2 && <Stack alignItems="center"> <Alert severity="error" sx={{ maxWidth: '300px' }}> {error2.message.slice(10,-1)}</Alert> </Stack>}

      <form className="login-form">
        <TextField  label="Email" value={email} variant="standard" 
        onChange={e=>setEmail(e.target.value)} />
        <br/>
        <TextField  label="Password" value={pw} variant="standard" type="password"
        onChange={e=>setPw(e.target.value)} />
        <br/>
        <Button variant="contained" onClick={() =>signInWithEmailAndPassword(email, pw)}>
            Sign in
        </Button> 
        <Button size="small" onClick={() => signInWithGoogle()}>
            Sign in with Google
        </Button>
        <Link color="secondary" size="small" onClick={() => props.setAlreadyRegistered(false)}>
            register </Link>
      </form>
  </div>
}

function SignUp(props) {
  const [
      createUserWithEmailAndPassword,
      userCredential, loading, error
  ] = useCreateUserWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const registerUser = async (email,pw) => {
    await createUserWithEmailAndPassword(email,pw).then((user) =>  {
      if (user != null){
        user.sendEmailVerification();
      }
    })
  }
  if (userCredential) {
      // Shouldn't happen because App should see that
      // we are signed in.
      return <div>Unexpectedly signed in already</div>
  } else if (loading) {
      return <p>Signing up…</p>

  }
  return <div>
      {error &&  <Stack alignItems="center"> <Alert severity="error" sx={{ maxWidth: '300px' }}> {error.message.slice(10,-1)}</Alert> </Stack>}
      <form className="login-form">
        <TextField  label="Email" value={email} variant="standard" 
            onChange={e=>setEmail(e.target.value)} />
        <br/>
        <TextField  label="Password" value={pw} variant="standard" type="password"
        onChange={e=>setPw(e.target.value)} />
        <br/>
        <br/>
        <Button variant="contained"  onClick={ () => registerUser(email,pw)}>
            Register
        </Button>
        <br/>
        <Link color="secondary" size="small" onClick={() => props.setAlreadyRegistered(true)}>
            sign in </Link>
      </form>

  </div>
}

function Login() {
  const [user, loading, error] = useAuthState(auth);
  const [alreadyRegistered, setAlreadyRegistered] = useState(true)
  if (loading) {
    return <Loading/>
  } else if (user) {
    return <LoggedInApp userData = {user}/>
  } else {
      return <>
        {error && <Stack alignItems="center"> <Alert severity="error" sx={{ maxWidth: '300px' }}> {error.message.slice(10,-1)}</Alert> </Stack>}
        {alreadyRegistered && 
            <SignIn setAlreadyRegistered = {setAlreadyRegistered} key="Sign In"/>}
        {!alreadyRegistered && 
            <SignUp setAlreadyRegistered = {setAlreadyRegistered} key="Sign Up"/>}
        </>
  }
}
export default Login;
