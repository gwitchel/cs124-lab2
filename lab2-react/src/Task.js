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
import "./Task.css"

export default function Task(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [title, setTitle] = useState("");

  const handleSetTitle = e => {
    setTitle(e.target.value)
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  function deleteTask(e) {
    props.deleteSingle(props.id);

    console.log("deleteTask called!")
  }

  function handleCheckboxClick(e) {
    props.handleEditTask(props.id, "completed", e.target.checked)

    console.log("handleCheckboxClick called!")
  }

  function onSubmit(e) {
    e.preventDefault();
    props.handleEditTask(props.id, "title", title)
    setTitle("")

    console.log("onSubmit called!")
  }

  return (
    <div>
      <Paper sx={{ minWidth: 275 }} className="Task">
          <FormControlLabel
            label={props.title}
            control={<Checkbox name="completed" checked={props.completed} onChange={handleCheckboxClick} />}
          />
          <Edit onClick = {handleDialogOpen}/>
          <Delete onClick = {deleteTask}/>
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
              value={title}
              onChange={handleSetTitle}
          />
          </DialogContent>
          <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={onSubmit}>Submit</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}

