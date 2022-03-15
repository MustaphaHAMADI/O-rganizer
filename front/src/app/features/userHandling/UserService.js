import axiosClient from '../../../utils/axios/axiosClient';
import { toast } from 'react-toastify';

/**
 * Function that adds a token from the localStorage to the request headers
 * @returns the JWT token
 */
const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { 'x-access-token': user.token };
  } else {
    return;
  }
};

const getAllUsers = async () => {
  try {
    const users = await axiosClient.get(`/employee`, {
      headers: authHeader(),
    });
    return users;
  } catch (e) {
    return e.response;
  }
};

const getUser = async (userId) => {
  try {
    const user = await axiosClient.get(`/employee/${userId}`, {
      headers: authHeader(),
    });
    return user;
  } catch (e) {
    return e.response;
  }
};

const patchUser = async (userId, userData) => {
  try {
    console.log(userData);
    const response = await axiosClient.patch(`/employee/${userId}`, userData, {
      headers: authHeader(),
    });
    toast.success(`Mot de passe modifié`);
    return response;
  } catch (e) {
    toast.error('Erreur lors de la modification du mot de passe');
    return e.response;
  }
};

const addEmployee = async (userData) => {
  try {
    const response = await axiosClient.post(`/employee`, userData, {
      headers: authHeader(),
    });
    toast.success(`Employé crée avec succes`);
    return response;
  } catch (e) {
    toast.error("Erreur lors de la creation de l'employé");
    return e.response;
  }
};
const changeEmployee = async (userId, userData) => {
  try {
    const response = await axiosClient.patch(`/employee/${userId}`, userData, {
      headers: authHeader(),
    });
    toast.success(`Employé modifié avec succes`);
    return response;
  } catch (e) {
    toast.error("Erreur lors de la modification de l'employé");
    return e.response;
  }
};

const userService = {
  getUser,
  patchUser,
  getAllUsers,
  addEmployee,
  changeEmployee,
};

export default userService;
