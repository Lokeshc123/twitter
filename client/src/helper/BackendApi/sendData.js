import axios from "axios";

const baseUrl = "http://localhost:5000";

export const registerUser = async (data) => {
  try {
    console.log("Data in function", data);
    const response = await axios.post(`${baseUrl}/api/users/register`, data);
    return response.data;
  } catch (error) {
    console.log("Error in registerUser:", error);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/api/users/login`, data);
    return response.data;
  } catch (error) {
    console.log("Error in loginUser:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};
