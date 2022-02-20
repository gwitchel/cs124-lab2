# components 
1. task component: checkbox, name, update, delete 
2. task-list component: all tasks, parents to task component 
3. add task comonent: enter task name + submit button 
4. navbar component: toggle finished tasks etc. 
5. main component: Top level object, extends all child components.

# decisions 
1. format global data as an array of objects: 
    [
        {
            id = 1 
            name: "task 1" 
            status: "finished"
        }
         {
             id = 2 
            name: "task 1" 
            status: "unfinished"
        }
    ]
2. tasks should be a state of the app



### we decided to use @material UI library to make everything prettier  