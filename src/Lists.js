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

export default function Lists(props) {
    const q = query(collection(db, 'App/XCGYdkjADqAzwFrF0kJ8/Lists'));   
    const [lists, loadingLists, errorLists] = useCollectionData(q);
    const [tabId, setTabId] = useState('0PA6ekABU6Jl38Dv933P');

    const handleChangeTab = (event, newId) => {
        setTabId(newId);
    };

    function TabPanel(props) {
        const { children, name, id, ...other } = props;
        
        return (
            <div
                role="tabpanel"
                hidden={tabId !== id}
                id={`tabpanel-${name}`}
                aria-labelledby={`tab-${name}`}
                {...other}
            >
            {tabId === id && (
                {children}
            )}
            </div>
        );
    }
      
    function a11yProps(name) {
        return {
            id: `tab-${name}`,
            'aria-controls': `tabpanel-${name}`,
        };
    };

    if (loadingLists) {
        return (
            <p>Loading</p>
        )
    }else if (!errorLists){
        return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabId} onChange={handleChangeTab} aria-label="tabs">
                        {lists.map(list => <Tab label={list.name} {...a11yProps(list.name)} />)}
                    </Tabs>
                </Box>
                {lists.map(list => <TabPanel name={list.name} id={list.id}>
                    <List list={list}/>
                </TabPanel>)}
            </Box>
        )
    }
}
