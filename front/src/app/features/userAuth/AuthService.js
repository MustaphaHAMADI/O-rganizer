import AxiosClient from '../../../utils/axios/axiosClient';

const login = async (userData) => {
  const response = await AxiosClient.post('/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    console.log(response.data);
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
