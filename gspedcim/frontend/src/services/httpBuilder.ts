import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ENV } from "@/constants";

const { BASE_URL } = ENV;

class HttpBuilder {
  static baseURL = BASE_URL;
  static async request({
    method,
    path,
    data,
    params,
    headers,
  }: {
    method: "get" | "post" | "put" | "delete";
    path: string;
    data?: any;
    params?: any;
    headers?: any;
  }): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      method,
      url: this.baseURL + path,
      data,
      params,
      headers,
    };
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }

  static get(options: { path: string; params?: any; headers?: any }) {
    return this.request({ method: "get", ...options });
  }

  static post(options: {
    path: string;
    data: any;
    params?: any;
    headers?: any;
  }) {
    return this.request({ method: "post", ...options });
  }

  static put(options: {
    path: string;
    data: any;
    params?: any;
    headers?: any;
  }) {
    return this.request({ method: "put", ...options });
  }

  static delete(options: { path: string; params?: any; headers?: any }) {
    return this.request({ method: "delete", ...options });
  }
}

export default HttpBuilder;
