import React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
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
import './Navbar.css';

export default function Navbar(props) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [title, setTitle] = useState("");
    const [dialogOpenDelete, setDialogOpenDelete] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);

    const sortOptions = ['title', 'creation date']
    const [anchorElSort, setAnchorElSort] = React.useState(null);
    const [selectedIndexSort, setSelectedIndexSort] = React.useState(0);
    const openSort = Boolean(anchorElSort);

    const showHideCompleted = props.showCompleted? 'Hide Completed': 'Show Completed'
    const menuOptions = [
        showHideCompleted,
        'Delete Completed'
    ];
    const ITEM_HEIGHT = 48;
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const openMenu = Boolean(anchorElMenu);

    const handleClickMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleMenuAction = (event, option) => {
        if (option === showHideCompleted) {
            props.onToggleComplete()
        }else {
            handleDialogOpenDelete()
        }
        setAnchorElMenu(null);
    };

    const handleClickListItemSort = (event) => {
        setAnchorElSort(event.currentTarget);
    };

    const handleMenuItemClickSort = (event, index) => {
        setSelectedIndexSort(index);
        props.onChangeSortOption(index)
        setAnchorElSort(null);
    };

    const handleCloseSort = () => {
        setAnchorElSort(null);
    };

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
    };

    function onSubmit(e) {
        e.preventDefault();
        if (title.length===0) {
            setShowAlert(true);
        }else{
            props.handleNewTaskSubmit(title);
            handleDialogClose();
            setTitle("")
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

  return (
    <div>
        <div className='navBar'>
            <IconButton onClick={handleDialogOpen} color="primary">
                <AddCircleOutlineIcon />
            </IconButton>
            <IconButton
                color="primary"
                aria-label="more"
                id="long-button"
                aria-controls={openMenu ? 'long-menu' : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClickMenu}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorElMenu}
                open={openMenu}
                onClose={handleCloseMenu}
                PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                },
                }}
            >
                {menuOptions.map((option) => (
                <MenuItem key={option} onClick={(event) => handleMenuAction(event, option)}>
                    {option}
                </MenuItem>
                ))}
            </Menu>
            <div>
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
                    aria-label="Sort by"
                    aria-expanded={openSort ? 'true' : undefined}
                    onClick={handleClickListItemSort}
                    >
                        <ListItemText
                            primary="Sort by"
                            primaryTypographyProps={{ sx: { color: "primary.main" } }}
                            secondary={sortOptions[selectedIndexSort]}
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
                        disabled={index === selectedIndexSort}
                        selected={index === selectedIndexSort}
                        onClick={(event) => handleMenuItemClickSort(event, index)}
                    >
                        {option}
                    </MenuItem>
                    ))}
                </Menu>
            </div>
        </div>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Create A New Task</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter the title of the task below.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="nameNew"
                label="Task Name"
                type="text"
                fullWidth
                variant="standard"
                // inputProps={{ maxLength: 50 }}
                value={title}
                onChange={handleSetTitle}
            />
            {showAlert && <Typography sx={{ fontSize:12, color:'red' }}>Please enter a non-empty title for the task!</Typography>}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button variant="contained" onClick={onSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
        <Dialog open={dialogOpenDelete} onClose={handleDialogCloseDelete}>
            <DialogTitle>Delete All Completed Tasks</DialogTitle>
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
  );
}
