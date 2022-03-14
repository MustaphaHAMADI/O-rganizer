import React from 'react';
import avatar from '../../assets/user.png';
import { Button } from '@mui/material';
import './usercard.scss';
import { Create, Delete } from '@mui/icons-material/';

const UserCard = ({ user }) => {
  return (
    <div className='usercard'>
      <div className='usercard__person'>
        <img className='usercard__avatar' src={avatar} alt='profil' />
        <p className='usercard__name'>{`${user.lastname} ${user.name}`}</p>
        <p className='usercard__regNumber'>{user.reg_number}</p>
        <p className='usercard__role'>{`(${user.role})`}</p>
        <p className='usercard__fonction'>{user.function}</p>
        <p className='usercard__teamNoun'>{user.team_noun}</p>
      </div>
      <div className='usercard__buttons'>
        <Button>
          {' '}
          <Create fontSize='large' className='usercard__button' />
        </Button>
        <Button>
          {' '}
          <Delete fontSize='large' className='usercard__button' />
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
