import axios from "axios";
const baseUrl = "http://localhost:5000";

export const getUserData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTweets = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/tweets`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/all-login`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getUserTweets = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/tweets/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getFrnReq = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/friend-requests`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
