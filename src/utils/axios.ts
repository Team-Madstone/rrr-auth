import axios from "axios";
import { API_DOMAIN } from "src/constants/common";
import { refreshAccessToken } from "src/services/user";

export const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    if (error.config.retry || error.response.status !== 401) {
      error.config.retry = false;
      return Promise.reject(error);
    }

    try {
      const result = await refreshAccessToken();
      const newAccessToken = result.data.accessToken;
      error.config.headers.Authorization = `Bearer ${newAccessToken}`;
      error.config.retry = true;
      return axiosInstance.request(error.config);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
