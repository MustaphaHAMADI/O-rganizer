import React from 'react';
import { TextField, Button, Paper } from '@mui/material';
import './Login.scss';
import LoginImg from '../../assets/login-img.jpg';

const Login = () => {
  return (
    <div className='container'>
      <img src={LoginImg} className='login--img' alt='planning' />
      <Paper className='paper' elevation={2}>
        <h2 className='title'>Connectez vous pour acceder à votre planning</h2>
        <form className='form' action='submit'>
          <div className='form__textfield'>
            <TextField
              id='username'
              label='Username'
              type='username'
              fullWidth
            />
          </div>
          <div className='form__textfield'>
            <TextField
              id='password'
              label='Password'
              type='password'
              fullWidth
            />
          </div>
          <div className='form__textfield'>
            <Button className='btn' variant='outlined'>
              Se connecter
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
