import axios from "axios";
// import requestInterceptor from "./requestInterceptor";
import {responseInterceptor} from "./responseInterceptor";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com",
});

// axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor);

export default axiosInstance;
