import axios from "axios";
const baseUrl = "/info";

let userId = null;

const setToken = (newUserId) => {
  userId = newUserId;
};

const getAll = () => {
  const config = {
    headers: { Authorization: userId },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: userId },
  };
  const response = await axios.post(baseUrl, {userId}, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: userId },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, create, update, deleteBlog, setToken };
