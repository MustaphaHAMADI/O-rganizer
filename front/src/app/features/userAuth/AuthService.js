import AxiosClient from '../../../utils/axios/axiosClient';

/**
 *
 * @param {Object} userData contains user credentials
 * @returns return the user info from the server
 */
const login = async (userData) => {
  const response = await AxiosClient.post('/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

/**
 * Removes user data from localStorage
 */
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  logout,
  login,
};

export default authService;
