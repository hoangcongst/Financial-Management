
import axios, { AxiosRequestConfig } from "axios";

export const instanceAxios = axios.create({
  baseURL: "http://localhost:2000",
});

export default function request(options: AxiosRequestConfig) {
  return instanceAxios(options);
}


