import axios from 'axios';

// creation axios intance
const axiosClient = axios.create();
// setting base url
axiosClient.defaults.baseURL = 'https://organizer-ygg.herokuapp.com';
// setting default headers
axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export default axiosClient;
