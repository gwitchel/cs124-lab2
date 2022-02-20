import React from 'react';
import Button from '@mui/material/Button';


class TaskBar extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
      }

    render() {

      return (
        <> 
          <input></input> 
          <Button>Submit</Button>
        </>

      );
    }
  }

export default TaskBar;
