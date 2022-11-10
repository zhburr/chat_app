import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ApiRoutes } from "../ApiRoutes";
import { refreshAccessToken } from "../service/shared.service";

const axiosApiInstance = axios.create();

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (
    config.url !== ApiRoutes.loginRoute &&
    config.url !== ApiRoutes.registerRoute &&
    !config.url!.includes(ApiRoutes.getRandomAvatar)
  ) {
    const user = JSON.parse(localStorage.getItem("user")!);

    config.headers = {
      "x-access-token": `${user?.token ? user.token : ""}`,
    };
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse, fn?: any): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const originalRequest = error.config;
  if (error.response!.status === 403) {
    const access_token = await refreshAccessToken();
    if (access_token) {
      originalRequest!.headers = { "x-access-token": access_token };
      return axiosApiInstance(originalRequest!);
    } else {
      Object.assign(error.response?.data!, { logout: true });
      localStorage.clear();
      window.location.replace("/login");
      return Promise.reject(error);
    }
  } else if (error.response!.status === 401) {
    Object.assign(error.response?.data!, { logout: true });
    localStorage.clear();
    window.location.replace("/login");
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
