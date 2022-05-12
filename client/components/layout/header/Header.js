import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Router from 'next/router';
import {logout} from '../../../hooks/useAuthApi';
const Header = ({currentUser}) => {

    const logoutHandler = async () => {
        try{
            await logout();
            Router.push('/auth/signin');
        }catch(err){
            console.log(err);
        }
    }
    console.log(currentUser);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <img style={{width: 50, height: 50}} src='/imgs/logo.png' alt='logoImg' />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ticket-it
          </Typography>
          {currentUser ? <Button color="inherit" onClick={logoutHandler}>Logout</Button> : 
            <>
                    <Button color="inherit" onClick={() => Router.push('/auth/signin')}>Login</Button>
                    <Button color="inherit" onClick={() => Router.push('/auth/signup')}>Register</Button> 
            </> }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

