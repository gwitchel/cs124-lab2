import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './Navbar.css';

export default function Navbar(props) {

  return (
    <div className='navBar'> 
        <div>
            <IconButton onClick={props.handleNewTaskDialogOpen} color="primary">
                <AddCircleOutlineIcon />
            </IconButton>
            <Dialog open={props.newTaskDialogOpen} onClose={props.handleNewTaskDialogClose}>
                <DialogTitle>Create A New Task</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the title of the task below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Task Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={props.title}
                    onChange={props.handleSetNewTitle}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={props.handleNewTaskDialogClose}>Cancel</Button>
                <Button variant="contained" onClick={props.handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
        <Button onClick={props.onToggleComplete}>  {props.showCompleted? 'Hide Completed': 'Show Completed'} </Button>
        <Button> Delete Finished </Button>
    </div>
  );
}
