import React from 'react'
import LoggedInApp from './LoggedInApp';
import Login from './Login';
import Banner from './Banner'
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "./firebase"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {
    const [user, loading, error] = useAuthState(auth);
    
    if (loading) {
        return <>
        <Banner/> 
        <Box sx={{ display: 'flex'}}>
            <CircularProgress />
        </Box></>;
    } else if (user) {
    return <>
        <Banner/> 
        <LoggedInApp userData = {user}/>
        </>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <Banner/>
            <Login/>
        </>
    }
}

export default App