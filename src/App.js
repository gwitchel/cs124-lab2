import React from 'react'
import LoggedInApp from './LoggedInApp';
import Login from './Login';
import Banner from './Banner'
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import {auth,db} from "./firebase"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState("");
    const getUser = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setUserData(data);
        } catch (err) {
          console.error(err);
          alert("whoops! Something went wrong");
        }
    };

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