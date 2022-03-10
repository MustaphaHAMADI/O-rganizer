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

const getStatus = async () => {
  try {
    const response = await axiosClient.get('/status', {
      headers: authHeader(),
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
/**
 *
 * @param {date format yyyy/mm/dd} date date required
 * @param {employee id} id employee id required
 * @param {status id } status status id required
 * @param { replace id } teamId default at 0
 * @param {comment text } comment text required or empty string
 * @returns Api call to the server
 */
const postStatus = async (date, id, status, comment, teamId = null) => {
  const body = {
    statusId: status,
    teamId: teamId,
    comment: comment,
  };
  try {
    const response = await axiosClient.post(
      `/affectedStatus/employee/${id}/date/${date}`,
      body,

      {
        headers: authHeader(),
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};
/**
 *
 * @param {date format yyyy/mm/dd} date date required
 * @param {employee id} id employee id required
 * @param {status id } status status id required
 * @param { replace id } teamId default at 0
 * @param {comment text } comment text required or empty string
 * @returns Api call to the server
 */
const patchStatus = async (date, id, status, comment, teamId = null) => {
  const body = {
    statusId: status,
    teamId: teamId,
    comment: comment,
  };
  try {
    const response = await axiosClient.patch(
      `/affectedStatus/employee/${id}/date/${date}`,
      body,
      {
        headers: authHeader(),
        body: {
          statusId: status,
          teamId: teamId,
          comment: comment,
        },
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};
/**
 *
 * @param {date format yyyy/mm/dd} date date required
 * @param {employee id} id employee id required
 * @returns Api call to the server
 */
const deleteStatus = async (date, id) => {
  try {
    const response = await axiosClient.delete(
      `/affectedStatus/employee/${id}/date/${date}`,
      {
        headers: authHeader(),
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

const planningService = {
  authHeader,
  getPlanning,
  getTeams,
  getStatus,
  postStatus,
  patchStatus,
  deleteStatus,
};

export default planningService;
