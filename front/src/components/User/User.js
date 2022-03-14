import React, { useState, useEffect } from 'react';
import './user.scss';
import avatar from '../../assets/user.png';
import userService from '../../app/features/userHandling/UserService';
import Btn from '../Btn/Btn';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const User = () => {
  const defaultValues = {
    password: '',
  };

  const [user, setUser] = useState([]);
  const [modif, setModif] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  const params = useParams();
  const userId = JSON.parse(localStorage.user).id;

  const handleSubmit = () => {
    if (formValues.password === formValues.confirmPassword) {
      userService.patchUser(userId, formValues);
      setModif(false);
    } else {
      toast.error('La confirmation du mot de passe est incorrecte');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    userService.getUser(params.id).then((res) => setUser(res.data));
  }, [params.id]);

  return (
    <div className='user'>
      <div className='user__container'>
        <img className='user__avatar' src={avatar} alt='Avatar' />

        <form
            className='user__form'
            onSubmit={handleSubmit}
            onKeyPress={handleKeyPress}
        >
          <div className='user__info-container'>
            <p className='user__title'>Matricule</p>
            <p className='user__content'>{user.reg_number}</p>
          </div>
          <div className='user__info-container'>
            <p className='user__title'>Prénom</p>
            <p className='user__content'>{user.name}</p>
          </div>
          <div className='user__info-container'>
            <p className='user__title'>NOM</p>
            <p className='user__content'>{user.lastname}</p>
          </div>
          <div className='user__info-container'>
            <p className='user__title'>Mot de passe</p>
            {modif ? (
              <div className='user__content user__password-container'>
                <TextField
                  sx={{ width: 200}}
                  id='password'
                  label='Modifier votre mot de passe'
                  name='password'
                  type='password'
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                <TextField
                  sx={{ width: 200 }}
                  id='confirmPassword'
                  label='Confirmer votre mot de passe'
                  name='confirmPassword'
                  type='password'
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
                ) : (
              <div className='user__content'>
                <Button
                  onClick={() => setModif(true)}
                  variant='contained'
                  sx={{ width: 200, marginTop: 1.5, marginBottom: 1.5 }}
                >
                  Modifier
                </Button>
              </div>
            )}
          </div>
          <div className='user__info-container'>
            <p className='user__title'>Fonction</p>
            <p className='user__content'>{user.function}</p>
          </div>
          <div className='user__info-container'>
            <p className='user__title'>Equipe</p>
            <p className='user__content'>{user.team}</p>
          </div>
          
          <div className='user__btns'>
            {modif && <Btn text='Valider' clicked={handleSubmit} />}
            <NavLink to='/planning'>
              <Btn text='Retour' />
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

User.propTypes = {};

export default User;
