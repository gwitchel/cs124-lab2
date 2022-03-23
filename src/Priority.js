import React from 'react';
import Icon from "@mdi/react";
import {mdiChevronUp,mdiChevronDoubleUp, mdiChevronTripleUp} from '@mdi/js';

// priority button receives priority through props and returns the correct button
export default function Priority(props) {

    const PriorityIcons = [
        
        <Icon path={mdiChevronTripleUp} title="urgent" size={1} />,
        <Icon path={mdiChevronDoubleUp} title="normal" size={1}  />,
        <Icon path={mdiChevronUp} title = "casual" size={1} /> ]

    return (
        PriorityIcons[props.priority-1]
    )
}
