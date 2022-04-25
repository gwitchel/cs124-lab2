import React, {useState } from 'react'
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import {auth} from './firebase'
import { useAuthState} from 'react-firebase-hooks/auth';
import {sendEmailVerification} from "firebase/auth"
import Loading from './Loading';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function EmailUnverified() {
    const [user, loading, error] = useAuthState(auth);
    const [showSentAlert,setShowSentAlert] = useState(false)
    const [showErrorMessage,setShowErrorMessage] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    const verifyEmail = () => {
        sendEmailVerification(user).then(() => {
            setShowSentAlert(true)
        }).catch((e)=>{
            console.log(error)
            setShowErrorMessage(true)
            setShowSentAlert(false)
            setErrorMessage("unable to send email, wait a bit then try again")
        })      
    }
    if (loading){
        return <Loading/>
    } else if (user){
        return (
            <>
            <hr/>
            <Stack alignItems="center">
                <Typography > Please verify your email to continue </Typography>
                <Link color="secondary" size="small" onClick={() => verifyEmail()}>
                resend verification link </Link>
            </Stack>
            <br/>
            {showSentAlert &&  <Stack alignItems="center"> <Alert severity="success" sx={{ maxWidth: '300px' }}> email sent! </Alert> </Stack>}
            {showErrorMessage &&  <Stack alignItems="center"> <Alert severity="error" sx={{ maxWidth: '300px' }}> {errorMessage} </Alert> </Stack>}

            </>
          )
    } else if (error){
        return <>{error}</>
    }
}

export default EmailUnverified