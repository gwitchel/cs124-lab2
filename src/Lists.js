import React from 'react';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { query, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
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
                {lists.map(list => <Tab value={list.id} label={list.name} key={list.id} sx={{textTransform:'none'}}/>)}
            </Tabs>
            <List listId={tabId}/>
        </Box>
    )
}

export default function Lists(props) {
    const q = query(collection(db, 'Lists'));   
    const [lists, loading, error] = useCollectionData(q);
    const [newListDialogOpen, setNewListDialogOpen] = React.useState(false);
    const [listName, setListName] = useState("");
    const [showAlert, setShowAlert] = React.useState(false);

    const handleNewListDialogOpen = () => {
        setNewListDialogOpen(true);
    };

    const handleNewListDialogClose = () => {
        setNewListDialogOpen(false);
        setShowAlert(false);
        setListName("")
    };

    const handleSetListName = e => {
        setListName(e.target.value)
        if (e.target.value.length>0) {
            setShowAlert(false);
        }else{
            setShowAlert(true);
        }
    }

    function submitNewList(){
        const listId = generateUniqueID()
        setDoc(doc(db, "Lists", listId), {
            id: listId,
            name: listName,
            showCompleted: false,
            sortBy: "priority",
            sortDir: "asc",
            created: serverTimestamp(),
        })
    }

    function onSubmitNewList(e) {
        if (listName.length===0) {
            setShowAlert(true)
            setListName("")
        }else{
            submitNewList()
            handleNewListDialogClose();
            setListName("")
        }
    }
    
    if (loading) {
        return (
            <p>Loading</p>
        )
    }else if (!error){
        return (
        <>
            <Box sx={{display:'flex', flexDirection: 'row', alignItems:'center', justifyContent:'flex-start'}}>
                <Button onClick={handleNewListDialogOpen} variant='outlined' sx={{textTransform:'none', marginRight:2}}>Start a New List</Button>
                <Button variant='outlined' sx={{textTransform:'none'}}>Delete Current List</Button>
            </Box>
            <ListTabs lists={lists}/>
            <Dialog open={newListDialogOpen} onClose={handleNewListDialogClose}>
                <DialogTitle>Create a New List</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the name of the list below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="list-name"
                    label="List Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={listName}
                    onChange={handleSetListName}
                />
                {showAlert && <Typography sx={{ fontSize:12, color:'red' }}>Please enter a non-empty name for the list!</Typography>}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleNewListDialogClose}>Cancel</Button>
                <Button onClick={onSubmitNewList}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>)
    }
}
