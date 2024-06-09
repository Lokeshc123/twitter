import axios from "axios";

export const getNews = async () => {
  const options = {
    headers: {
      "x-rapidapi-key": "25832351f3mshf3e34e1e5c8cb45p1d5372jsn2af00fd1bdab",
      "x-rapidapi-host": "news67.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.get(
      "https://news67.p.rapidapi.com/v2/trending",
      options
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
