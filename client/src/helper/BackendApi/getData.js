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
export const getAllMsgReq = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/all-msgreq`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMsgPartner = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/getmsg`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getConvo = async (senderId, receiverId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/messages/getmessages/${senderId}/${receiverId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
