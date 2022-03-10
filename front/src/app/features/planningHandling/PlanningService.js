import axiosClient from '../../../utils/axios/axiosClient';

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

/**
 *
 * @param {Date} startingDate the starting date required
 * @param {Date} endingDate the ending date required
 * @returns JSON of shifts
 */
const getPlanning = async () => {
  try {
    return await axiosClient.get('/planning', {
      headers: authHeader(),
    });
  } catch (error) {
    return error.response;
  }
};
/**
 *
 * @returns List of teams and employees
 */
const getTeams = async () => {
  try {
    const response = await axiosClient.get('/team', {
      headers: authHeader(),
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

const getUser = async (userId) => {
  try {
    const user = await axiosClient.get(`/employee/${userId}`, {
        headers: authHeader()
    });
    return user;
  } catch (e) {
      return e.response
  }
}

const planningService = {
  authHeader,
  getPlanning,
  getTeams,
  getUser,
};

export default planningService;
