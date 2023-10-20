import { postRequest } from "../../requests";
import { apiEndpoints } from "./../endpoints.js";

export const signIn = async (data) => {
  try {
    const withAuth = false;
    const endpoint = apiEndpoints.login;
    const response = await postRequest(endpoint, data, withAuth);
    if (response && response?.data?.user) {
      return Promise.resolve({
        isOk: true,
        message: response?.data?.message,
        data: structuredClone(response?.data?.user),
      });
    }
  } catch (err) {
    return Promise.reject({
      isOk: false,
      message: err?.response?.data?.message,
    });
  }
};

export const register = async (data) => {
  try {
    const withAuth = false;
    const endpoint = apiEndpoints.register;
    const response = await postRequest(endpoint, data, withAuth);
    if (response && response?.data?.user) {
      return Promise.resolve({
        isOk: true,
        message: response?.data?.message,
      });
    }
  } catch (err) {
    return Promise.reject({
      isOk: false,
      message: err?.response?.data?.message,
    });
  }
};
