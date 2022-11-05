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
    config.url != ApiRoutes.loginRoute &&
    config.url != ApiRoutes.registerRoute &&
    !config.url!.includes(ApiRoutes.getRandomAvatar)
  ) {
    const value = localStorage.getItem("user");
    const keys = JSON.parse(value!);
    config.headers = {
      "x-access-token": `${keys.access_token}`,
    };
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const originalRequest = error.config;
  if (error.response!.status === 403) {
    // originalRequest._retry = true;
    const access_token = await refreshAccessToken();
    axios.defaults.headers.common["x-access-token"] = access_token;
    return axiosApiInstance(originalRequest!);
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
