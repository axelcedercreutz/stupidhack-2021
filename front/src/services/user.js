import axios from 'axios';
const baseUrl = 'http://localhost:8000/users';

let userId = null;

const setToken = newUserId => {
  userId = newUserId;
};

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBasicInfo = async () => {
  console.log(userId);
  const response = await axios.get(baseUrl + `/${userId}`);
  return response.data;
};

const getPrivateInfo = async credentials => {
  const config = {
    params: {
      password: credentials,
    },
  };
  const response = await axios.get(baseUrl + `/${userId}`, config);
  return response.data;
};

export default {
  getAllUsers,
  getBasicInfo,
  getPrivateInfo,
  setToken,
};
