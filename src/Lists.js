import React from 'react';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { query,where, collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

import List from './List';
import {app, db} from './firebase.js'
import Loading from './Loading';

export default function Lists(props) {
    const userData = props.userData
   
    const q1 = query(collection(db, 'listsLab5'),where("owner",'==',userData.uid));  
    const [ownerLists, loading1, error1] = useCollectionData(q1); 
   
    const q2 = query(collection(db, 'listsLab5'),where('sharedWith','array-contains',userData.email));
    const [sharedLists, loading2, error2] = useCollectionData(q2);
    let lists = null 
    if (ownerLists && sharedLists ) lists = ownerLists.concat(sharedLists)
    console.log("ERROR1,ERROR2",error1,error2)
    const [tabId, setTabId] = useState((lists && lists.length!==0) ? lists[0].id : 'none');

    const isNarrowThan230 = useMediaQuery({ maxWidth: 230 })
    const ITEM_HEIGHT = 48;
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const openMenu = Boolean(anchorElMenu);

    const [newListDialogOpen, setNewListDialogOpen] = React.useState(false);
    const [listName, setListName] = useState("");
    const [showAlert, setShowAlert] = React.useState(false);
    
    const handleChangeTab = (event, newId) => {
        setTabId(newId);
    };

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
        setDoc(doc(db, "listsLab5", listId), {
            id: listId,
            name: listName,
            showCompleted: true,
            sortBy: "priority",
            sortDir: "desc",
            owner: userData.uid,
            sharedWith: [],
            created: serverTimestamp(),
        })
        if (lists.length===0) {
            setTabId(listId)
        }
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

    const handleClickMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleMenuAction = (e, option) => {
        if (option === "Start a New List") {
            handleNewListDialogOpen()
        }
        setAnchorElMenu(null);
    };

    function setTab(deletedId) {
        if (lists[0].id === deletedId && lists.length === 1) {
            setTabId('none')
        }else if (lists[0].id === deletedId && lists.length !== 1) {
            setTabId(lists[1].id)
        }else {
            setTabId(lists[0].id)
        }
    }

    useEffect(() => {
        if (lists && lists.length!==0) {
            setTabId(prevId => prevId==='none' ? lists[0].id : prevId)
        }
    }, [lists])
    
    if (loading1 || loading2) {
        return <Loading/>
    }else if (error1 || error2) {
        return error1? <p>Error: {JSON.stringify(error1)}</p>:<p>Error: {JSON.stringify(error2)}</p>
    }else if (lists.length===0) {
        return (
            <>
            <Button onClick={handleNewListDialogOpen} variant='outlined' sx={{textTransform:'none', marginRight:2, color:'primary.dark'}}>Start a New List</Button>
            <Dialog open={newListDialogOpen} onClose={handleNewListDialogClose}>
                <DialogTitle aria-label="Create a New List. Please enter the name of the new list below.">Create a New List</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the name of the new list below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="list-name"
                    aria-label={!showAlert ? `List name` : `Please enter a non-empty name for the new list`}
                    label="List name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={listName}
                    onChange={handleSetListName}
                    sx={{color:'primary.dark'}}
                />
                {showAlert && <Typography sx={{ fontSize:12, color:'red' }}>Please enter a non-empty name for the new list!</Typography>}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleNewListDialogClose} sx={{color: 'primary.dark'}}>Cancel</Button>
                <Button onClick={onSubmitNewList} sx={{color: 'primary.dark'}}>Submit</Button>
                </DialogActions>
            </Dialog>
            </>
        )
    }else if (lists.length!==0) {
        return (
        <>
            {!isNarrowThan230 && (
                <Box sx={{display:'flex', flexDirection: 'row', alignItems:'center', justifyContent:'flex-start'}}>
                    <Button onClick={handleNewListDialogOpen} variant='outlined' sx={{textTransform:'none', marginRight:2, color:'primary.dark'}}>Start a New List</Button>
                </Box>
            )}
            {isNarrowThan230 && (
                <Box>
                    <IconButton
                        sx={{color:'primary.dark'}}
                        aria-label="Hamburger menu button for options to manage to-do lists"
                        id="manage-lists-button"
                        aria-controls={openMenu ? 'manage-lists-menu' : undefined}
                        aria-expanded={openMenu ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClickMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="manage-lists-menu"
                        MenuListProps={{
                        'aria-labelledby': 'manage-lists-button',
                        }}
                        anchorEl={anchorElMenu}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                        },
                        }}
                    >
                        <MenuItem key={'Start a New List'} onClick={(e) => handleMenuAction(e, "Start a New List")}>Start a New List</MenuItem>
                    </Menu>
                </Box>
            )}
            {tabId!=="none" && (<Box sx={{ width: '100%' }}>
                <Tabs
                    value={tabId}
                    onChange={handleChangeTab}
                    variant="scrollable"
                    scrollButtons={false}
                    aria-label="tabs for to-do lists"
                >
                    {lists.map(list => 
                        <Tab 
                            value={list.id}
                            label={list.name}
                            key={list.id}
                            sx={{textTransform:'none', maxWidth:120, color:'primary.dark'}}
                            aria-label={`tab for the to-do list named ${list.name}`}
                            wrapped
                        />
                    )}
                </Tabs>
                <List listId={tabId} app={app} setTab={setTab}/>
            </Box>)}
            <Dialog open={newListDialogOpen} onClose={handleNewListDialogClose} aria-describedby="Please enter the name of the list below.">
                <DialogTitle aria-label='Create a New List. Please enter the name of the new list below.'>Create a New List</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the name of the new list below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="list-name"
                    aria-label={!showAlert ? `List name` : `Please enter a non-empty name for the new list`}
                    label="List name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={listName}
                    onChange={handleSetListName}
                    sx={{color:'primary.dark'}}
                />
                {showAlert && <Typography sx={{ fontSize:12, color:'red' }}>Please enter a non-empty name for the new list!</Typography>}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleNewListDialogClose} sx={{color: 'primary.dark'}}>Cancel</Button>
                <Button onClick={onSubmitNewList} sx={{color: 'primary.dark'}}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>)
    }
}
