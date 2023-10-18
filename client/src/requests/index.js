import axios from "axios";
import { API_BASE_URL } from "../env-constants";

const request = async (method, endpoint, body, withAuth, headers) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  const token = "";
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
  if (withAuth && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  switch (method) {
    case "get":
      return axios.get(url, config);
    case "post":
      return axios.post(url, body, config);
    case "patch":
      return axios.patch(url, body, config);
    case "delete":
      return axios.delete(url, config);
    default:
      return Promise.reject();
  }
};

export const getRequest = (endpoint, withAuth = true, headers = {}) => {
  request("get", endpoint, {}, withAuth, headers);
};

export const postRequest = (
  endpoint,
  body = {},
  withAuth = true,
  headers = {}
) => {
  request("post", endpoint, body, withAuth, headers);
};

export const patchRequest = (
  endpoint,
  body = {},
  withAuth = true,
  headers = {}
) => {
  request("patch", endpoint, body, withAuth, headers);
};

export const deleteRequest = (endpoint, withAuth = true, headers = {}) => {
  request("delete", endpoint, {}, withAuth, headers);
};
