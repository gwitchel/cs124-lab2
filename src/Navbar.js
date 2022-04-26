import React from 'react';
import {useState} from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAuthState } from "react-firebase-hooks/auth";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Chip from '@mui/material/Chip';

import {auth} from "./firebase"
import {fetchSignInMethodsForEmail } from "firebase/auth";
import Stack from '@mui/material/Stack';

export default function Navbar(props) {
    const isNarrowThan300 = useMediaQuery({ maxWidth: 300 })
    const [user, loading, error] = useAuthState(auth);
    console.log(loading,error)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [title, setTitle] = useState("");

    const priorityDic = {1: "low", 2: "medium", 3: "high"}
    const [priority, setPriority] = useState(1);
    const sortOptions = ['title', 'created', 'priority']
    const [anchorElSort, setAnchorElSort] = React.useState(null);
    const openSort = Boolean(anchorElSort);

    const [anchorElPriority, setAnchorElPriority] = React.useState(null);
    const openPriority = Boolean(anchorElPriority);

    const [dialogOpenDelete, setDialogOpenDelete] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const showHideCompleted = props.showCompleted? 'Hide Completed': 'Show Completed'
    const menuOptions = [
        showHideCompleted,
        'Delete Completed',
        'Rename List',
        props.list.owner === user.uid? 'Delete List' : "Remove List",
        'Share List'
    ];
    const ITEM_HEIGHT = 48;
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const openMenu = Boolean(anchorElMenu);

    const [deleteListDialogOpen, setDeleteListDialogOpen] = React.useState(false);
    const [removeListDialogOpen, setRemoveListDialogOpen] = React.useState(false);
    const [deleteName, setDeleteName] = useState("");
    const [showAlertDelete, setShowAlertDelete] = React.useState(false);

    const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);

    const [newName, setNewName] = useState("");
    const [shareWith, setShareWith] = useState("");
    const [showAlertRename, setShowAlertRename] = React.useState(false);
    const [showAlertInvalidEmail, setShowAlertInvalidEmail] = React.useState([false,""]);

    const listOfUsersListIsSharedWith = props.list.sharedWith.map((email) => email !== user.email ? <Chip key={email} label={email} onDelete={() => props.removeFromSharelist(email)} /> : <div key={email}></div> )
    
    const handleSetTitle = e => {
        setTitle(e.target.value)
        if (e.target.value.length>0) {
            setShowAlert(false);
        }
    }
    const handleDialogOpen = () => {
        setDialogOpen(true);
        setAnchorElMenu(null);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
        setShowAlert(false);
        setTitle("")
        setPriority(1)
    };
    function onSubmit(e) {
        e.preventDefault();
        if (title.length===0) {
            setShowAlert(true);
        }else{
            props.handleNewTask(title, priority);
            handleDialogClose();
            setTitle("")
            setPriority(1)
        }
    }
    const handleClickListItemSort = (event) => {
        setAnchorElSort(event.currentTarget);
    };
    const handleMenuItemClickSort = (event, index) => {
        props.onChangeSortOption(index)
        setAnchorElSort(null);
    };
    const handleCloseSort = () => {
        setAnchorElSort(null);
    };
    const handleClickPriority = (event) => {
        setAnchorElPriority(event.currentTarget);
    };
    const handleClosePriority = () => {
        setAnchorElPriority(null);
    };
    const handleChangePriority = (event, priority) => {
        setPriority(priority)
        setAnchorElPriority(null);
    };
    const handleClickSortDirection = () => {
        if (props.sortDir === 'asc') {
            props.onChangeSortDirection('desc')
        }else{
            props.onChangeSortDirection('asc')
        }
    }
    const handleDialogCloseDelete = () => {
        setDialogOpenDelete(false);
    };
    function onSubmitDelete(e) {
        e.preventDefault();
        props.handleDeleteFinished();
        handleDialogCloseDelete();
    }
    const handleDeleteListDialogClose = () => {
        setDeleteListDialogOpen(false);
        setShowAlertDelete(false);
        setDeleteName("")
    };
    const handleRemoveListDialogClose = () => {
        setRemoveListDialogOpen(false);
    };
    function onSubmitDeleteList(e) {
        if (deleteName !== props.list.name) {
            setShowAlertDelete(true)
        }else{
            props.deleteList()
            setShowAlertDelete(false)
            handleDeleteListDialogClose();
            setDeleteName("")
        }
    }
    function onSubmitRemoveList(){
        props.removeFromSharelist(user.email)
        window.location.reload(false);
    }

    const handleRenameDialogClose = () => {
        setRenameDialogOpen(false);
        setShowAlertRename(false)
        setNewName("")
    };
    function onSubmitRenameList(e) {
        if (newName.length !== 0) {
            props.renameList(newName)
            handleRenameDialogClose();
            setNewName("")
            setShowAlertRename(false)
        }else {
            setShowAlertRename(true)
        }
    }
    const onSubmitShareList = () => {
        if (props.list.sharedWith.includes(shareWith)){
            setShowAlertInvalidEmail([true,"list is already shared with user"])
        } else {
            fetchSignInMethodsForEmail(auth,shareWith).then((methods) => {
                if(methods.length > 0){
                    props.handleShareList(shareWith)
                    setShowAlertInvalidEmail([false,""])
                } else {
                    setShowAlertInvalidEmail([true,"whoops, looks like this user isn't registered yet!"])
                }
            }).catch((error) => {
                setShowAlertInvalidEmail([true,"invalid email: please check that the email is a valid address"]) 
            });
        }
    }
    const handleClickMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };
    const handleMenuAction = (event, option) => {
        if (option === showHideCompleted) {
            props.onToggleComplete(props.showCompleted)
        }else if (option === 'Delete Completed') {
            setDialogOpenDelete(true);
        }else if (option === 'Rename List') {
            setRenameDialogOpen(true);
        }else if (option === 'Delete List' || option === 'Remove List') {
            if (props.list.owner === user.uid){
                setShowAlertDelete(false)
                setDeleteListDialogOpen(true);
            } else {
                setRemoveListDialogOpen(true)
            }
        } else if (option === 'Share List') {
            props.setShareListDialogOpen(true)
        }
        setAnchorElMenu(null);
    };

  return (
    <div>
        {!isNarrowThan300 && (
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <IconButton onClick={handleDialogOpen} sx={{color: 'primary.dark'}} aria-label={"Add a new task"}>
                    <AddCircleOutlineIcon />
                </IconButton>
                <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <List
                        component="nav"
                        aria-label="Sort settings"
                        sx={{ bgcolor:'background.paper' }}
                    >
                        <ListItem
                        button
                        id="sort-button"
                        aria-haspopup="listbox"
                        aria-controls="sort menu"
                        aria-label={`Sorting by ${props.sortBy}`}
                        aria-expanded={openSort ? 'true' : undefined}
                        onClick={handleClickListItemSort}
                        >
                            <ListItemText
                                primary={<div style={{ display: 'flex', flexDirection: 'row'}}><Typography>Sort by</Typography><ExpandMoreIcon sx={{color:'primary.dark'}}/></div>}
                                primaryTypographyProps={{ sx: { color:"primary.dark" } }}
                                secondary={props.sortBy==='created' ? 'creation date' : props.sortBy}
                                secondaryTypographyProps={{ sx: { color:"black" } }}
                            />
                        </ListItem>
                    </List>
                    <Menu
                        id="sort-menu"
                        anchorEl={anchorElSort}
                        open={openSort}
                        onClose={handleCloseSort}
                        MenuListProps={{
                        'aria-labelledby': 'sort-button',
                        role: 'listbox',
                        }}
                    >
                        {sortOptions.map((option, index) => (
                        <MenuItem
                            key={option}
                            disabled={index === sortOptions.indexOf(props.sortBy)}
                            selected={index === sortOptions.indexOf(props.sortBy)}
                            onClick={(event) => handleMenuItemClickSort(event, index)}
                        >
                            {option==='created' ? 'creation date' : option}
                        </MenuItem>
                        ))}
                    </Menu>
                    {props.sortDir==='asc' && (
                        <IconButton
                            sx={{color:'primary.dark'}}
                            onClick={handleClickSortDirection}
                            aria-label="Current sort direction is ascending. Click to flip direction to descending."
                        >
                            <ArrowUpwardIcon />
                        </IconButton>)
                    }
                    {props.sortDir==='desc' && (
                        <IconButton
                            sx={{color:'primary.dark'}}
                            onClick={handleClickSortDirection}
                            aria-label="Current sort direction is descending. Click to flip direction to ascending."
                        >
                            <ArrowDownwardIcon />
                        </IconButton>)
                    }
                </Box>
                <IconButton
                    sx={{color:'primary.dark'}}
                    aria-label="Hamburger menu button for more options to manage tasks."
                    id="long-button"
                    aria-controls={openMenu ? 'manage-tasks-menu' : undefined}
                    aria-expanded={openMenu ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClickMenu}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'manage-tasks-menu-button',
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
                    {menuOptions.map((option) => (
                    <MenuItem key={option} onClick={(event) => handleMenuAction(event, option)}>
                        {option}
                    </MenuItem>
                    ))}
                </Menu>
            </Box>
        )}
        {isNarrowThan300 && (
            <Box sx={{display:'flex', flexDirection:'row', alignContent:'center'}}>
                <IconButton
                    sx={{color:'primary.dark'}}
                    aria-label="options to manage tasks"
                    id="long-button"
                    aria-controls={openMenu ? 'manage-tasks-options-menu' : undefined}
                    aria-expanded={openMenu ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClickMenu}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'manage-tasks-options-button',
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
                    <MenuItem key={'Add Task'} onClick={handleDialogOpen} >Add Task</MenuItem>
                    {menuOptions.map((option) => (
                    <MenuItem key={option} onClick={(event) => handleMenuAction(event, option)}>
                        {option}
                    </MenuItem>
                    ))}
                </Menu>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                    <List
                        component="nav"
                        aria-label="Sort settings"
                        sx={{ bgcolor: 'background.paper' }}
                    >
                        <ListItem
                        button
                        id="sort-button"
                        aria-haspopup="listbox"
                        aria-controls="sort-menu"
                        aria-label={`Sorting by ${props.sortBy}`}
                        aria-expanded={openSort ? 'true' : undefined}
                        onClick={handleClickListItemSort}
                        >
                            <ListItemText
                                primary={<div style={{ display: 'flex', flexDirection: 'row'}}><Typography>Sort by</Typography><ExpandMoreIcon sx={{color:'primary.dark'}}/></div>}
                                primaryTypographyProps={{ sx: { color: "primary.dark" } }}
                                secondary={props.sortBy==='created' ? 'creation date' : props.sortBy}
                                secondaryTypographyProps={{ sx: { color:"black" } }}
                            />
                        </ListItem>
                    </List>
                    <Menu
                        id="sort-menu"
                        anchorEl={anchorElSort}
                        open={openSort}
                        onClose={handleCloseSort}
                        MenuListProps={{
                        'aria-labelledby': 'sort-button',
                        role: 'listbox',
                        }}
                    >
                        {sortOptions.map((option, index) => (
                        <MenuItem
                            key={option}
                            disabled={index === sortOptions.indexOf(props.sortBy)}
                            selected={index === sortOptions.indexOf(props.sortBy)}
                            onClick={(event) => handleMenuItemClickSort(event, index)}
                        >
                            {option==='created' ? 'creation date' : option}
                        </MenuItem>
                        ))}
                    </Menu>
                    {props.sortDir==='asc' && (
                        <IconButton
                            sx={{color:'primary.dark'}}
                            onClick={handleClickSortDirection}
                            aria-label="Current sort direction is ascending. Click to flip direction to descending."
                        >
                            <ArrowUpwardIcon />
                        </IconButton>)
                    }
                    {props.sortDir==='desc' && (
                        <IconButton
                            sx={{color:'primary.dark'}}
                            onClick={handleClickSortDirection}
                            aria-label="Current sort direction is descending. Click to flip direction to ascending."
                        >
                            <ArrowDownwardIcon />
                        </IconButton>)
                    }
                </Box>
            </Box>
        )}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle aria-label='Create a New Task. Please enter the name and choose a priority level for the new task.'>Create a New Task</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter the name and choose a priority level for the new task below.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="nameNew"
                aria-label={!showAlert ? `Task name` : `Please enter a non-empty name for the task`}
                label="Task name"
                type="text"
                fullWidth
                variant="standard"
                value={title}
                onChange={handleSetTitle}
                sx={{color:'primary.dark'}}
            />
            {showAlert && <Typography sx={{ fontSize:12, color:'red' }}>Please enter a non-empty name for the task!</Typography>}
            <Button
                id="new-task-priority-button"
                variant='outlined'
                aria-controls={openPriority ? 'new-task-priority-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openPriority ? 'true' : undefined}
                onClick={handleClickPriority}
                sx={{marginTop:2, textTransform:'capitalize', color:'primary.dark'}}
            >
                <Typography variant='body' sx={{color:'primary.dark'}}>Priority level: {priorityDic[priority]}</Typography>
                <ExpandMoreIcon sx={{color:'primary.dark'}}/>
            </Button>
            <Menu
                id="new-task-priority-menu"
                anchorEl={anchorElPriority}
                open={openPriority}
                onClose={handleClosePriority}
                MenuListProps={{
                'aria-labelledby': 'new-task-priority-button',
                }}
            >
                <MenuItem onClick={(event) => handleChangePriority(event, 1)}>Low</MenuItem>
                <MenuItem onClick={(event) => handleChangePriority(event, 2)}>Medium</MenuItem>
                <MenuItem onClick={(event) => handleChangePriority(event, 3)}>High</MenuItem>
            </Menu>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDialogClose} sx={{color:'primary.dark'}}>Cancel</Button>
            <Button variant="contained" onClick={onSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={dialogOpenDelete} onClose={handleDialogCloseDelete}>
            <DialogTitle aria-label="Are you sure that you want to delete ALL completed tasks?">Delete All Completed Tasks</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Are you sure that you want to delete ALL completed tasks?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDialogCloseDelete} sx={{color:'primary.dark'}}>Cancel</Button>
            <Button variant="contained" onClick={onSubmitDelete}>Submit</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={removeListDialogOpen} onClose={handleRemoveListDialogClose}>
            <DialogTitle aria-label={'Remove current list. This will not delete the list, only remove you from the list of people who can view it.'}>Remove Current List</DialogTitle>
            <DialogContent>
                <DialogContentText>
                This will not delete the list, only remove you from the list of people who can view it.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleRemoveListDialogClose} sx={{color: 'primary.dark'}}>Cancel</Button>
            <Button onClick={onSubmitRemoveList} variant="contained">Confirm</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={deleteListDialogOpen} onClose={handleDeleteListDialogClose}>
            <DialogTitle aria-label={`Delete Current List. Please enter the name of the current list "${props.list.name}" to confirm deletion.`}>Delete Current List</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {`Please enter the name of the current list "${props.list.name}" to confirm deletion.`}
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="delete-list-name"
                aria-label={!showAlertDelete ? `List name` : `Please enter the correct name of the current list to confirm deletion`}
                label="List name"
                type="text"
                fullWidth
                variant="standard"
                value={deleteName}
                onChange={e => setDeleteName(e.target.value)}
                sx={{color:'primary.dark'}}
            />
            {showAlertDelete && <Typography sx={{ fontSize:12, color:'red' }}>Please enter the correct name of the current list to confirm deletion.</Typography>}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDeleteListDialogClose} sx={{color: 'primary.dark'}}>Cancel</Button>
            <Button onClick={onSubmitDeleteList} variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={renameDialogOpen} onClose={handleRenameDialogClose}>
            <DialogTitle aria-label={`Rename Current List. Please enter the new name of the current list named "${props.list.name}".`}>Rename Current List</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {`Please enter the new name of the current list named "${props.list.name}".`}
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="rename-list-new-name"
                aria-label={!showAlertRename ? `New name` : `Please enter a non-empty name for the list`}
                label="New name"
                type="text"
                fullWidth
                variant="standard"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                sx={{color:'primary.dark'}}
            />
            {showAlertRename && <Typography sx={{ fontSize:12, color:'red' }}>Please enter a non-empty name for the list.</Typography>}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleRenameDialogClose} sx={{color:'primary.dark'}}>Cancel</Button>
            <Button onClick={onSubmitRenameList} variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>
        
        <Dialog fullWidth maxWidth='lg' open={props.shareListDialogOpen} >
            <DialogTitle aria-label={`Please enter an email to share "${props.list.name}".`}>Share {props.list.name}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {`Please enter an email to share "${props.list.name}".`}
            </DialogContentText>
            <Stack direction="row">
            <TextField 
                autoFocus
                margin="dense"
                id="share-list"
                aria-label={!showAlertInvalidEmail[0] ? `recipient` : showAlertInvalidEmail[1]}
                label="recipient"
                type="text"
                fullWidth
                variant="standard"
                value={shareWith}
                onChange={e => setShareWith(e.target.value)}
                sx={{color:'primary.dark'}}
                onKeyPress={e => e.key === 'Enter' && onSubmitShareList()}
            />
            <IconButton onClick={()=>onSubmitShareList()} sx={{color: 'primary.dark'}} aria-label={"share with email"}>
                    <AddCircleOutlineIcon />
            </IconButton>
            </Stack>
            {listOfUsersListIsSharedWith}
            {showAlertInvalidEmail[0] && <Typography sx={{ fontSize:12, color:'red' }}>{showAlertInvalidEmail[1]}</Typography>}
            
            </DialogContent>
            <DialogActions>
            <Button onClick={()=> props.setShareListDialogOpen(false)} variant="contained" >Close</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}