import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Router from "next/router";
import { APIErrorResponse } from "../dto/api/api-error-response";
import { APIResponse } from "../dto/api/api-response";

// Taken from https://github.com/arielweinberger/task-management-frontend/blob/master/src/services/base-http.service.js

export default class BaseHttpService {
  BASE_URL = process.env.BASE_URL || "http://localhost:3000";
  //   _accessToken: string = null;

  async get<T = any>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T | void> {
    Object.assign(options, this._getCommonOptions());
    return axios
      .get<APIResponse<T>>(`${this.BASE_URL}${endpoint}`, options)
      .then((res: AxiosResponse<APIResponse<T>>) => res.data.data)
      .catch((error: AxiosError<APIErrorResponse>) =>
        this._handleHttpError(error)
      );
  }

  async post<T = any>(
    endpoint: string,
    data: any = {},
    options: AxiosRequestConfig = {}
  ): Promise<T | void> {
    Object.assign(options, this._getCommonOptions());
    return axios
      .post<APIResponse<T>>(`${this.BASE_URL}${endpoint}`, data, options)
      .then((res: AxiosResponse<APIResponse<T>>) => res.data.data)
      .catch((error: AxiosError<APIErrorResponse>) =>
        this._handleHttpError(error)
      );
  }

  async delete<T = any>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T | void> {
    Object.assign(options, this._getCommonOptions());
    return axios
      .delete<APIResponse<T>>(`${this.BASE_URL}${endpoint}`, options)
      .then((res: AxiosResponse<APIResponse<T>>) => res.data.data)
      .catch((error: AxiosError<APIErrorResponse>) =>
        this._handleHttpError(error)
      );
  }

  async patch<T = any>(
    endpoint: string,
    data: any = {},
    options: AxiosRequestConfig = {}
  ): Promise<T | void> {
    Object.assign(options, this._getCommonOptions());
    return axios
      .patch<APIResponse<T>>(`${this.BASE_URL}${endpoint}`, data, options)
      .then((res: AxiosResponse<APIResponse<T>>) => res.data.data)
      .catch((error: AxiosError<APIErrorResponse>) =>
        this._handleHttpError(error)
      );
  }

  _handleHttpError(error: AxiosError<APIErrorResponse>) {
    if (error?.response?.data) {
      const { statusCode } = error?.response?.data;

      const requestUrl = error.response?.config.url;

      if (
        statusCode !== 401 ||
        requestUrl?.endsWith("/api/auth/login") ||
        requestUrl?.endsWith("/api/auth/register") ||
        requestUrl?.endsWith("/api/auth/refresh")
      ) {
        throw error.response.data;
      } else {
        return this._handle401(error);
      }
    } else {
      throw error;
    }
  }

  _handle401(error: AxiosError<APIErrorResponse>) {
    this.get("/api/auth/refresh")
      .then(() => axios.request(error.config))
      .catch((e) => Router.push("/login"));
  }

  _getCommonOptions() {
    // const token = this.loadToken();

    // return {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    return {};
  }

  //   get accessToken() {
  //     return this._accessToken ? this._accessToken : this.loadToken();
  //   }

  //   saveToken(accessToken : string) {
  //     this._accessToken = accessToken;
  //     return localStorage.setItem("accessToken", accessToken);
  //   }

  //   loadToken() {
  //     const token : string = localStorage.getItem("accessToken") as string;
  //     this._accessToken = token;
  //     return token;
  //   }

  //   removeToken() {
  //     localStorage.removeItem("accessToken");
  //   }
}
