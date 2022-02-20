import React from 'react';
import { Delete, Edit } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

class Task extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        // this.state = { counter: 0 };
        this.deleteSelf = this.deleteSelf.bind(this);
      }

      deleteSelf(e) {
            console.log("DeletingSelf")
            this.props.onDeleteChild(this.props.id);
        
    }

    render() {
      return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography>
                        {this.props.title}
                    </Typography>
                    <Edit />
                    <Delete onClick = {this.deleteSelf}/>
                </CardContent>
            </Card>


      );
    }
  }

export default Task;
