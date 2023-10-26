import { getRequest, postRequest } from "../../requests";
import { apiEndpoints } from "../endpoints.js/index.js";

export const fetchAllUsers = async () => {
  try {
    const endpoint = apiEndpoints.allUsers;
    const response = await getRequest(endpoint);
    return Promise.resolve(structuredClone(response?.data));
  } catch {
    return Promise.reject();
  }
};

export const fetchMessages = async (otherUserId, userId) => {
  try {
    const endpoint = `${apiEndpoints.fetchMessages}/${otherUserId}?selfId=${userId}`;
    const response = await getRequest(endpoint);
    return Promise.resolve(structuredClone(response?.data));
  } catch (err) {
    return Promise.reject(err?.response?.data?.message);
  }
};

export const submitMessage = async (data) => {
  try {
    const endpoint = apiEndpoints.submitMessage;
    await postRequest(endpoint, data);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err?.response?.data?.message);
  }
};
