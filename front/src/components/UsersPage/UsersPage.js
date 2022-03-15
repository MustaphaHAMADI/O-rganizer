import React, { useState, useEffect } from 'react';
import UserService from '../../app/features/userHandling/UserService';
import UserCard from '../UserCard/UserCard';
import UserModal from '../UserModal/UserModal';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material/';

import './userpage.scss';

const UsersPage = () => {
  const [users, setUsers] = useState();
  const [modalUser, setModalUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await UserService.getAllUsers();
      setUsers(data);
    })();
  }, []);

  const handleSetUser = (user) => {
    setModalUser(user);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleEmptyUser = () => {
    setModalUser(null);
    handleOpenModal();
  };

  return (
    <div className='usersPage'>
      <UserModal
        open={isModalOpen}
        handleCloseModal={handleCloseModal}
        user={modalUser}
      />
      <div className='usersPage__header'>
        <Button variant='contained'>
          <Link to='/planning'>Retour au planning</Link>
        </Button>
        <Button variant='contained' onClick={handleEmptyUser}>
          <AddCircleOutline />
        </Button>
      </div>
      <div className='usersPage__main'>
        {users &&
          users.map((user) => (
            <UserCard
              handleOpenModal={handleOpenModal}
              handleSetUser={handleSetUser}
              key={user.id}
              user={user}
            />
          ))}
      </div>
    </div>
  );
};

export default UsersPage;
