import React, { useState, useEffect } from 'react';
import UserService from '../../app/features/userHandling/UserService';
import UserCard from '../UserCard/UserCard';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material/';

import './userpage.scss';

const UsersPage = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    (async () => {
      const { data } = await UserService.getAllUsers();
      setUsers(data);
    })();
  }, []);

  return (
    <div className='usersPage'>
      <div className='usersPage__header'>
        <Button variant='contained'>
          <Link to='/planning'>Retour au planning</Link>
        </Button>
        <Button variant='contained'>
          <AddCircleOutline />
        </Button>
      </div>
      <div className='usersPage__main'>
        {users && users.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default UsersPage;
