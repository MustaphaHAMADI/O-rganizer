import React from 'react';
import { Paper, Grid, TextField, Button } from '@mui/material';

const Login = () => {
  return (
    <div className='container'>
      <form className='form' action='submit'>
        <TextField id='username' label='Username' type='username' fullWidth />
        <TextField id='password' label='Password' type='password' fullWidth />
        <Button variant='outlined'>Submit</Button>
      </form>
    </div>
  );
};

export default Login;
