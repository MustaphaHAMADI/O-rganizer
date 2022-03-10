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

const patchUser = async (userId, userData) => {
    try {
        console.log(userData);
        const response = await axiosClient.patch(`/employee/${userId}`,
            userData,
            {headers: authHeader()} 
        );
        return response

    } catch (e) {
        return e.response
    }
}

const userService = {
    getUser,
    patchUser
  };
  
  export default userService;