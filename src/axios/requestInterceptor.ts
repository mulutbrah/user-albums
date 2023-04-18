import { AxiosRequestConfig } from "axios";

const requestInterceptor = (config: AxiosRequestConfig) => {
  // Set any necessary headers or authorization tokens
  config.headers!.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;

  return config;
};

export default requestInterceptor;
