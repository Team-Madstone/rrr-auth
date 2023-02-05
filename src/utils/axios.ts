import axios from "axios";
import { API_DOMAIN } from "src/constants/common";

export const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
  withCredentials: true,
});
