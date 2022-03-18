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
import { setDoc, doc, updateDoc, deleteDoc, orderBy } from "firebase/firestore";
import { query, collection } from "firebase/firestore";
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
const collectionName = "Tasks";

export default function Tasks(props) {
    const sortOptions = ['title', 'created', 'priority']
    const [sortBy, setSortBy] = useState(sortOptions[0]);
    const q = query(collection(db, collectionName), orderBy(sortBy));   
    const [taskList, loading, error] = useCollectionData(q);
    const [showCompleted, setShowCompleted] = useState(true);

    function onToggleComplete(){
        setShowCompleted(!showCompleted)
    }

    function onChangeSortOption(index) {
        setSortBy(sortOptions[index])
    }

    function deleteSingle(id){
        deleteDoc(doc(db, collectionName, id))
    }

    function handleEditTask(id, field, value) {
        updateDoc(doc(db, collectionName, id), {
            [field]: value
        })
    }

    function handleNewTaskSubmit(title, priority){
        const taskId = generateUniqueID()
        setDoc(doc(db, collectionName, taskId), {
            id: taskId,
            title: title,
            completed: false,
            created: serverTimestamp(),
            priority: priority
        })
    }

    function handleDeleteFinished(){
        let tasksToDisplay = [...taskList]
        let completed = tasksToDisplay.filter(task => task.completed)
        completed.forEach(task => deleteDoc(doc(db, collectionName, task.id)))
    }

    const TasksToDisplay = () => {
        const allTasks = [...taskList]
        const completed = allTasks.filter(task => task.completed)
        const uncompleted = allTasks.filter(task => !task.completed)

        const tasksToDisplay = showCompleted ? uncompleted.concat(completed) : uncompleted

        console.log("allTasks", allTasks)
        console.log("sortBy", sortBy)

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

    if (loading) {
        return (
            <>
                <Navbar
                    handleNewTaskSubmit={handleNewTaskSubmit}
                    showCompleted={showCompleted}
                    onToggleComplete={onToggleComplete}
                    handleDeleteFinished={handleDeleteFinished}
                    onChangeSortOption={onChangeSortOption}
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
                    onChangeSortOption={onChangeSortOption}
                />

                <TasksToDisplay sx={{ml:10}}/>
            </>
        )
    }
}
