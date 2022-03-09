import React from 'react';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { Typography } from '@mui/material';
import Task from './Task';
import Navbar from './Navbar';
import './Tasks.css';

const initialData = [
    {
      id: 1, 
      title: "Call Mom", 
      completed: false 
    },
    {
      id: 2, 
      title: "Buy new John Grisham book", 
      completed: false 
    },
    {
      id: 3, 
      title: "this is a very very very very very very very very very very long name", 
      completed: false 
    },
    {
      id: 4, 
      title: "Tell Mary that there's no class tomorrow", 
      completed: true 
    }
]

export default function Tasks(props) {
    const [taskList, setTaskList] = useState(initialData);
    const [showCompleted, setShowCompleted] = useState(true);

    function onToggleComplete(){
        setShowCompleted(!showCompleted)
    }

    function deleteSingle(id){
        setTaskList(taskList.filter(task => task.id !== id));
    }

    function handleEditTask(id, field, value) {
        const newTaskList = taskList.map(task=>task.id===id ? {...task, [field]:value} : task)
        setTaskList(newTaskList);
    }

    function handleNewTaskSubmit(title){
        const taskId = generateUniqueID()
        setTaskList([
            ...taskList,
            {
                id: taskId,
                title: title,
                completed: false,
            }
        ]);
    }

    function handleDeleteFinished(){
        setTaskList(taskList.filter(task => !task.completed))
    }

    const TasksToDisplay = () => {
        let tasksToDisplay = [...taskList]
        let completed = tasksToDisplay.filter(task => task.completed)
        let uncompleted = tasksToDisplay.filter(task => !task.completed)

        tasksToDisplay = showCompleted ? uncompleted.concat(completed) : uncompleted

        return (
            <>
            {tasksToDisplay.length===0 && (
                <Typography>No tasks for display :)</Typography>
            )}
            {tasksToDisplay.length!==0 && (
                tasksToDisplay.map(task => (
                <Task
                    key ={task.id}
                    {...task}
                    deleteSingle={deleteSingle}
                    handleEditTask={handleEditTask}
                />
            )))}
            </>
        )
    }

    return (
        <>
            <Navbar
                handleNewTaskSubmit={handleNewTaskSubmit}
                showCompleted={showCompleted}
                onToggleComplete={onToggleComplete}
                handleDeleteFinished={handleDeleteFinished}
            />
            <TasksToDisplay sx={{ml:10}}/>
        </>
    )
}
