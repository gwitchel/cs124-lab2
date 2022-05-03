 import React from 'react'
 import { signOut } from "firebase/auth";
 import {auth} from './firebase'
 import { Typography } from '@mui/material';
 import './Banner.css'
 import Box from '@mui/material/Box';
 import Avatar from '@mui/material/Avatar';
 import Menu from '@mui/material/Menu';
 import MenuItem from '@mui/material/MenuItem';
 import ListItemIcon from '@mui/material/ListItemIcon';
 import Divider from '@mui/material/Divider';
 import IconButton from '@mui/material/IconButton';
 import Tooltip from '@mui/material/Tooltip';
 import Logout from '@mui/icons-material/Logout';
 import { useAuthState } from "react-firebase-hooks/auth";

 function Banner() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [user, loading , error] = useAuthState(auth);
    console.log("Loading,error:", loading,error)
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
        <>
        <div className = "banner">
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6" >to-do's</Typography>
            {user && <Tooltip title="Account settings">
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                >
                <Avatar sx={{ width: 30, height: 30 }}>{user.email[0].toUpperCase()}</Avatar>
                </IconButton>
            </Tooltip>}
            </Box>
            {user &&
            <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
            {user.email &&
            < MenuItem>
                <Avatar /> {user.email}
            </MenuItem> 
             }
            {user.email && <Divider />}
            <MenuItem onClick={() => signOut(auth)}>
                <ListItemIcon>
                <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
            </Menu>}
            
        </div>
      </>
    );
 }
 
 export default Banner

 //#1769aa
//     <>
// <div className="banner">
//     <button onClick={() => signOut(auth)}> Logout </button>
//     <Typography variant="h5">simple to-do's</Typography>
// </div>
// <hr/>
// </>