import React from 'react';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Delete, Edit } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

export default function Task(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const priorityDic = {1: "!", 2: "!!", 3: "!!!"}
  const priorityDic1 = {1: "low", 2: "medium", 3: "high"}
  const [priority, setPriority] = useState(props.priority);
  const [anchorElPriority, setAnchorElPriority] = React.useState(null);
  const openPriority = Boolean(anchorElPriority);
  const isNarrowThan300 = useMediaQuery({ maxWidth: 300 })
  const isNarrowThan230 = useMediaQuery({ maxWidth: 230 })

  const handleSetTitle = e => {
    setTitle(e.target.value)
    if (e.target.value.length>0) {
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
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

  const [anchorElTask, setAnchorElTask] = React.useState(null);
  const openTask = Boolean(anchorElTask);
  const handleClickTaskMenu = (event) => {
    setAnchorElTask(event.currentTarget);
  };
  const handleCloseTaskMenu = () => {
    setAnchorElTask(null);
  };

  return (
    <Box sx={{margin:1}}>
      <Paper>
        {!isNarrowThan300 && !isNarrowThan230 && (
          <Box sx={{display:'flex', alignItems:'center'}}>
            <FormControlLabel
              label={<div style={{ whiteSpace:'normal', textAlign:'left', overflowWrap:'break-word' }}>{props.title}</div>}
              control={<Checkbox name="completed" checked={props.completed} onChange={handleCheckboxClick} style={{ pointerEvents: "auto" }} sx={{ml:1.5}}/>}
              style={{ pointerEvents: "none" }}
              sx={{ flexGrow: 1 }}
              aria-label={`Task name is ${props.title} and priority level is ${priorityDic1[props.priority]}`}
            />
            <Typography sx={{color: 'red'}} aria-label={`Priority level is ${priorityDic1[props.priority]}`}>{priorityDic[props.priority]}</Typography>
            <IconButton onClick={handleDialogOpen} aria-label="Button for editing a task"><Edit sx={{color: 'primary.main'}}/></IconButton>
            <IconButton onClick={deleteTask} aria-label="Button for deleting a task"><Delete sx={{color: 'primary.main'}}/></IconButton>
          </Box>)}
        {isNarrowThan300 && !isNarrowThan230 && (
          <Box sx={{display:'flex', alignItems:'center'}}>
            <FormControlLabel
              label={<div style={{ whiteSpace:'normal', textAlign:'left', overflowWrap:'break-word' }}>{props.title}</div>}
              control={<Checkbox name="completed" checked={props.completed} onChange={handleCheckboxClick} style={{ pointerEvents: "auto" }} sx={{ml:1.5}}/>}
              style={{ pointerEvents: "none" }}
              sx={{ flexGrow: 1 }}
              aria-label={`Task name is ${props.title} and priority level is ${priorityDic1[props.priority]}`}
            />
            <Typography sx={{color: 'red'}}>{priorityDic[props.priority]}</Typography>
            <Button
              id="task-button"
              aria-label="Menu button for options to manage this single task"
              aria-controls={openTask ? 'task-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openTask ? 'true' : undefined}
              onClick={handleClickTaskMenu}
            >
              <MoreVertIcon sx={{color: 'primary.main'}}/>
            </Button>
            <Menu
              id="task-menu"
              anchorEl={anchorElTask}
              open={openTask}
              onClose={handleCloseTaskMenu}
              MenuListProps={{
                'aria-labelledby': 'task-button',
              }}
            >
              <MenuItem onClick={handleDialogOpen}>Edit</MenuItem>
              <MenuItem onClick={deleteTask}>Delete</MenuItem>
            </Menu>
          </Box>
        )}
        {isNarrowThan230 && (
          <Box sx={{display:'flex', flexDirection: 'column'}}>
              <FormControlLabel
                label={<div style={{ maxWidth: '100%', whiteSpace:'normal', textAlign:'left', overflowWrap:'break-word' }}>{props.title}</div>}
                control={<Checkbox name="completed" checked={props.completed} onChange={handleCheckboxClick} style={{ pointerEvents: "auto" }} sx={{ml:1.5}}/>}
                style={{ pointerEvents: "none" }}
                aria-label={`Task name is ${props.title} and priority level is ${priorityDic1[props.priority]}`}
              />
              <Box sx={{display:'flex', flexDirection: 'row', alignItems:'center', justifyContent:'flex-end'}}>
                <Typography sx={{color: 'red'}}>{priorityDic[props.priority]}</Typography>
                <Box>
                  <Button
                  id="task-button"
                  aria-controls={openTask ? 'task-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openTask ? 'true' : undefined}
                  onClick={handleClickTaskMenu}
                  aria-label="Menu button for more options to manage this single task"
                  >
                    <MoreVertIcon sx={{color: 'primary.main'}}/>
                  </Button>
                  <Menu
                    id="task-menu"
                    anchorEl={anchorElTask}
                    open={openTask}
                    onClose={handleCloseTaskMenu}
                    MenuListProps={{
                      'aria-labelledby': 'manage-current-task-menu-button',
                    }}
                  >
                    <MenuItem onClick={handleDialogOpen}>Edit</MenuItem>
                    <MenuItem onClick={deleteTask}>Delete</MenuItem>
                  </Menu>
                </Box>
              </Box>
          </Box>
        )}
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
              label="Please enter the new title of the new task"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={handleSetTitle}
          />
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
    </Box>
  );
}
