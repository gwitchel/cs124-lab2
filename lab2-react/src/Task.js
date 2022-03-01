import React from 'react';
import {useState} from 'react';
import { Delete, Edit } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import "./Task.css"

export default function Task(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [showAlert, setShowAlert] = React.useState(false);

  const handleSetTitle = e => {
    setTitle(e.target.value)
    if (e.target.value.length>0) {
      setShowAlert(false);
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    setShowAlert(false);
    setTitle("")
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  function deleteTask(e) {
    props.deleteSingle(props.id);
  }

  function handleCheckboxClick(e) {
    props.handleEditTask(props.id, "completed", e.target.checked)
  }

  function onSubmit(e) {
    if (title.length===0) {
      setShowAlert(true);
    }else{
        props.handleEditTask(props.id, "title", title)
        handleDialogClose();
        setTitle("")
    }
  }

  return (
    <div className='Task'>
      <Paper sx={{display:"flex", justifyContent:"space-between"}}>
          <FormControlLabel
            label={<div style={{ width:180, whiteSpace:'normal', textAlign:'left', overflowWrap:'break-word' }}>{props.title}</div>}
            control={<Checkbox name="completed" checked={props.completed} onChange={handleCheckboxClick} style={{ pointerEvents: "auto" }} sx={{ml:1.5}}/>}
            style={{ pointerEvents: "none" }}
          />
          <div className='icons'>
            <Edit onClick = {handleDialogOpen}/>
            <Delete onClick = {deleteTask}/>
          </div>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Edit A Task Title</DialogTitle>
          <DialogContent>
          <DialogContentText>
              Please enter the new title of the task below.
          </DialogContentText>
          <TextField
              autoFocus
              margin="dense"
              id="titleEdit"
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
    </div>
  );
}

