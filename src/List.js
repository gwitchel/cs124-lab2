import React from 'react';
// import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { Typography } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { setDoc, doc, updateDoc, deleteDoc, orderBy } from "firebase/firestore";
import { query, collection } from "firebase/firestore";
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";
import Task from './Task';
import Navbar from './Navbar';

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

function Tasks(props) {
    const { list, listDocRef } = props;
    
    console.log("list", list)
    
    const sortOptions = ['title', 'created', 'priority'];
    const tasksCollectionRef = collection(listDocRef, 'Tasks');
    const q = query(tasksCollectionRef, orderBy(list.sortBy, list.sortDir));   
    const [tasks, loading, error] = useCollectionData(q);
    const showCompleted = list.showCompleted;

    function onToggleComplete(showCompleted){
        updateDoc(listDocRef, {
            showCompleted: !showCompleted
        })
    }

    function onChangeSortOption(index) {
        updateDoc(listDocRef, {
            sortBy: sortOptions[index]
        })
    }

    function onChangeSortDirection(dir) {
        updateDoc(listDocRef, {
            sortDir: dir
        })
    }

    function deleteSingle(id){
        deleteDoc(doc(tasksCollectionRef, id))
    }

    function handleEditTask(id, field, value) {
        updateDoc(doc(tasksCollectionRef, id), {
            [field]: value
        })
    }

    function handleNewTaskSubmit(title, priority){
        const taskId = generateUniqueID()
        setDoc(doc(tasksCollectionRef, taskId), {
            id: taskId,
            title: title,
            completed: false,
            created: serverTimestamp(),
            priority: priority
        })
    }

    function handleDeleteFinished(){
        let tasksToDisplay = [...tasks]
        let completed = tasksToDisplay.filter(task => task.completed)
        completed.forEach(task => deleteDoc(doc(tasksCollectionRef, task.id)))
    }

    const TasksToDisplay = () => {
        const allTasks = [...tasks]
        const completed = allTasks.filter(task => task.completed)
        const uncompleted = allTasks.filter(task => !task.completed)

        const tasksToDisplay = showCompleted ? uncompleted.concat(completed) : uncompleted

        // console.log("allTasks", allTasks)
        // console.log("sortBy", list.sortBy)

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
                    showCompleted={list.showCompleted}
                    onToggleComplete={onToggleComplete}
                    handleDeleteFinished={handleDeleteFinished}
                    onChangeSortOption={onChangeSortOption}
                    onChangeSortDirection={onChangeSortDirection}
                    sortBy={list.sortBy}
                    sortDir={list.sortDir}
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
                    onChangeSortDirection={onChangeSortDirection}
                    sortBy={list.sortBy}
                    sortDir={list.sortDir}
                />

                <TasksToDisplay />
            </>
        )
    }

}

export default function List(props) {
    const listDocRef = doc(db, `Lists/${props.listId}`);
    const [list, loading, error] = useDocument(listDocRef);

    if (loading) {
        return (
            <p>Loading</p>
        )
    }else if (!error){
        return <Tasks list={list.data()} listDocRef={listDocRef} />
    }
}
