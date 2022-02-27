# Design Decisions and Processes for Lab2
# Our design decisions, rationale, and alternative designs considered
Initially, we have thought about giving each task component a state information which includes “name” and “isCompleted”. However, we realized that it was inconvenient to manipulate and keep the task information so we decided to only keep an array of tasks as a state for the Tasks component. Based on the DRY Principle (Don’t Repeat Yourself Principle), we felt that the displayedTasks should not be a state either as it is calculated based on the tasks array. It is a repetition to keep the displayedTasks list (the filtered list for display) as another state information as if the tasks state is changed, the filtered list also needs to be changed. We should only have “one canonical truth” and one place to store the tasks without repetition. In case our list gets really long and re-calculating the displayedTasks list becomes inefficient, we can use the “UseMemo” hook to prevent unnecessary calculation, and only re- calculate the list if anything inside the list changes.

In terms of the hierarchy of the components, we decided to have App as the biggest parent. Inside the App component, there is a Tasks component with many Task components as Tasks is a list of Task. Each Task component is used for one task that has a checkbox, a task title, a clickable edit icon and a clickable delete icon. There is also a NavBar component inside Tasks. It has a plus icon for creating new tasks and two buttons for “Hide Completed” and “Delete Completed”. If the user checks the checkbox for a task, that task will be mark as completed. If the user clicks on the edit icon, a dialog window pops up and ask the user for the new name of the selected task. If the user clicks on the delete icon for a task, that single task will be deleted. When user clicks on the plus icon, a dialog window pops up to ask the user for the name of the new task in an input text field. If the user clicks on “Hide Completed”, all completed tasks will not be displayed but they will not be removed. If the user clicks on Delete Completed”, a dialog window will pop up and confirm with the user that they really want to remove all the completed tasks.

Each time when user clicks a checkbox to mark a task as completed or uncompleted, this “onClick”Information will be passed to its parent component, the Tasks component which stores an array of tasks as a state, and re-calculate the displayedTasks property to update the UI display. Similarly, when the user clicks on the edit icon or the delete icon for a single task, this click information will be passed to the list component with the tasks state to update the displayedTasks property. Changing the title of a task and changing the isCompleted state of a task are very similar so we combined them to a single function about changing the field of Task to avoid duplication of code.

We decided to make NavBar a child of Tasks instead of a parallel component as Tasks needs to have a state named showCompleted to register when the “Hide Completed” button is toggled and when to display/hide the completed tasks.

Also, we chose to Functions instead of Classes as we can use React hooks with Functions but not Classes.

In addition, we chose to display uncompleted tasks before completed tasks because people usually look for uncompleted tasks much more than the completed tasks as they want to focus on what needs to be done. If they want to check any of the completed tasks, they can simply scroll down to see. We also didn't want to mix uncompleted tasks and completed tasks as that would be hard for the user to see what needs to be done.

For error handling, if the user tries to create a new task with an empty name or to change a task name to an empty name, we will display a red color helper text to remind them to enter a non-empty name. The helper text disappears when the user enters something in the text input field or when the dialog is closed (canceled) so the helper text won't stay when the user opens the dialog again. We also empty the input text field after the user submits as we don't want the old name to appear again when the dialog is open next time. Additionally, the input text field has an upper limit of 50 characters to avoid very long task name and there is text to inform the user about this. We felt that to-do lists are usually for people to write down something quickly in simple words to remind themselves thus the task names are usually not long as people are not using it as notes or diaries.

In terms of the UI display, we have decided to left align all the tasks in the to-do list as it gives the user a sense of formality and order. We decided not to align the right side as if one task has a very long name then there will be a lot of spaces left between task name and the icons for other tasks. We put the navigation bar below the heading and above the list of tasks as if the tasks list gets really long we don't need to scroll down to look for the navigation bar.

We decided to use the Material UI library that is often used together with React to make everything prettier.

Justify the color usage!
Need more UI design principles and reasons!!!

Additional features that we considered but didn't have enough time to implement:
1. A search bar to enable search by task name.
2. A text display of something like “”Task(s) Completed: 2/5”.

# User testing we did:

# The final design, including screen images and the flow for each task:

# Challenges we faced:

# Parts of the design we're most proud of




# Design Decisions and Processes for Lab1
# Our design decisions, rationale, and alternative designs considered
1. Have the list be a single div tag populated with list items as children.
2. Have a menu bar with two buttons at the top, namely "Hide Finished" to hide all the completed items and "Delete Finished" to remove all the completed items. We chose to do it this way so that it would be easier to view at all times and because we thought it offered the best functionality.
3. Default display always includes finished tasks. Alternatively we considered having tasks disappear when they were finished, but we decided against this because we thought users would find this confusing. We wanted to keep the interface as static as possible, seeing as a todo-list has historically been a concrete object.
4. Each task has a checkbox next to it signifying its status as finished (checked) or unfinished (unchecked). We also considered using a button, however decided against it because using a check box is more similar to a traditional todo-list format. Also, finished tasks can now remain on the page with their boxes checked.
5. When tasks are completed their background color (of its own row) turn green. We considered having no color change, as well as having them turn red, however we settled on green because red made the tasks feel more urgent (like they really needed to be done instead of being done) and no color change didn't feel like there was enough response form the interface when the user changed something.  
6. Have the 'add new task' segment glued to the bottom so regardless of how many tasks the user has it's always viewable (have the same be true for the upper as well). Alternatively, we considered toggling it or adding it to the top, but we chose the bottom static design because we felt like this was the cleanest and most simple way of doing it.
7. Finished tasks are immediately moved to the bottom. We saw pros and cons to implementing this design element, but we thought the pros outweighed the cons.
8. The edit and delete buttons are glued to the right for aesthetic appeal and ease of use.
9. The tasks are in the order of when they were created (newly created tasks follow the old tasks). We wanted to give users the ability to rank the tasks by dragging and moving them around and we will implement that when we have more time in the next lab.

# User testing we did:
We did user testing with two suitemates. For the first user, we showed her those images in our walkthrough page without any description of what was going on, and asked her if she was able to figure out what task has been carried out by the user. For the second user, we showed her a complete view of our to-do list with all the functionalities and asked her to carry out all the tasks required in this lab. Although our to-do list was not completely interactive at this stage, she could describe what she wanted to click on and we would show her another image of the result of her action in order to simulate a completely interaction to-do list product. Both users has reported that out to-do list was pretty straight-forward and easy to use. They didn't have a lot of comments because the interface was really simple and it works well as an everyday todo-list. One of them mentioned that it would be nice to have some way of marking a task as urgent. The other said it would be useful to have a due date for each task and the ability to change the ranking by the user.

# Challenges we faced:
1. One challenge we faced was in the proportions of our grid. We initially had the sizes determined via pixels (statically), but this caused an error in which sometimes our rightmost buttons got chopped when the html pages were inserted into iframes. We fixed this by having the grid layout be in percents. 
2. Another challenge we faced was in the color scheme. It was difficult to choose colors which didn't make the interface look overly crowded, but still were enough that it was distinguished. We eventually went with a grey-scale color theme and a few bright pops of color. We wanted to keep it simple... vintage almost.

# Parts of the design we're most proud of
1. Something we really like is the inclusion of images into our design. We think the edit and trash icon really help to make the interface simple and clean, while still portraying the message super clearly.
