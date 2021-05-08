import axios from 'axios';
import useStore from '../store';
import { baseUrl } from '../utils/config';

const userBaseUrl = baseUrl + '/users';

let userId = null;

const baseUrl = 'http://localhost:8000/users';

const getAllUsers = async () => {
  const response = await axios.get(userBaseUrl);
  return response.data;
};

const getBasicInfo = async () => {
  const userId = useStore.getState().userId;
  const response = await axios.get(userBaseUrl + `/${userId}`);
  return response.data;
};

const getPrivateInfo = async credentials => {
  const config = {
    params: {
      password: credentials,
    },
  };
  const userId = useStore.getState().userId;
  const response = await axios.get(userBaseUrl + `/${userId}`, config);
  return response.data;
};

export default {
  getAllUsers,
  getBasicInfo,
  getPrivateInfo,
};
