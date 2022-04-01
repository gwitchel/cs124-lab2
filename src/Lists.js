import React from 'react';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
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
    const q = query(collection(db, 'Lists'));   
    const [lists, loading, error] = useCollectionData(q);
    console.log("lists",lists)
    const [tabId, setTabId] = useState((lists && lists.length!==0) ? lists[0].id : 'none');

    const isNarrowThan500 = useMediaQuery({ maxWidth: 5000 })
    const ITEM_HEIGHT = 48;
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const openMenu = Boolean(anchorElMenu);

    const [newListDialogOpen, setNewListDialogOpen] = React.useState(false);
    const [listName, setListName] = useState("");
    const [showAlert, setShowAlert] = React.useState(false);

    const [deleteListDialogOpen, setDeleteListDialogOpen] = React.useState(false);
    const [deleteName, setDeleteName] = useState("");
    const [showAlertDelete, setShowAlertDelete] = React.useState(false);

    const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
    const [oldName, setOldName] = useState("");
    const [newName, setNewName] = useState("");
    const [showAlertRenameOld, setShowAlertRenameOld] = React.useState(false);
    const [showAlertRenameNew, setShowAlertRenameNew] = React.useState(false);
    
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
        setDoc(doc(db, "Lists", listId), {
            id: listId,
            name: listName,
            showCompleted: false,
            sortBy: "priority",
            sortDir: "desc",
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

    const handleDeleteListDialogOpen = () => {
        setShowAlertDelete(false)
        setDeleteListDialogOpen(true);
    };

    const handleDeleteListDialogClose = () => {
        setDeleteListDialogOpen(false);
        setShowAlertDelete(false);
        setDeleteName("")
    };

    const handleDeleteListName = e => {
        setDeleteName(e.target.value)
    }

    function deleteList(){
        const list = lists.filter(list => list.name === deleteName)[0]
        if (list) {
            // const listRef = doc(db, `Lists/${list.id}`);
            // const collectionRef = collection(listRef, 'Tasks');
            // const q = query(collectionRef);   
            // const [tasks, loading, error] = useCollectionData(q);
            // if (!loading && !error && tasks) {
            //     const taskIds = tasks.map(task => task.id)
            //     taskIds.forEach(id => deleteDoc(doc(collectionRef, id)))
            // }

            deleteDoc(doc(collection(db, 'Lists'), list.id))
            if (lists.length!==1) {setTabId(lists[0].id!==list.id ? lists[0].id : lists[1].id)}
        }
    }

    function onSubmitDeleteList(e) {
        const listNames = lists.map(list => list.name)
        if (!listNames.includes(deleteName)) {
            setShowAlertDelete(true)
        }else{
            deleteList()
            handleDeleteListDialogClose();
            setShowAlertDelete(false)
            setDeleteName("")
        }
    }

    const handleRenameDialogOpen = () => {
        setRenameDialogOpen(true);
    };

    const handleRenameDialogClose = () => {
        setRenameDialogOpen(false);
        setShowAlertRenameOld(false)
        setShowAlertRenameNew(false)
        setOldName("")
        setNewName("")
    };

    const handleRenameListOld = e => {
        setOldName(e.target.value)
    }

    const handleRenameListNew = e => {
        setNewName(e.target.value)
    }

    function renameList() {
        const list = lists.filter(list => list.name === oldName)[0]
        if (list) {
            updateDoc(doc(collection(db, 'Lists'), list.id), {
                name: newName
            })
        }
    }

    function onSubmitRenameList(e) {
        const listNames = lists.map(list => list.name)
        if (!listNames.includes(oldName)) {
            setShowAlertRenameOld(true)
        }else{
            setShowAlertRenameOld(false)
        }
        if (newName.length === 0) {
            setShowAlertRenameNew(true)
        }else{
            setShowAlertRenameNew(false)
        }
        if (listNames.includes(oldName) && newName.length !== 0) {
            renameList()
            handleRenameDialogClose();
            setShowAlertRenameOld(false)
            setShowAlertRenameNew(false)
            setOldName("")
            setNewName("")
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
        }else if (option === "Delete a List") {
            handleDeleteListDialogOpen()
        }else{
            handleRenameDialogOpen()
        }
        setAnchorElMenu(null);
    };

    useEffect(() => {
        if (lists && lists.length!==0) {
            setTabId(lists[0].id)
        }
      }, [lists])
    
    if (loading) {
        return (
            <p>Loading</p>
        )
    }else if (!error && lists.length===0) {
        return (
            <>
            <Button onClick={handleNewListDialogOpen} variant='outlined' sx={{textTransform:'none', marginRight:2}}>Start a New List</Button>
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
            </>
        )
    }
    else if (!error && lists.length!==0) {
        return (
        <>
            {!isNarrowThan500 && (
                <Box sx={{display:'flex', flexDirection: 'row', alignItems:'center', justifyContent:'flex-start'}}>
                    <Button onClick={handleNewListDialogOpen} variant='outlined' sx={{textTransform:'none', marginRight:2}}>Start a New List</Button>
                    <Button onClick={handleDeleteListDialogOpen} variant='outlined' sx={{textTransform:'none', marginRight:2}}>Delete a List</Button>
                    <Button onClick={handleRenameDialogOpen} variant='outlined' sx={{textTransform:'none'}}>Rename a List</Button>
                </Box>
            )}
            {isNarrowThan500 && (
                <Box>
                    <IconButton
                        color="primary"
                        aria-label="more"
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
                            // width: '20ch',
                        },
                        }}
                    >
                        <MenuItem key={'Start a New List'} onClick={(e) => handleMenuAction(e, "Start a New List")}>Start a New List</MenuItem>
                        <MenuItem key={'Delete a List'} onClick={(e) => handleMenuAction(e, "Delete a List")}>Delete a List</MenuItem>
                        <MenuItem key={'Rename a List'} onClick={(e) => handleMenuAction(e, "Rename a List")}>Rename a List</MenuItem>
                    </Menu>
                </Box>
            )}
            {tabId!=="none" && (<Box sx={{ width: '100%' }}>
                <Tabs
                    value={tabId}
                    onChange={handleChangeTab}
                    aria-label="tabs"
                >
                    {lists.map(list => <Tab value={list.id} label={list.name} key={list.id} sx={{textTransform:'none'}}/>)}
                </Tabs>
                <List listId={tabId}/>
            </Box>)}
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

            <Dialog open={deleteListDialogOpen} onClose={handleDeleteListDialogClose}>
                <DialogTitle>Delete a List</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the name of the list that you want to delete to confirm.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="delete-list-name"
                    label="List Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={deleteName}
                    onChange={handleDeleteListName}
                />
                {showAlertDelete && <Typography sx={{ fontSize:12, color:'red' }}>Please enter the name of the list that you want to delete to confirm.</Typography>}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleNewListDialogClose}>Cancel</Button>
                <Button onClick={onSubmitDeleteList}>Submit</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={renameDialogOpen} onClose={handleRenameDialogClose}>
                <DialogTitle>Rename a List</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the old name and the new name of the list that you want to modify.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="rename-list-old-name"
                    label="Old Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={oldName}
                    onChange={handleRenameListOld}
                />
                {showAlertRenameOld && <Typography sx={{ fontSize:12, color:'red' }}>Please enter the name of an existing list.</Typography>}
                <TextField
                    margin="dense"
                    id="rename-list-new-name"
                    label="New Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newName}
                    onChange={handleRenameListNew}
                />
                {showAlertRenameNew && <Typography sx={{ fontSize:12, color:'red' }}>Please enter the new name of the list.</Typography>}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleRenameDialogClose}>Cancel</Button>
                <Button onClick={onSubmitRenameList}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>)
    }
}
