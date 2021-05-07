import axios from 'axios';
const baseUrl = 'http://localhost:8000';

const sendMessage = async (password, userId, recieverId, message) => {
  const data = {
    password,
    from_id: userId,
    to_id: recieverId,
    message,
  };
  const response = await axios.post(baseUrl + '/message', data);
  return response.data;
};

const addCoins = async (userId, amount) => {
  const data = {
    to_id: userId,
    amount,
  };
  const response = await axios.post(baseUrl + '/nocccoins/add', data);
  console.log(response.data);
  return response.data;
};

const transferCoins = async (password, userId, recieverId, amount) => {
  const data = {
    password,
    from_id: userId,
    to_id: recieverId,
    amount,
  };
  console.log(data);
  const response = await axios.post(baseUrl + '/nocccoins/transfer', data);
  return response.data;
};

export default {
  sendMessage,
  addCoins,
  transferCoins,
};
