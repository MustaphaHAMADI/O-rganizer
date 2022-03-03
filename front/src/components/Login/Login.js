// import dependencies
import React, { useState } from 'react';
import { toast } from 'react-toastify';

// import style
import './login.scss';
import { TextField, Paper } from '@mui/material';

// import components
import Btn from '../Btn/Btn';

const defaultValues = {
  regNumber: '',
  password: '',
};

const Login = ({ getLogin }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (formValues.regNumber === '' || formValues.password === '') {
        toast.error('Tous les champs sont requis');
        return;
      }
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (formValues.regNumber === '' || formValues.password === '') {
      toast.error('Tous les champs sont requis');
      return;
    }
    try {
      getLogin(formValues);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='login'>
      <div className='login__img'></div>
      <Paper className='login__paper' elevation={2}>
        <h2 className='login__title'>
          Connectez-vous pour accéder à votre planning
        </h2>
        <form
          className='login__form'
          action='submit'
          onSubmit={handleLogin}
          onKeyPress={handleKeyPress}
        >
          <div className='login__form-textfield'>
            <TextField
              id='regNumber'
              label='Matricule'
              name='regNumber'
              type='text'
              value={formValues.regNumber}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className='login__form-textfield'>
            <TextField
              id='password'
              label='Mot de passe'
              name='password'
              type='password'
              value={formValues.password}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className='login__form-textfield'>
            <Btn
              text='Se connecter'
              fullWidth={true}
              disabled={
                !(
                  formValues.regNumber.length > 4 &&
                  formValues.password.length > 4
                )
              }
              clicked={handleLogin}
            />
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
