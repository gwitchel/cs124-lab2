import React from 'react';
import {useState} from 'react';
import { useMediaQuery } from 'react-responsive';
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

export default function Navbar(props) {
    const isNarrowThan300 = useMediaQuery({ maxWidth: 300 })

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
        'Delete List'
    ];
    const ITEM_HEIGHT = 48;
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const openMenu = Boolean(anchorElMenu);

    const [deleteListDialogOpen, setDeleteListDialogOpen] = React.useState(false);
    const [deleteName, setDeleteName] = useState("");
    const [showAlertDelete, setShowAlertDelete] = React.useState(false);

    const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
    const [newName, setNewName] = useState("");
    const [showAlertRename, setShowAlertRename] = React.useState(false);

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

    const handleDialogOpenDelete = () => {
        setDialogOpenDelete(true);
    };
    const handleDialogCloseDelete = () => {
        setDialogOpenDelete(false);
    };
    function onSubmitDelete(e) {
        e.preventDefault();
        props.handleDeleteFinished();
        handleDialogCloseDelete();
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

    const handleRenameDialogOpen = () => {
        setRenameDialogOpen(true);
    };
    const handleRenameDialogClose = () => {
        setRenameDialogOpen(false);
        setShowAlertRename(false)
        setNewName("")
    };
    const handleRenameListNew = e => {
        setNewName(e.target.value)
    }
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
            handleDialogOpenDelete()
        }else if (option === 'Rename List') {
            handleRenameDialogOpen()
        }else if (option === 'Delete List') {
            handleDeleteListDialogOpen()
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
                                secondary={props.sortBy}
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
                            {option}
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
                                secondary={props.sortBy}
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
                            {option}
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

        <Dialog open={deleteListDialogOpen} onClose={handleDeleteListDialogClose}>
            <DialogTitle aria-label='Delete Current List. Please enter the name of the current list to confirm deletion.'>Delete Current List</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter the name of the current list to confirm deletion.
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
                onChange={handleDeleteListName}
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
            <DialogTitle aria-label='Rename Current List. Please enter the new name of the current list.'>Rename Current List</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter the new name of the current list.
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
                onChange={handleRenameListNew}
                sx={{color:'primary.dark'}}
            />
            {showAlertRename && <Typography sx={{ fontSize:12, color:'red' }}>Please enter a non-empty name for the list.</Typography>}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleRenameDialogClose} sx={{color:'primary.dark'}}>Cancel</Button>
            <Button onClick={onSubmitRenameList} variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
