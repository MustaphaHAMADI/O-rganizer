import axiosClient from '../../../utils/axios/axiosClient';

const login = async (userData) => {
  const response = await axiosClient.post('/login', userData);

  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  logout,
  login,
};

export default authService;

// localStorage.setItem('user', JSON.stringify({id:2,username:'mouss',accessToken:'mjvdnvfjd'}))
