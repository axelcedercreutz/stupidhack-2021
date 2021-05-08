import axios from 'axios';
import { baseUrl } from '../utils/config';

const nocccoinsBaseUrl = baseUrl + '/nocccoins';

const getAllNocccoins = async () => {
  const response = await axios.get(nocccoinsBaseUrl);
  return response.data;
};

const getNocccoin = async id => {
  const response = await axios.get(nocccoinsBaseUrl + `/${id}`);
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
  const response = await axios.post(nocccoinsBaseUrl + '/transfers', data);
  return response.data;
};

const getTransfers = async (fromId, toId, transferId) => {
  const data = {
    from_id: fromId,
    to_id: toId,
    transfer_id: transferId,
  };
  const response = await axios.get(nocccoinsBaseUrl + '/transfers', data);
  return response.data;
};

const getMineNocco = async () => {
  const response = await axios.get(nocccoinsBaseUrl + '/mine');
  return response.data;
};

const mineCoin = async (userId, image) => {
  const data = {
    user_id: userId,
    image,
  };
  const response = await axios.post(nocccoinsBaseUrl + '/mine', data);
  return response.data;
};

const getNocccainLength = async () => {
  const response = await axios.get(nocccoinsBaseUrl + '/length');
  return response.data;
};

const getNocccainById = async nocccainId => {
  const response = await axios.get(nocccoinsBaseUrl + `/length/${nocccainId}`);
  return response.data;
};

export default {
  getAllNocccoins,
  getNocccoin,
  transferCoins,
  getTransfers,
  getMineNocco,
  mineCoin,
  getNocccainLength,
  getNocccainById,
};
