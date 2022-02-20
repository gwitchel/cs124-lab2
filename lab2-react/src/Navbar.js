import React from 'react';
import Button from '@mui/material/Button';


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { ShowCompleted: true };
        this.ToggleCompleted = this.ToggleCompleted.bind(this);
      }
    ToggleCompleted(e){
        if (this.state.ShowCompleted) {
            this.setState({
                ShowCompleted: false 
              });
        } else {
            this.setState({
                ShowCompleted: true 
              });
        }
        this.props.onToggleCompleted(this.state.ShowCompleted);


        
    }
    render() {
        let showHideCompleted = this.state.ShowCompleted? 'Hide Completed': 'Show Completed'

      return (
          <span> 
              <Button onClick = {this.ToggleCompleted}>  {showHideCompleted} </Button>
              <Button> delete Finished </Button>
          </span>

      );
    }
  }

export default Navbar;
