import React from 'react';
import Btn from '../Btn/Btn';

// import style
import './login.scss';

// import elements
import { TextField, Paper } from '@mui/material';

const Login = () => {
  return (
    <div className='login'>
      <div className='login__img'></div>
      <Paper className='login__paper' elevation={2}>
        <h2 className='login__title'>Connectez-vous pour accéder à votre planning</h2>
        <form className='login__form' action='submit'>
          <div className='login__form-textfield'>
            <TextField
              id='username'
              label='Username'
              type='username'
              fullWidth
            />
          </div>
          <div className='login__form-textfield'>
            <TextField
              id='password'
              label='Password'
              type='password'
              fullWidth
            />
          </div>
          <div className='login__form-textfield'>
            <Btn text='Se connecter' fullWidth={true} />
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
