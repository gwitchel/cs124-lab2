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
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [title, setTitle] = useState("");

    const priorityDic = {1: "low", 2: "medium", 3: "high"}
    const [priority, setPriority] = useState(1);

    const [dialogOpenDelete, setDialogOpenDelete] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);

    const sortOptions = ['title', 'created', 'priority']
    const [anchorElSort, setAnchorElSort] = React.useState(null);
    const openSort = Boolean(anchorElSort);

    const showHideCompleted = props.showCompleted? 'Hide Completed': 'Show Completed'
    const menuOptions = [
        showHideCompleted,
        'Delete Completed'
    ];
    const ITEM_HEIGHT = 48;
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const openMenu = Boolean(anchorElMenu);

    const [anchorElPriority, setAnchorElPriority] = React.useState(null);
    const openPriority = Boolean(anchorElPriority);

    const isNarrowThan300 = useMediaQuery({ maxWidth: 300 })

    const handleSetTitle = e => {
        setTitle(e.target.value)
        if (e.target.value.length>0) {
            setShowAlert(false);
        }
    }

    const handleDialogOpen = () => {
        setDialogOpen(true);
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
            props.handleNewTaskSubmit(title, priority);
            handleDialogClose();
            setTitle("")
            setPriority(1)
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

    const handleClickMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleMenuAction = (event, option) => {
        if (option === showHideCompleted) {
            props.onToggleComplete(props.showCompleted)
        }else {
            handleDialogOpenDelete()
        }
        setAnchorElMenu(null);
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

  return (
    <div>
        {!isNarrowThan300 && (
            <div>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <IconButton onClick={handleDialogOpen} color="primary" aria-label={"Add button to add a new task"}>
                    <AddCircleOutlineIcon />
                </IconButton>
                <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <List
                        component="nav"
                        aria-label="Sort settings"
                        sx={{ bgcolor: 'background.paper' }}
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
                                primary={<div style={{ display: 'flex', flexDirection: 'row'}}><Typography>Sort by</Typography><ExpandMoreIcon/></div>}
                                primaryTypographyProps={{ sx: { color: "primary.main" } }}
                                secondary={props.sortBy}
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
                            color="primary"
                            onClick={handleClickSortDirection}
                            aria-label="Current sort direction is ascending. Click to flip direction to descending."
                        >
                            <ArrowUpwardIcon />
                        </IconButton>)
                    }
                    {props.sortDir==='desc' && (
                        <IconButton
                            color="primary"
                            onClick={handleClickSortDirection}
                            aria-label="Current sort direction is descending. Click to flip direction to ascending."
                        >
                            <ArrowDownwardIcon />
                        </IconButton>)
                    }
                </Box>
                <IconButton
                    color="primary"
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
                        // width: '20ch',
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
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle aria-label='Create a New List. Please enter the name of the task below.'>Create a New Task</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the name of the task below.
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
                    // inputProps={{ maxLength: 50 }}
                    value={title}
                    onChange={handleSetTitle}
                />
                {showAlert && <Typography sx={{ fontSize:12, color:'red' }}>Please enter a non-empty name for the task!</Typography>}
                <Button
                    id="new-task-priority-button"
                    variant='outlined'
                    aria-controls={openPriority ? 'new-task-priority-options-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openPriority ? 'true' : undefined}
                    onClick={handleClickPriority}
                    sx={{marginTop:2, textTransform: 'capitalize'}}
                >
                    <Typography variant='body'>Priority level: {priorityDic[priority]}</Typography>
                    <ExpandMoreIcon/>
                </Button>
                <Menu
                    id="new-task-priority-menu"
                    anchorEl={anchorElPriority}
                    open={openPriority}
                    onClose={handleClosePriority}
                    MenuListProps={{
                    'aria-labelledby': 'new-task-priority-options-menu',
                    }}
                >
                    <MenuItem onClick={(event) => handleChangePriority(event, 1)}>Low</MenuItem>
                    <MenuItem onClick={(event) => handleChangePriority(event, 2)}>Medium</MenuItem>
                    <MenuItem onClick={(event) => handleChangePriority(event, 3)}>High</MenuItem>
                </Menu>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
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
                <Button onClick={handleDialogCloseDelete}>Cancel</Button>
                <Button variant="contained" onClick={onSubmitDelete}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )}
    {isNarrowThan300 && (
        <div>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
                <IconButton
                    color="primary"
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
                        // width: '20ch',
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
                                primary={<div style={{ display: 'flex', flexDirection: 'row'}}><Typography>Sort by</Typography><ExpandMoreIcon/></div>}
                                primaryTypographyProps={{ sx: { color: "primary.main" } }}
                                secondary={props.sortBy}
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
                            color="primary"
                            onClick={handleClickSortDirection}
                            aria-label="Current sort direction is ascending. Click to flip direction to descending."
                        >
                            <ArrowUpwardIcon />
                        </IconButton>)
                    }
                    {props.sortDir==='desc' && (
                        <IconButton
                            color="primary"
                            onClick={handleClickSortDirection}
                            aria-label="Current sort direction is descending. Click to flip direction to ascending."
                        >
                            <ArrowDownwardIcon />
                        </IconButton>)
                    }
                </Box>
            </Box>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle aria-label='Create a New Task. Please enter the name of the new task below.'>Create a New Task</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the name of the new task below.
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
                    // inputProps={{ maxLength: 50 }}
                    value={title}
                    onChange={handleSetTitle}
                />
                {showAlert && <Typography sx={{ fontSize:12, color:'red' }}>Please enter a non-empty name for the task!</Typography>}
                <Button
                    id="new-task-priority-button"
                    variant='outlined'
                    aria-controls={openPriority ? 'new-task-priority-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openPriority ? 'true' : undefined}
                    onClick={handleClickPriority}
                    sx={{marginTop:2, textTransform: 'capitalize'}}
                >
                    <Typography variant='body'>Priority level: {priorityDic[priority]}</Typography>
                    <ExpandMoreIcon/>
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
                <Button onClick={handleDialogClose}>Cancel</Button>
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
                <Button onClick={handleDialogCloseDelete}>Cancel</Button>
                <Button variant="contained" onClick={onSubmitDelete}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )}
    </div>
  );
}
