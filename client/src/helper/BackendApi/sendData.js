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

export const createTweet = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/api/tweets/new`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error in createTweet:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const likeTweet = async (tweetId) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/tweets/like/${tweetId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in likeTweet:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const sendFollowRequest = async (userId) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/follow/${userId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in sendFollowRequest:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const updateUserWithId = async (data, userId) => {
  try {
    const response = await axios.put(`${baseUrl}/api/users/${userId}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error in updateUser:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const acceptFollowRequest = async (friendId) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/accept-follow/${friendId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in acceptFollowRequest:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const rejectFollowRequest = async (friendId) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/reject-follow/${friendId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in rejectFollowRequest:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const sendMsgRequest = async (friendId) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/send-messagereq/${friendId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in sendMsgRequest:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const acceptMsgRequest = async (friendId) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/acc-message/${friendId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in acceptMsgRequest:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const rejectMsgRequest = async (friendId) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/reject-message/${friendId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in rejectMsgRequest:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const sendMsg = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/messages/sendmessage`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in sendMsg:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const deleteTweet = async (tweetId) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/tweets/${tweetId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error in deleteTweet:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};

export const UpTweet = async (data, tweetId) => {
  try {
    const response = await axios.put(`${baseUrl}/api/tweets/${tweetId}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error in UpTweet:", error.message);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network Error or Server not responding" };
    }
  }
};
