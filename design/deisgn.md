# our design decisions, including their rationale (include images)
1. have the list be a single div tag populated with list items as children 
2. have a menu at the top to with buttons to toggle "view uncompleted items" and Delete all completed items. We chose to do it this way so that it would be easier to view at all times and because we thought it offered the best functionality. 
4. default display shows finished tasks. Alternatively we considered having tasks disappear when they were finished, but we decided against this because we thought users would find this confusing. We wanted to keep the interface as static as possible, seeing as a todo list has historically been a concrete object. 
5. each tasks has a checkbox next to it signifying it's status as finished. We also considered a button, however decided against it because a sheck box is more similar to a traiditonal todo list. Also finish tasks can now remain on the page with their box checked. 
6. When tasks are completed they turn green. We considered having no color change, as well as having them turn red, however we settled on green because red made the tasks feel more urgent (like they really needed to be done instead of being done) and no change didn't feel like there was enough response form the interface when the user changed something.  
7. Have the 'add new task' segment glued to the bottom so regardless of how many tasks you have it's always viewable (have the same be true for the upper as well). Alternatively we considered toggling it or adding it to the top, but we chose the bottom static because we felt like this was the cleanest and most simple way to do it. 
8. Finished tasks immediately move to the bottom. We saw pros and cons to implimenting this design element, but we thought the pros outweighed the cons.   
9. the edit and delete buttons are glued to the right for aesthetic appeal and ease of use. 

# Challenges we faced: 
1. One challenge we faced was in the proportions of our grid. We initially  had the sizes determined via pixels (statically), but this caused an error in which sometimes our rightmost buttons got chopped when the html pages were inserted into iframes. We fixed this by having the grid layout be in percents. 
2. Another challenge we faced was in the color scheme. It was difficult to choose colors which didn't make the interface look overly crowded, but still were enough that it was distinguished. We eventually went with a grey-scale color theme and a few bright pops of color. We wanted to keep it simple... vintage almost. 

# Parts of the design we're most proud of
1. Something we really like is the inclusion of images into our design. We think the edit and trash icon really help to make the interface simple and clean, while still portraying the message super clearly. 
