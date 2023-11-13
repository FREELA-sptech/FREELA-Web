import axios from "axios";
import { UserStorage } from "../store/userStorage";
import { useNavigate } from "react-router";

const api = axios.create({
  baseURL: "http://localhost:8080/"
  //baseURL: "https://api-freela.duckdns.org/"
  //baseURL: "https://bff-freela.duckdns.org/"
});

export function useApi() {
  const navigate = useNavigate();

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if ((error.response && error.response.status === 401) || (error.code === "ERR_NETWORK")) {
        UserStorage.clearAllLocalStorage();
        //window.location.href = "/login"
      }
      return Promise.reject(error);
    }
  );

  api.interceptors.request.use((config) => {
    const token = UserStorage.getTokenUserLocalStorage();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return api;
}
