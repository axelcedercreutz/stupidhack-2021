import axios from 'axios';
import { useStore } from '../store';

const baseUrl = 'http://localhost:8000/users';

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBasicInfo = async () => {
  const userId = useStore.getState().userId;
  const response = await axios.get(baseUrl + `/${userId}`);
  return response.data;
};

const getPrivateInfo = async credentials => {
  const config = {
    params: {
      password: credentials,
    },
  };
  const userId = useStore.getState().userId;
  const response = await axios.get(baseUrl + `/${userId}`, config);
  return response.data;
};

export default {
  getAllUsers,
  getBasicInfo,
  getPrivateInfo,
};
