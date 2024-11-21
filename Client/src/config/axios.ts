import { useToken } from "@/hooks/useToken";
import axios from "axios";

const useAxios = () => {
  const { token } = useToken();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: true,
  });

  return axiosInstance;
};

export default useAxios;
