import axios from "axios";
import { REACT_APP_API_BASE_URL } from "../env-constants";

const request = async (method, endpoint, body, withAuth, headers) => {
  const url = `${REACT_APP_API_BASE_URL}/${endpoint}`;
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

const getRequest = (endpoint, withAuth = true, headers = {}) => {
  return request("get", endpoint, {}, withAuth, headers);
};

const postRequest = (endpoint, body = {}, withAuth = true, headers = {}) => {
  return request("post", endpoint, body, withAuth, headers);
};

const patchRequest = (endpoint, body = {}, withAuth = true, headers = {}) => {
  return request("patch", endpoint, body, withAuth, headers);
};

const deleteRequest = (endpoint, withAuth = true, headers = {}) => {
  return request("delete", endpoint, {}, withAuth, headers);
};

export { getRequest, postRequest, patchRequest, deleteRequest };
