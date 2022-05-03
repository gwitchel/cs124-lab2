# Design decisions for Lab5

1. we decided that a user cannot use their account until they have verified it using the email verification link. If the user cannot verify their email then we saw no reason why they should have access to any usability, other than the opportunity to log out. 

2. For sharing purposes, we developed the following rules 
   2.1. If user A shares their list with user B, user B cannot share it with user C
   2.2. If user A shared their list with user B, user B can remove themselves from the 
   list of people the list is shared with but no one else. 
   2.3. If user A is the owner of the list, they can remove user B from the list
   2.4. there can only be one list owner. 
   2.5. Ownership of lists cannot be transferred 
   2.6. If user A shares a list with user B, they can change all mutable properties of the list (ex: they can change the name, preference for order etc.)
   2.7. if user A shares a list propagated with tasks with user B, user B can create, delete, and edit all of those tasks. 
   2.8. Shared lists will appear secondary on the navbar and will appear a different color than lists that the user owns.
   2.9. If user A shares a list with user B, user B does not need to accept or decline it. The accept of decline would just come in the form of them choosing to keep or remove themselves from the list of people the list is shared with. 
   2.10 A user cannot share a list with themselves. 

3. we decided to show the sharing bar as a dialogue which opens when the user clicks "share list" in the menu bar (this is only displayed if the user is the owner of the list). From there the user can enter an email into a text input, and share with the email by pressing "enter" or the small plus button on the right. 

4. We decided to display the list of users the list is shared with directly below the input box in the form of a chip with the users name and a delete button. We decided on this interface because it's the most similar to how you might share a google document, and thus will be familiar to users. We attempted to mimic the google sharing interface as closely as possible in order to make it intuitive for users. Users can remove shared people from the list by clicking the X button next to the persons email (displayed on the same). 

5. We provided error checking for email sharing for the following cases 
   5.1. if the email is not a legitimate email 
   5.2. if the user is not a registered user (however they can be unverified)
   5.3. if the list is already currently shared with the user  

6. As stated in part 2, if user A shares a list with user B, user B cannot share the list with user C, however they can remove themselves from people who the list is shared with. We chose to display this by replacing the option for "delete list" in the navbar with a new option "remove list", which when clicked, opens a dialogue which informs the user that they are not deleting the list, merely removing themselves from the shared list. The user can then conform or deny, updating the shared list. 

7. We decided to make the share dialogue sticky (once opened, it remains open during reloads and interactions until the user clicks the "close" button). We chose this because the users will often share a list with multiple emails at a time, and we wanted them to be able to see the real time update of the user they are sharing with being added to the chip list, without having to reopen the dialogue. We received positive feedback about this choice during user testing, however it came at the cost of users potentially closing the dialogue on an email that has been entered into the box but not actually shared. We attempted to combat this problem by adding both a button to share an email, and to have emails automatically share when the user presses "enter" on the input box. 

8. We chose to display the user and title in a top tier navbar so the user can always see their authentication status, current logged in email, and the opportunity to log out. We displayed the authentication status next to the title in the form of a dropdown bar, which has the users first letter of their email as an icon. We thought this would be an good prompt to log out, but would prevent users from accidentally clicking the log-out button and then needing to re-authenticate. 

9. We noticed that in order to authenticate a HMC email, you need to use the extension "@g.hmc.edu" as opposed to "@hmc.edu" (this was not true for gmail). We are not confident as to why this is the case, but decided not to change it as generally we wanted to maintain emails as they are inputted without making assumptions as to if they should be changed.  

10. user testing: We did user testing with user A B and C. user B had the most to say, reporting the problem with the @hmc.edu extension sign on. User B also reported that they had accidentally closed the share dialogue without actually sharing the list. We fixed this by changing the button text from "Done" to "close". User B also reported that the "resend verification email" link did not respond when clicked, so we updated this as well as added error checking for if the email does actually send or if it catches on an error. User C had no complaints, but liked the interface and is now a regular user. User A reported that the sign on worked well, but they wold like more keyboard shortcuts as notifications when a user updates a shared list. We delegated this for future work.  

# Design decisions for Lab4

Video demo link for using a screen reader and keyboard: https://www.loom.com/share/7312c0484ccd47fd8014af885df10ebc
Video demo link for using only keyboard: https://www.loom.com/share/49f007f38d6c4529a94eb84a3cabdbb8

1. We decided to use flex display instead of grid display for the task rows in order to obtain responsive design when user resizes the screen or when user uses different screen sizes.

2. For various screen sizes, we changed the layout of the elements accordingly to make the app look more organized.
For the task rows, when the screen width is larger than 300 px, we retain the priority level representation, the edit icon button and the delete icon button all three in a row. This could be seen on most screen sizes such as laptop sizes and ipad sizes. If the screen width is smaller than 300 px but still larger than 230 px, we collapsed the edit  icon button and the delete icon button into a three-vertical-dots menu button to save space. This could be seen on the screen of "Galaxy Fold" (280 px x 653 px). If the screen width is smaller than 230 px, we moved the priority level representation and the three-vertical-dots menu button to be below the task name to further save some horizontal space. This case is rare but not impossible so we included it to make our app layout more solid.
For the navigation bar, if the screen width is larger than 300 px, we retained the layout of an add icon button, a priority setting menu and sort direction button, and a hamburger menu with space between two adjacent ones. When the screen width is smaller than 300 px, we combined the add function into the hamburger menu and this design can be seen on the screen of "Galaxy Fold" (280 px x 653 px).
For the "Start a New List" button, when the screen width is smaller than 230 px, it is collapsed into a hamburger menu.

3. We enabled multiple lists in our app with lots of handling for errors and edge cases. For instance, the tabs are scrollable horizontally in case the user has a lot of lists. We chose to wrap the list name if it's long. In all dialog windows, we checked for user inputs to make sure that it's non-empty/match with the current list name(to confirm deletion) when it is necessary. We implemented delete confirmation so that when user wants to delete a to-do list, the user would have to type the full name of the list to confirm deletion and avoid accidental deletions. We display "loading" when the app is loading, "No lists for display" when there are no to-do lists created, and error message when the firebase data retrieval has an error to avoid confusion.

4. Our database is designed to have one top-level collection called "Lists", which contains documents of to-do lists. Each document is one to-do list with properties including id, name, creation time, whether show completed tasks or not, sort by which property and sort direction. Sort by which property and sort direction are stored because we want to store user's different sort preferences for different lists so their customized options are saved. Each list document also has a sub-collection called "Tasks" which contains task documents like our previous version of the database.

5. We double-check and ensured that the color contrast between all texts and their backgrounds pass the standard.

6. We made our app accessible for users with low vision (trouble seeing small print or objects) by allowing them to zoom in the app without and collision of the app elements. We made our app accessible for users who can't use a mouse by enabling pure keyboard navigation. We also made our app accessible for users who can't see at all (using a screen reader) by enabling pure keyboard navigation with the aid of a screen reader. Our aria-labels provide helpful and necessary information for screen readers. For example, when the focus is at a checkbox of a task row, the screen reader would say information including the fact that it is a single task row, the task name, it is a checkbox, check to mark this task named xxx as completed, and the task's priority level. We also took care of warning text below input fields in dialog windows as well to ensure that things like "Please enter a non-empty name for the list" are also read by the screen reader when they appear.

7. User testing.
We did user testing with user A and user B by asking them to use the app 1) normally on their devices 2) with resizing of the screen(allow inspect mode responsive dimensions) and 3) entirely with only keyboard and a screen reader. Both users reported that using only keyboard and screen readers is kind of a new experience to them but the app is still easy to navigation and all functionalities are clear to them. User B had a suggestion that it would be great if the screen reader could also say the task name when the focus moves to the edit icon and the delete icon so that she would know which task the icons were referring to without going back and listen to the task name again. We thanked her and incorporated that information in our app. We also included similar information of list name in dialog windows for renaming and deleting the current list. For example, "Please enter the new name of the current list named 'grocery'" and "Please enter the name of the current list 'grocery' to confirm deletion". We felt that this would be more convenient to the user.



# Changes in Design for Lab3

1. We changed the design for the navigation bar by consolidating the "Show/Hide Completed" and "Delete Completed" buttons into one hamburger menu as it will make space for the sorting options menu. The final design consists of three components in a row: an add icon for adding a new task, a "Sort by xxx" menu to choose the sorting option, and a hamburger menu with "Show/Hide Completed" and "Delete Completed" options. The add icon is on the left most side aligned with the title and the left side of the task list. The hamburger menu icon is on the right most side aligned with the right side of the task list. The gives a sense of order and formality. We have thought about consolidating the adding a new task function into the hamburger menu but we felt that the add function is used much more frequently compared to other functions so it is more convenient to leave it as a separate button for easy access.

2. For the "Sort by xxx" menu dropdown, we decided to display the current sorting criterion as a smaller grey text to provide useful information to the user without distracting the user by making it too prominent. When creating a new task or editing a new task, we decided to ask the user to choose the priority level from a dropdown and the default is low or the previously chosen level. in this way, each newly created task will always have a priority level and the user doesn't need to tap the menu if they are fine with the default level. The user is also allowed to edit a task with an empty new task name (only edit the priority level) which makes sense and is different from the previous design.

3. In terms of the display to indicate different priority levels, we decided to use "!" for low priority, "!!" for medium priority and "!!!" for high priority. We have considered using numbers such as 1, 2, and 3, but it is not intuitively understandable which number represents the most urgent level(1 or 3). We have also considered displaying text but it would take too much space and it is not neat or compact. We also considered using icons but we didn't find satisfiable ones to distinguish between different priority levels and yet intuitively understandable. Thus, we decided that using different numbers of exclamation marks is intuitive, distinctive, and compact.

4. We enabled changing sorting direction by clicking on the arrow icon next to the "Sort by" menu. If the current sorting direction is ascending, the arrow will be upward and clicking the arrow flips the direction of sorting to descending and also the direction of the arrow to downward. If the current sorting direction is descending, the arrow will be downward and clicking the arrow flips the direction of sorting to ascending and also the direction of the arrow to upward.

5. We used a uniform blue color for all clickable icons and buttons to give a sense of theme and formality. We used red color for priority levels(!, !!, and !!!) as red is a contrast to blue and red signifies a sense of urgency.

6. User Testing.
   We did user testing with two people, UserA and UserB. We first give them a few minutes to play with the app and explore by themselves. Then, we asked them to perform a series of tasks:
   1. In the current list, create an item named "buy apples" with low priority.
   2. Mark the item named "call Mom" completed.
   3. Mark the item named "call Mom" uncompleted.
   4. Rename the item "buy book" to "buy math textbook".
   5. Change the priority level for "buy apples" from low to medium.
   6. Show only uncompleted items.
   7. Show only completed items.
   8. Delete all completed items.
   9. Create an item with a very long name (more than ten words).
   10. Delete all items.
   11. Mark all items as completed and hide all of them.
   12. Sort items by title, ascending and then descending.
   13. Sort items by creation date, ascending and then descending.
   14. Sort items by priority, ascending and then descending.
   By observing them performing the above tasks and providing no guidance, we felt that the app is pretty straight-forward and easy to use as both users could figure out the necessary steps to complete an instruction in a few seconds and they were not confused with any steps in the entire process. Then, we interviewed them about how they felt about the app. They both mentioned that the app is "pretty clear" and "easy to use". We asked them about the feedback for the adding a new task functionality specifically. Instead of having the add function in the hamburger menu together with "Show/Hide Completed" and "Delete Completed" functions, both users felt that it is better to have the add function as a separate icon button as they tend to use it more frequently compared to the other two functions and it is convenient if the add button is easily accessible with only one tap (instead of two taps if it is in the hamburger menu). This confirms that our design decision was correct.





# Design Decisions and Processes for Lab2
# Our design decisions, rationale, and alternative designs considered
Initially, we have thought about giving each task component a state information which includes “name” and “isCompleted”. However, we realized that it was inconvenient to manipulate and keep the task information so we decided to only keep an array of tasks as a state for the Tasks component. Based on the DRY Principle (Don’t Repeat Yourself Principle), we felt that the displayedTasks should not be a state either as it is calculated based on the tasks array. It is a repetition to keep the displayedTasks list (the filtered list for display) as another state information as if the tasks state is changed, the filtered list also needs to be changed. We should only have “one canonical truth” and one place to store the tasks without repetition. In case our list gets really long and re-calculating the displayedTasks list becomes inefficient, we can use the “UseMemo” hook to prevent unnecessary calculation, and only re-calculate the list if anything inside the list changes.

In terms of the hierarchy of the components, we decided to have App as the biggest parent. Inside the App component, there is a Tasks component with many Task components as Tasks is a list of Task. Each Task component is used for one task that has a checkbox, a task title, a clickable edit icon and a clickable delete icon. There is also a NavBar component inside Tasks. It has a plus icon for creating new tasks and two buttons for “Hide Completed” and “Delete Completed”. If the user checks the checkbox for a task, that task will be mark as completed. If the user clicks on the edit icon, a dialog window pops up and ask the user for the new name of the selected task. If the user clicks on the delete icon for a task, that single task will be deleted. When user clicks on the plus icon, a dialog window pops up to ask the user for the name of the new task in an input text field. If the user clicks on “Hide Completed”, all completed tasks will not be displayed but they will not be removed. If the user clicks on Delete Completed”, a dialog window will pop up and confirm with the user that they really want to remove all the completed tasks.

Each time when user clicks a checkbox to mark a task as completed or uncompleted, this “onClick” information will be passed to its parent component, the Tasks component which stores an array of tasks as a state, and re-calculate the displayedTasks property to update the UI display. Similarly, when the user clicks on the edit icon or the delete icon for a single task, this click information will be passed to the list component with the tasks state to update the displayedTasks property. Changing the title of a task and changing the "completed" state of a task are very similar so we combined them to a single function about changing a field of Task to avoid duplication of code.

We decided to make NavBar a child of Tasks instead of a parallel component as Tasks needs to have a state named showCompleted to register when the “Hide Completed” button is toggled and when to display/hide the completed tasks.

Also, we chose to Functions instead of Classes as we can use React hooks with Functions but not Classes.

In addition, we chose to display uncompleted tasks before completed tasks because people usually look for uncompleted tasks much more frequently than the completed tasks as they want to focus on what needs to be done. If they want to check any of the completed tasks, they can simply scroll down to see. We also didn't want to mix uncompleted tasks and completed tasks as that would be hard for the user to see what needs to be done.

For error handling, if the user tries to create a new task with an empty name or to change a task name to an empty name, we will display a red color helper text to remind them to enter a non-empty name. The helper text disappears when the user enters something in the text input field or when the dialog is closed (canceled) so the helper text won't stay when the user opens the dialog again. We also empty the input text field after the user submits as we don't want the old name to appear again when the dialog is open next time. Additionally, if the user enters a very long task name, the text will wrap to multiple lines for display. Although we felt that to-do lists are usually for people to write down something quickly in simple words and the task names are usually not long but we still want to give people the ability to have very long task names in case they have a lot of details.

In terms of the UI display, we have decided to left align the heading, the navigation bar, and the tasks list in the app, as it gives the user a sense of formality and order. We decided not to align the right side of these three components as they usually have very different lengths and it doesn't make sense to leave weird white space within each component (like the navigation bar) in order to right align them. Inside the navigation bar, we used flex row to align them in a horizontal line so it is easy for users to look for and locate elements in the navigation bar. Also, we decided to cluster the add button, "Hide Completed" button and the "Delete Completed" button together in one row as by the Proximity Principle they are all used to manage the tasks list so they should be placed together. Inside the tasks list, we left aligned and right aligned each row as it looks neat and professional. We also aligned the checkboxes in one column, left aligned the task names, and aligned the edit and delete icons in two columns to give a sense of formality and order. We used space-between for the checkboxes and names group and the icons group as it sets a clear divide between the task names and icons to modify them. This also helps to right align the tasks rows. We put the navigation bar below the heading and above the list of tasks as if the tasks list gets really long we don't need to scroll a lot down to look for the navigation bar. In addition, we used the Material UI library that is often used together with React to make everything prettier. In terms of color choice, we used the classic black and white color to give a sense of formality and a calm blue color make the app more vibrant, and blue color usually helps to calm people down if they are stressed by having a lot of tasks to do.

After user testing, we modified one small feature. UserA mentioned that it is kind of inconvenient sometimes if clicking on the task name and the checkboxes both mark the task as completed as she might accidentally click on the task name and didn't notice that the task was marked as completed. We reflected on her feedback and decided to only mark a task as completed if the user clicks on the checkbox itself but not the task name.

Additional features that we wanted to implement but didn't have enough time:
1. A search bar to enable search by task name.
2. A text display of something like “Task(s) Completed: 2/5”.

# User testing we did:
We did user testing with two people, UserA and UserB. We first give them a few minutes to play with the app and explore by themselves. Then, we asked them to perform a series of tasks:
1. In the current list, create an item named "Buy apples".
2. Mark the item named "Call Mom" completed.
3. Mark the item named "Call Mom" uncompleted.
4. Rename the item "Buy new John Grisham book" to "Buy Math textbook".
5. Show only uncompleted items.
6. Show only completed items.
7. Delete all completed items.
8. Create an item with a very long name (more than ten words).
9. Delete all items.
10. Mark all items as completed and hide all of them.
By observing them performing the ten tasks listed above and provide no guidance, we felt that the app is pretty straight-forward and easy to use as both users could figure out the necessary steps to complete an instruction in a few seconds and they were not confused with any steps in the whole process. Afterwards, we interviewed them about how they felt about the app. They both mentioned that the app is "pretty clear" and "easy to use". UserA said that she was very used to using the ios Reminders designed by Apple and she felt that one nice feature that she would like to have in this app is the ability to sort the order of the tasks by dragging and moving a task up or down. She liked how she could mark a task as completed by checking the checkbox easily but she felt that clicking on the task name itself to mark the task completed is kind of inconvenient sometimes. We reflected on her feedback and decided to only mark a task as completed if the user clicks on the checkbox but not the task name. We also liked the idea of dragging and changing the task order and we would definitely implement that if we had more time. UserB mainly talked about how it would be great to have the ability of setting the due time and due date of a task (and remind the user before that) but we were sorry that the app is currently a simple version of the to-do list and we didn't have enough time to implement that. It is certainly a useful feature to have for a more complex to-do list.

# The final design, including the flow for each task:
The app consists of three major components, the heading, the navigation bar, and the tasks list. The navigation bar consists of three buttons, an add icon button for adding a new task, a "Hide Completed" button for hiding all completed tasks and a "Delete Completed" button for deleting all completed tasks. The tasks list comprises of rows of tasks. Each row is designated for a single task, and each row has a checkbox to check for completed task, a task name, an edit icon to change the task name and a delete icon to delete the task.

To create a new task, the user clicks on the plus icon in the navigation bar and a dialog window pops up to ask the user to enter the name of the task. If the user clicks on "Submit", a new task with the input name will be added to the to-do list. If the user clicks "Cancel" or anywhere else, this process will be canceled. Note the the user is not allowed to create with an empty task name and if they do that, a red helper text will appear under the input text field to remind them, and the helper text will disappear as soon as they enter something in the input field.

To mark a task as completed, the user simply clicks on the checkbox before the task name and it is very intuitive. The completed task will move down the list to be after uncompleted tasks.

To rename a task, the user clicks on the edit icon for a task and a dialog window will pop up for them to enter the new name of the task. Same clicking rules from the creating a new task process apply.

To show or hide all completed tasks, toggle the "Hide/Show Completed" button.

To delete all completed tasks, the user clicks on the "Delete Completed" button and a dialog window will pop up to double confirm with them that they are very sure to delete all completed tasks.

# Challenges we faced:
It was difficult to decide and later modify the structure of the app and the relationship among different components, especially how we could pass to and back some important properties/state information among components. We didn't succeed on our first try but we continued to carefully reason about the logic and experiment with our subsequent design drafts and we finally made everything work!
It also took some time to implement good error handling.

# Parts of the design we're most proud of
We are proud of how we prompt the user with dialog windows and ask them for task names when they want to create a new task or edit a task name. We felt that this is very neat as it separates those two processes from the main page which displays all tasks.
We are also proud of the design for marking a task as completed by simply checking a checkbox, and instead of using checkboxes to select tasks we used icons to enable actions that target at a single task.
In addition, we are proud of how we added a confirmation window to ask the user if they really want to delete all completed tasks to avoid careless errors and unwanted loss of tasks.
We also handled very long task names by wrapping the text into multiple lines, and we didn't allow empty task names. We chose to display red color helper message if the user submits on empty name but the message will disappear as soon as the user types something in the input field. Also, we made sure to clear the input field every time after the user clicks on "Submit", "Cancel" or anywhere else to close the dialog window because we don't want to display any old text when the dialog window opens next time.
Additionally, if there is no task for display, which might happen if the user has deleted all tasks or if all tasks are completed and hidden, a friendly message "No tasks for display :)" will be displayed.
Last but not least, we decided to list all the completed tasks below the uncompleted tasks as people usually look for uncompleted tasks much more often and focus on what things need to be done.







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
