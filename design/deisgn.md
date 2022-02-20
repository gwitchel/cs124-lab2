# Design Decisions and Processes for Lab2
# Our design decisions, rationale, and alternative designs considered
Initially, we have thought about giving each task component a state information which includes “name” and “isCompleted”. However, we realized that it was inconvenient to manipulate and change the task information so we decided to only keep an array of tasks as a state for the list component. Based on the DRY Principle (Don’t Repeat Yourself Principle), we felt that the displayedTasks should not be a state either as it is calculated based on the tasks array. It is a repetition to keep the displayedTasks list (the filtered list for display) as another state information as if the tasks state is changed, the filtered list also needs to be changed. We should only have “one canonical truth” and one place to store the tasks without repetition. In case our list gets really long and re-calculating the displayedTasks list becomes inefficient, we can use the “UseMemo” hook to prevent unnecessary calculation, and only re- calculate the list if anything inside the list changes.

In terms of the hierarchy of the components, we decided to have the to-do list app as the biggest parent. Inside the app, we have a menu bar component with two buttons component for “Hide Completed” and “Remove Completed”. We also have an input bar component with an input text field component for the user to enter the name of a new task and a plus button component for the user to create a new task. If the user enters nothing for the name of the new task, then the new task will not be created and an alert text will be displayed to remind the user to add a name for the new task. Inside the app component, there is also a list component with many row component. Each row component is designated for one task, with a checkbox, a task name, a clickable edit icon and a clickable delete icon.

Each time when user clicks a checkbox to mark a task as completed or uncompleted, this “onClick”Information will be passed to its parent component, the list component which stores an array of tasks as a state, and re-calculate the displayedTasks property to update the UI display. Similarly, when the user clicks on the edit icon or the delete icon for a single task, this click information will be passed to the list component with the tasks state to update the displayedTasks property.

In terms of the UI display, we have decided to align all the rows in the to-do list on both sides as it gives the user a sense of formality and order. We also use grid to align all the corresponding sub-component in each row, such as the checkboxes, the task names(left-aligned), the edit icon and the delete icon to give a sense of order and make it easy for the user when they are looking for a particular thing to click on.

Explain and justify the arrangement of the menu bar, the input bar, and the heading IN DETAIL.
Need more design processes for how the menu bar and the input bar interact with the tasks list!

Introduce and justify the color usage.

Need more design principles for UI!

Additional features to consider:
1. A search bar to enable search by task name.
2. A text display of “Total tasks: 5” or something like “”Task(s) Completed: 2/5”.

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
