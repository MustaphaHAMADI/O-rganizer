import React from 'react';
import Btn from '../Btn/Btn';

// import style
import './login.scss';

// import elements
import { TextField, Paper } from '@mui/material';
import LoginImg from '../../assets/login-img.jpg';

const Login = () => {
  return (
    <div className='container'>
      <img src={LoginImg} className='login--img' alt='planning' />
      <Paper className='paper' elevation={2}>
        <h2 className='title'>Connectez-vous pour accéder à votre planning</h2>
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
            <Btn text='Se connecter' fullWidth={true} />
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
