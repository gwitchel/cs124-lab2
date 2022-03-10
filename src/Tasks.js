import React from 'react';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { Typography } from '@mui/material';
import Task from './Task';
import Navbar from './Navbar';
import './Tasks.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { query, collection, setDoc, doc, updateDoc, deleteDoc, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnLHzrDzijh4KmeJWRU5zSIiW2cPsZRHU",
    authDomain: "cs124-lab3-3028f.firebaseapp.com",
    projectId: "cs124-lab3-3028f",
    storageBucket: "cs124-lab3-3028f.appspot.com",
    messagingSenderId: "426502461839",
    appId: "1:426502461839:web:56b4c42f33c8a6187353fa"
    };
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = "tasks";

// setDoc(doc(...),{
//   ...
//   created: serverTimestamp()
// })

export default function Tasks(props) {
    const q = query(collection(db, collectionName));   
    const [taskList, loading, error] = useCollectionData(q);
    const [showCompleted, setShowCompleted] = useState(true);

    function onToggleComplete(){
        setShowCompleted(!showCompleted)
    }

    function deleteSingle(id){
        // setTaskList(taskList.filter(task => task.id !== id));
    }

    function handleEditTask(id, field, value) {
        // const newTaskList = taskList.map(task=>task.id===id ? {...task, [field]:value} : task)
        // setTaskList(newTaskList);
    }

    function handleNewTaskSubmit(title){
        // const taskId = generateUniqueID()
        // setTaskList([
        //     ...taskList,
        //     {
        //         id: taskId,
        //         title: title,
        //         completed: false,
        //     }
        // ]);
    }

    function handleDeleteFinished(){
        // setTaskList(taskList.filter(task => !task.completed))
    }

    const TasksToDisplay = () => {
        let tasksToDisplay = [...taskList]
        return
        // let completed = tasksToDisplay.filter(task => task.completed)
        // let uncompleted = tasksToDisplay.filter(task => !task.completed)

        // tasksToDisplay = showCompleted ? uncompleted.concat(completed) : uncompleted

        // return (
        //     <>
        //     {tasksToDisplay.length===0 && (
        //         <Typography>No tasks for display :)</Typography>
        //     )}
        //     {tasksToDisplay.length!==0 && (
        //         tasksToDisplay.map(task => (
        //         <Task
        //             key ={task.id}
        //             {...task}
        //             deleteSingle={deleteSingle}
        //             handleEditTask={handleEditTask}
        //         />
        //     )))}
        //     </>
        // )
    }

    if (loading) {
        return (
            <>
                <Navbar
                    handleNewTaskSubmit={handleNewTaskSubmit}
                    showCompleted={showCompleted}
                    onToggleComplete={onToggleComplete}
                    handleDeleteFinished={handleDeleteFinished}
                />
                <p>Loading</p>
            </>
        )
    }else if (!error){
        return (
            <>
                <Navbar
                    handleNewTaskSubmit={handleNewTaskSubmit}
                    showCompleted={showCompleted}
                    onToggleComplete={onToggleComplete}
                    handleDeleteFinished={handleDeleteFinished}
                />
                {/* <TasksToDisplay sx={{ml:10}}/> */}
            </>
        )
    }
}
