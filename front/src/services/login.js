import axios from 'axios';
import { baseUrl } from '../utils/config';

const loginBaseUrl = baseUrl + '/users';

const createUser = async credentials => {
  const response = await axios.post(loginBaseUrl, credentials);
  return response.data;
};

const login = async credentials => {
  const response = await axios.post(loginBaseUrl + '/login', credentials);
  return response.data;
};

export default { createUser, login };
