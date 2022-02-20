import React from 'react';
import Task from './Task';
import Navbar from './Navbar';

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

class Tasks extends React.Component {
    constructor(props) {
        super(props)
        this.deleteChild = this.deleteChild.bind(this);
        this.ToggleCompleted = this.ToggleCompleted.bind(this);

        this.state = {
            taskList : initialData,
            showCompleted : true
        }
    }

   deleteChild(id){
       console.log("Delete child with id:", id)
       let newTaskList = [] 
       for (var i = 0; i < this.state.taskList.length; i++){
            if(this.state.taskList[i].id !== id){
                newTaskList.push(this.state.taskList[i])           
            }
       }
       this.setState({
        taskList: newTaskList
      });
   }

    ToggleCompleted(newShowCompleted){
       console.log("toggling completed", this.state.showCompleted,newShowCompleted )
       this.setState({
        showCompleted: newShowCompleted
      });
   }

    render() {
        let tasksToDisplay; 
        if (this.state.showCompleted){
            console.log("Showing completed")
            tasksToDisplay = this.state.taskList.map((task) => (
                <Task key ={task.id} {...task} onDeleteChild = {this.deleteChild}></Task>
            ));
        } else {

            let tempTasks = [] 
            for (var i = 0; i < this.state.taskList.length; i++){
                if(!this.state.taskList[i].completed) tempTasks.push(this.state.taskList[i]);
            } 
            
            console.log("hiding completed", tempTasks)

            tasksToDisplay = tempTasks.map((task) => (
                <Task key ={task.id} {...task} onDeleteChild = {this.deleteChild}></Task>
            ));
        }

        return (
            <>
            <Navbar onToggleCompleted = {this.ToggleCompleted}/>
            {tasksToDisplay}
            </>
        )
    }
}

export default Tasks