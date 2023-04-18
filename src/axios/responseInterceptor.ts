import { AxiosError, AxiosResponse } from "axios";

const responseInterceptor = (response: AxiosResponse) => {
  return response.data;
};

const errorInterceptor = (error: AxiosError) => {
  if (error.response && error.response.status === 401) {
    // Redirect to login page if user is not authenticated
    window.location.href = "/login";
  }

  return Promise.reject(error);
};

export { responseInterceptor, errorInterceptor };
