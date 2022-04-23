import React from 'react'
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import {auth} from './firebase'
import { useAuthState} from 'react-firebase-hooks/auth';
import {sendEmailVerification} from "firebase/auth"
import Loading from './Loading';
function EmailUnverified() {
    const [user, loading, error] = useAuthState(auth);
    if (loading){
        return <Loading/>
    } else if (user){
        return (
            <Stack alignItems="center">
                <Typography > Please verify your email to continue </Typography>
                <Link color="secondary" size="small" onClick={() => sendEmailVerification(user)}>
                resend verification link </Link>
            </Stack>
          )
    } else if (error){
        return <>{error}</>
    }
}

export default EmailUnverified