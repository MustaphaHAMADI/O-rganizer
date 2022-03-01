import axios from 'axios';

const login = async (userData) => {
  const response = await axios.post(
    'https://organizer-ygg.herokuapp.com/login',
    userData
  );

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

// localStorage.setItem('user', JSON.stringify({id:2,username:'mouss',accessToken:'mjvdnvfjd'}))
