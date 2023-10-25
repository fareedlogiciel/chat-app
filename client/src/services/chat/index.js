import { getRequest, postRequest } from "../../requests";
import { apiEndpoints } from "../endpoints.js/index.js";

export const fetchConversations = async (userId) => {
  try {
    const endpoint = `${apiEndpoints.fetchConversations}/${userId}`;
    const response = await getRequest(endpoint);
    return Promise.resolve(structuredClone(response?.data));
  } catch (err) {
    return Promise.reject(err?.response?.data?.message);
  }
};

export const fetchMessages = async (conversationId) => {
  try {
    const endpoint = `${apiEndpoints.fetchMessages}/${conversationId}`;
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
