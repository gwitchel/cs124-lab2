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
import './Navbar.css';

export default function Navbar(props) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [title, setTitle] = useState("");
    const [dialogOpenDelete, setDialogOpenDelete] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);

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
            <Button onClick={props.onToggleComplete} style={{textAlign:'left', marginLeft:'16px'}}>  {props.showCompleted? 'Hide Completed': 'Show Completed'} </Button>
            <Button onClick={handleDialogOpenDelete} style={{textAlign:'left'}}> Delete Completed </Button>
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
