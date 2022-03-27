import React from 'react';
import {useState} from 'react';
// import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
// import { Typography } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
// import { serverTimestamp } from "firebase/firestore";
// import { setDoc, doc, updateDoc, deleteDoc, orderBy } from "firebase/firestore";
import { query, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import List from './List';

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnLHzrDzijh4KmeJWRU5zSIiW2cPsZRHU",
    authDomain: "cs124-lab3-3028f.firebaseapp.com",
    projectId: "cs124-lab3-3028f",
    storageBucket: "cs124-lab3-3028f.appspot.com",
    messagingSenderId: "426502461839",
    appId: "1:426502461839:web:56b4c42f33c8a6187353fa"
};
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function ListTabs(props) {
    const lists = props.lists;
    const [tabId, setTabId] = useState(lists.length===0 ? 'default' : lists[0].id);

    const handleChangeTab = (event, newId) => {
        setTabId(newId);
    };

    console.log("lists", lists)

    if (tabId === 'default') {
        return <p>No lists for display.</p>
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={tabId}
                onChange={handleChangeTab}
                aria-label="tabs"
            >
                {lists.map(list => <Tab value={list.id} label={list.name} key={list.id} />)}
            </Tabs>
            <List listId={tabId}/>
        </Box>
    )
}

export default function Lists(props) {
    const q = query(collection(db, 'Lists'));   
    const [lists, loading, error] = useCollectionData(q);

    if (loading) {
        return (
            <p>Loading</p>
        )
    }else if (!error){
        return <ListTabs lists={lists}/>
    }
}
