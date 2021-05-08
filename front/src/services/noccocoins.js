import axios from 'axios';
const baseUrl = 'http://localhost:8000/nocccoins';

const getAllNocccoins = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getNocccoin = async id => {
  const response = await axios.get(baseUrl + `/${id}`);
  return response.data;
};

const addCoins = async (userId, amount) => {
  const data = {
    user_id: userId,
    amount,
  };
  const response = await axios.post(baseUrl + '/add', data);
  console.log(response.data);
  return response.data;
};

const transferCoins = async (password, userId, recieverId, amount, message) => {
  const data = {
    from_id: userId,
    password,
    to_id: recieverId,
    amount,
    message,
  };
  console.log(data);
  const response = await axios.post(baseUrl + '/transfers', data);
  return response.data;
};

const getTransfers = async (fromId, toId, transferId) => {
  const data = {
    from_id: fromId,
    to_id: toId,
    transfer_id: transferId,
  };
  const response = await axios.get(baseUrl + '/transfers', data);
  return response.data;
};

const getMineNocco = async () => {
  const response = await axios.get(baseUrl + '/mine');
  return response.data;
};

const mineCoin = async (userId, image) => {
  const data = {
    user_id: userId,
    image,
  };
  const response = await axios.post(baseUrl + '/mine', data);
  return response.data;
};

const getNocccainLength = async () => {
  const response = await axios.get(baseUrl + '/length');
  return response.data;
};

const getNocccainById = async nocccainId => {
  const response = await axios.get(baseUrl + `/length/${nocccainId}`);
  return response.data;
};

export default {
  getAllNocccoins,
  getNocccoin,
  addCoins,
  transferCoins,
  getTransfers,
  getMineNocco,
  mineCoin,
  getNocccainLength,
  getNocccainById,
};
