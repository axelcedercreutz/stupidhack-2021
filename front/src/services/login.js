import axios from 'axios';
const baseUrl = 'http://localhost:8000';

const createUser = async credentials => {
  const response = await axios.post(baseUrl + '/users', credentials);
  return response.data;
};

const login = async credentials => {
  const response = await axios.post(baseUrl + '/users/login', credentials);
  return response.data;
};

export default { createUser, login };
