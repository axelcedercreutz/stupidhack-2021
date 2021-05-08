import axios from 'axios';

const baseUrl = 'http://localhost:8000/users';

const createUser = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const login = async credentials => {
  const response = await axios.post(baseUrl + '/login', credentials);
  return response.data;
};

export default { createUser, login };
