import React from 'react';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { Typography } from '@mui/material';
import Task from './Task';
import Navbar from './Navbar';
import './Tasks.css';

let initialData = [
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

        console.log(`onToggleComplete called! new showCompleted: ${!showCompleted}` )
    }

    function deleteSingle(id){
        setTaskList(taskList.filter(task => task.id !== id));

        console.log("deleteSingle called! Task id:", id)
    }

    function handleEditTask(id, field, value) {
        const newTaskList = taskList.map(task=>task.id===id ? {...task, [field]:value} : task)
        setTaskList(newTaskList);

        console.log(`handleEditTask called! task id: ${id}, field: ${field}, value: ${value}`)
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

        console.log(`handleNewTaskSubmit called! title: ${title}, taskId: ${taskId}`)
    }

    function handleDeleteFinished(){
        setTaskList(taskList.filter(task => !task.completed))

        console.log("handleDeleteFinished called!")
    }

    const TasksToDisplay = () => {
        let tasksToDisplay = showCompleted ? taskList : taskList.filter(task => !task.completed)
        tasksToDisplay.sort((a, b) => (a.completed > b.completed) ? 1 : -1)

        console.log("tasksToDisplay:")
        console.log(tasksToDisplay)

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
