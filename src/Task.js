import React from 'react';
import {useState} from 'react';
import { Delete, Edit } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./Task.css"

export default function Task(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  // const [showAlert, setShowAlert] = React.useState(false);
  const priorityDic = {1: "!", 2: "!!", 3: "!!!"}
  const priorityDic1 = {1: "low", 2: "medium", 3: "high"}
  const [priority, setPriority] = useState(props.priority);
  const [anchorElPriority, setAnchorElPriority] = React.useState(null);
  const openPriority = Boolean(anchorElPriority);

  const handleSetTitle = e => {
    setTitle(e.target.value)
    if (e.target.value.length>0) {
      // setShowAlert(false);
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    // setShowAlert(false);
    setTitle("")
    setPriority(props.priority)
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
      props.handleEditTask(props.id, "priority", priority)
      handleDialogClose();
      setTitle("")
      setPriority(props.priority)
    }else{
        props.handleEditTask(props.id, "title", title)
        props.handleEditTask(props.id, "priority", priority)
        handleDialogClose();
        setTitle("")
        setPriority(props.priority)
    }
  }

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

  return (
    <div className='Task'>
      <Paper>
        <Grid container>
          <Grid item xs={9}>
            <FormControlLabel
              label={<div style={{ width:180, whiteSpace:'normal', textAlign:'left', overflowWrap:'break-word' }}>{props.title}</div>}
              control={<Checkbox name="completed" checked={props.completed} onChange={handleCheckboxClick} style={{ pointerEvents: "auto" }} sx={{ml:1.5}}/>}
              style={{ pointerEvents: "none" }}
            />
          </Grid>
          <Grid item xs={1} sx={{margin: 'auto'}}>
            <Typography sx={{color: 'red'}}>{priorityDic[props.priority]}</Typography>
          </Grid>  
          <Grid item xs={1} sx={{margin: 'auto'}}>
            <Edit onClick = {handleDialogOpen} sx={{color: 'primary.main'}}/>
          </Grid>
          <Grid item xs={1} sx={{margin: 'auto'}}>
            <Delete onClick = {deleteTask} sx={{color: 'primary.main'}}/>
          </Grid>
        </Grid>
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
          {/* {showAlert && <Typography sx={{ fontSize:12, color:'red' }}>Please enter a non-empty title for the task!</Typography>} */}
          <Button
              id="new-task-priority-button"
              variant='outlined'
              aria-controls={openPriority ? 'new-task-priority-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openPriority ? 'true' : undefined}
              onClick={handleClickPriority}
              sx={{marginTop:2, textTransform: 'capitalize'}}
          >
              <Typography variant='body'>Priority level: {priorityDic1[priority]}</Typography>
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
              <MenuItem onClick={(event) => handleChangePriority(event, 3)}>Low</MenuItem>
              <MenuItem onClick={(event) => handleChangePriority(event, 2)}>Medium</MenuItem>
              <MenuItem onClick={(event) => handleChangePriority(event, 1)}>High</MenuItem>
          </Menu>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={onSubmit}>Submit</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}

