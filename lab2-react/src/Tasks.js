import React from 'react';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import Task from './Task';
import Navbar from './Navbar';
import './Tasks.css';

let initialData = [
    {
      id: 1, 
      title: "call mom", 
      completed: false 
    },
    {
      id: 2, 
      title: "buy new book", 
      completed: false 
    },
    {
      id: 3, 
      title: "assassinate the president", 
      completed: true 
    }
]

export default function Tasks(props) {
    const [taskList, setTaskList] = useState(initialData);
    const [showCompleted, setShowCompleted] = useState(true);
    const [title, setTitle] = useState("");
    const [newTaskDialogOpen, setNewTaskDialogOpen] = React.useState(false);

    const handleNewTaskDialogOpen = () => {
        setNewTaskDialogOpen(true);
    };

    const handleNewTaskDialogClose = () => {
        setNewTaskDialogOpen(false);
    };

    const handleSetNewTitle = e => {
        setTitle(e.target.value)
    }

    function onToggleComplete(){
        setShowCompleted(!showCompleted)

        console.log(`toggleCompleted called! new showCompleted: ${!showCompleted}` )
    }

    function deleteChild(id){
        setTaskList(taskList.filter(task => task.id !== id));

        console.log("deleteChild called! Task id:", id)
    }

    function checkChild(id, checked) {
        const newTaskList = taskList.map(task=>task.id===id ? {...task, completed:checked} : task)
        setTaskList(newTaskList);

        console.log(`checkChild called! Task id: ${id}, isChecked: ${checked}`)
    }

    function handleSubmit(e){
        e.preventDefault();
        const taskId = generateUniqueID()
        setTaskList([
            ...taskList,
            {
                id: taskId,
                title: title,
                completed: false,
            }
        ]);
        handleNewTaskDialogClose()

        console.log(`onItemAdded called! task title: ${title}, taskId: ${taskId}`)
    }

    const TasksToDisplay = () => {
        let tasksToDisplay = showCompleted ? taskList : taskList.filter(task => !task.completed)
        if (tasksToDisplay.length===0) {tasksToDisplay = 
            [{
                id: 0, 
                title: "Create a new task now! :)", 
                completed: false 
            }]
        }

        console.log("tasksToDisplay:")
        console.log(tasksToDisplay)

        return (
            <>
            {tasksToDisplay.map(task => (
                <Task key ={task.id} {...task} onDeleteTask={deleteChild} onCheckTask={checkChild}></Task>
            ))}
            </>
        )
    }

    return (
        <>
            <Navbar 
                newTaskDialogOpen={newTaskDialogOpen}
                handleNewTaskDialogOpen={handleNewTaskDialogOpen}
                handleNewTaskDialogClose={handleNewTaskDialogClose}
                title={title}
                handleSetNewTitle={handleSetNewTitle}
                handleSubmit={handleSubmit}
                showCompleted={showCompleted}
                onToggleComplete={onToggleComplete}
            />
            <TasksToDisplay className='tasks'/>
        </>
    )
}
