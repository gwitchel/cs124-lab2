import React from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { Typography } from '@mui/material';
import { serverTimestamp } from "firebase/firestore";
import { setDoc, doc, updateDoc, deleteDoc, orderBy } from "firebase/firestore";
import { query, collection } from "firebase/firestore";
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";
import Task from './Task';
import Navbar from './Navbar';
import {db} from './firebase'
import Loading from './Loading';

function Tasks(props) {
    const { list, listDocRef } = props;
    const sortOptions = ['title', 'created', 'priority'];
    const tasksCollectionRef = collection(listDocRef, 'Tasks');
    const q = query(tasksCollectionRef, orderBy(list.sortBy, list.sortDir));   
    const [tasks, loading, error] = useCollectionData(q);
    const showCompleted = list.showCompleted;
    const [shareListDialogOpen, setShareListDialogOpen] = React.useState(false);

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

    function handleNewTask(title, priority){
        const taskId = generateUniqueID()
        setDoc(doc(tasksCollectionRef, taskId), {
            id: taskId,
            title: title,
            completed: false,
            created: serverTimestamp(),
            priority: priority
        })
    }
    function handleShareList(email){
        let updatedShareList =  list.sharedWith.concat([email])
        updateDoc(listDocRef, {
            sharedWith: updatedShareList
        })
    }

    function removeFromSharelist(email){
        let updatedShareList =  list.sharedWith.filter((e)=> e !== email )
        updateDoc(listDocRef, {
            sharedWith: updatedShareList
        })
    }
    

    function handleDeleteFinished(){
        let completed = tasks.filter(task => task.completed)
        completed.forEach(task => deleteDoc(doc(tasksCollectionRef, task.id)))
    }

    function renameList(name) {
        updateDoc(listDocRef, {
            name: name
        })
    }

    function deleteList() {
        tasks.forEach(task => deleteDoc(doc(tasksCollectionRef, task.id)))
        deleteDoc(doc(collection(props.db, 'listsLab5'), list.id))
        props.setTab(list.id)
    }
    

    const TasksToDisplay = () => {
        const allTasks = [...tasks]
        const completed = allTasks.filter(task => task.completed)
        const uncompleted = allTasks.filter(task => !task.completed)

        const tasksToDisplay = showCompleted ? uncompleted.concat(completed) : uncompleted

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

    const NavbarTasks = () => {
        return (
            <Navbar
                handleNewTask={handleNewTask}
                showCompleted={list.showCompleted}
                onToggleComplete={onToggleComplete}
                handleDeleteFinished={handleDeleteFinished}
                onChangeSortOption={onChangeSortOption}
                onChangeSortDirection={onChangeSortDirection}
                handleShareList={handleShareList}
                removeFromSharelist={removeFromSharelist}
                sortBy={list.sortBy}
                sortDir={list.sortDir}
                renameList={renameList}
                deleteList={deleteList}
                list={list}
                shareListDialogOpen={shareListDialogOpen}
                setShareListDialogOpen={setShareListDialogOpen}
            />
        )
    }
    

    if (loading) {
        return (
            <>
                <NavbarTasks />
                <p>Loading</p>
            </>
        )
    }else if (error) {
        return (
            <p>Error: {JSON.stringify(error)}</p>
        )
    }else if (tasks){
        return (
            <>
                <NavbarTasks />
                <TasksToDisplay />
            </>
        )
    }

}

export default function List(props) {

    const listDocRef = doc(db, `listsLab5/${props.listId}`);
    const [list, loading, error] = useDocument(listDocRef);

    if (loading) {
        return  <Loading/>
    }else if (error) {
        return (
            <p>Error: {JSON.stringify(error)}</p>
        )
    }else if (list){
        return <Tasks list={list.data()} listDocRef={listDocRef} db={db} setTab={props.setTab}/>
    }
}
