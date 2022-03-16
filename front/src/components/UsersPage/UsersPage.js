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
  const [reload, setReload] = useState(0);

  useEffect(() => {
    UserService.getAllUsers().then((res) => {
      setUsers(res.data);
    });
  }, [reload]);

  const handleReload = () => {
    setReload(reload + 1);
  };
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
    <div className='users-page'>
      <UserModal
        open={isModalOpen}
        handleCloseModal={handleCloseModal}
        user={modalUser}
        handleReload={handleReload}
      />
      <div className='users-page__header'>
        <Button variant='contained'>
          <Link to='/planning'>Retour au planning</Link>
        </Button>
        <Button variant='contained' onClick={handleEmptyUser}>
          <AddCircleOutline />
        </Button>
      </div>
      <div className='users-page__main'>
        {users &&
          users.map((user) => (
            <UserCard
              handleOpenModal={handleOpenModal}
              handleSetUser={handleSetUser}
              key={user.id}
              user={user}
              handleReload={handleReload}
            />
          ))}
      </div>
    </div>
  );
};

export default UsersPage;
