import React from 'react';
import { Delete, Edit } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./Task.css"

export default function Task(props) {
  function deleteTask(e) {
    props.onDeleteTask(props.id);

    console.log("deleteTask called!")
  }

  function handleCheckboxClick(e) {
    props.onCheckTask(props.id, e.target.checked);

    console.log("handleCheckboxClick called!")
  }

  return (
    <Paper sx={{ minWidth: 275 }} className="Task">
        <FormControlLabel
          label={props.title}
          control={<Checkbox name="completed" checked={props.completed} onChange={handleCheckboxClick} />}
        />
        <Edit />
        <Delete onClick = {deleteTask}/>
    </Paper>
  );
}

