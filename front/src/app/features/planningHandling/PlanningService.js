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

const getEmployees = async () => {
  try {
    const response = await axiosClient.get('/employee/team', { headers: authHeader() });
    return response;
  } catch (err) {
    return err.response;
  }
};

const planningService = {
  authHeader,
  getPlanning,
  getEmployees,
};

export default planningService;
