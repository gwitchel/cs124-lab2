import React from 'react';
import LooksOneTwoToneIcon from '@mui/icons-material/LooksOneTwoTone';
import LooksTwoTwoToneIcon from '@mui/icons-material/LooksTwoTwoTone';
import Looks3TwoToneIcon from '@mui/icons-material/Looks3TwoTone';

// priority button receives priority through props and returns the correct button
export default function Priority(props) {
    const PriorityIcons = [<Looks3TwoToneIcon/>,<LooksTwoTwoToneIcon/>,<LooksOneTwoToneIcon/>]
    return (
        <div style={{opacity:0.75}}>
         {PriorityIcons[props.priority-1]}
        </div>
    )
}
