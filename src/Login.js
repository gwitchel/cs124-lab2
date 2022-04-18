import React, {useState } from "react";
import { useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithGoogle,
    useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import "./Login.css";
import LoggedInApp from "./LoggedInApp"
import { sendEmailVerification, } from "firebase/auth";
import {auth} from './firebase'

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function SignIn(props) {
  const [
      signInWithEmailAndPassword,
      user1, loading1, error1
  ] = useSignInWithEmailAndPassword(auth);
  const [
      signInWithGoogle,
      user2, loading2, error2
  ] = useSignInWithGoogle(auth);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  if (user1 || user2) {
      // Shouldn't happen because App should see that
      // we are signed in.
      return <div>Unexpectedly signed in already</div>
  } else if (loading1 || loading2) {
      return <>
        <Box sx={{ display: 'flex'}}>
            <CircularProgress />
        </Box></>;
  }
  return <div>
      {error1 && <p>"Error logging in: " {error1.message}</p>}
      {error2 && <p>"Error logging in: " {error2.message}</p>}

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
  const [username, setUsername] = useState("");
  if (userCredential) {
      // Shouldn't happen because App should see that
      // we are signed in.
      return <div>Unexpectedly signed in already</div>
  } else if (loading) {
      return <p>Signing up…</p>
  }
  return <div>
      {error && <p>"Error signing up: " {error.message}</p>}
      <form className="login-form">
        <TextField  label="Name" value={username} variant="standard" 
            onChange={e=>setUsername(e.target.value)} />
        <br/>
        <TextField  label="Email" value={email} variant="standard" 
            onChange={e=>setEmail(e.target.value)} />
        <br/>
        <TextField  label="Password" value={pw} variant="standard" type="password"
        onChange={e=>setPw(e.target.value)} />
        <br/>
        <br/>
        <Button variant="contained"  onClick={() =>
            createUserWithEmailAndPassword(email, pw).then((user) => {if(username){
                user.updateProfile({
                    displayName: username
                })
            }})}>
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
//   function verifyEmail() {
//       sendEmailVerification(user);
//   }
  
  if (loading) {
      return <p>Checking...</p>;
  } else if (user) {
    return <LoggedInApp userData = {user}/>
  } else {
      return <>
        {error && <p>Error App: {error.message}</p>}
        {alreadyRegistered && 
            <SignIn setAlreadyRegistered = {setAlreadyRegistered} key="Sign In"/>}
        {!alreadyRegistered && 
            <SignUp setAlreadyRegistered = {setAlreadyRegistered} key="Sign Up"/>}
        </>
  }
}
export default Login;
