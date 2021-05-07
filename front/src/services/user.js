import axios from "axios";
const baseUrl = "http://localhost:8000/users";

let userId = null;

const setToken = (newUserId) => {
  userId = newUserId;
};

const getBasicInfo = async () => {
  console.log(userId);
  const response = await axios.get(baseUrl+ `/${userId}`);
  return response.data;
};

const getPrivateInfo = async (credentials) => {
  const config = {
    headers: {
      data: {
        password: credentials,
      }
    }
  }
  const response = await axios.get(baseUrl + `/${userId}`, config);
  return response.data;
};

const sendMessage = async (password, recieverId, message) => {
  const data = {
    password,
    user_id: userId,
    reciever_id: recieverId,
    message
  }
  const response = await axios.post('/message', data);
  return response.data
}

const sendCoins = async (password, recieverId, amount) => {
  const data = {
    password,
    user_id: userId,
    reciever_id: recieverId,
    amount,
  }
  const response = await axios.post('/coins', data);
  return response.data;
}


export default { getBasicInfo, getPrivateInfo, sendMessage, sendCoins, setToken };
