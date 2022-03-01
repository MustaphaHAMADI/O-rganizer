import axiosClient from '../../../utils/axios/axiosClient';

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { 'x-access-token': user.token };
  } else {
    return;
  }
};

const getPlanning = () => {
  return axiosClient.get('/planning', { headers: authHeader() });
};

const planningService = {
  authHeader,
  getPlanning,
};

export default planningService;
