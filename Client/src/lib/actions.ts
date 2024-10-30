import axios from "axios";

const API_URL = "http://localhost:8080";

export function POST(url: string, data: any) {
  return axios
    .post(`${API_URL}/${url}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
}

export function PUT(url: string, id: string, data: any) {
  const finalUrl = `${API_URL}/${url}/${id}`;
  return axios
    .put(finalUrl, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Gagal mengubah data. Alasan: ${error.message}`);
    });
}

export function DEL(url: string, id: string) {
  const finalUrl = `${API_URL}/${url}/${id}`;
  return axios
    .delete(finalUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Gagal mengubah data. Alasan: ${error.message}`);
    });
}
