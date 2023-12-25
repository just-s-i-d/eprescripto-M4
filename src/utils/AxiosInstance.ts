import axios from "axios";
import { showToast } from "./common";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:1337",
});
axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  req.headers.Authorization = `Bearer ${token}`;
  if (token) return Promise.resolve(req);
  else {
    return Promise.reject(req);
  }
});
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      showToast("Session Timed Out", "error");
      localStorage.removeItem("token");
      setTimeout(() => {
        location.assign("/auth");
      }, 1000);
    } else {
      return Promise.reject(error);
    }
  },
);
