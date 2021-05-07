import axios from 'axios';
const baseUrl = 'http://localhost:8000';

const getAllNocccoins = async () => {
  const response = await axios.get(baseUrl + '/nocccoins');
  return response.data;
};

const getNocccoin = async id => {
  const response = await axios.get(baseUrl + `/nocccoins/${id}`);
  return response.data;
};

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
    user_id: userId,
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
  const response = await axios.post(baseUrl + '/nocccoins/transfers', data);
  return response.data;
};

const mineCoin = async (userId, image) => {
  const data = {
    user_id: userId,
    image,
  };
  const response = await axios.post(baseUrl + '/nocccoins/mine', data);
  return response.data;
};

export default {
  getAllNocccoins,
  getNocccoin,
  sendMessage,
  addCoins,
  transferCoins,
  mineCoin,
};
