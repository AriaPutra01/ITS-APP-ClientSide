import axios from "axios";

const API_URL = "http://localhost:8080";

export const GetAPI = (url: string, callback: (data: any) => void) => {
  const finalUrl = `${API_URL}/${url}`;
  return axios
    .get(finalUrl)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};
