import axios from "axios";
const URL = "https://jsonplaceholder.typicode.com/users";
const fetchUserApi = async (id) => {
  try {
    const user = await axios.get(`${URL}/${id}`);
    return user;
  } catch (error) {
    return error;
  }
};

export default fetchUserApi;
