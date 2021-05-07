import axios from "axios";
const baseUrl = "/images"

const getAllImages = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const postNewImage = async (image, userId) => {
    const data = {
        image,
        user_id: userId
    }
    const response = await axios.post(basicUrl, data);
    return response.data;
}

export default { getAllImages, postNewImage };