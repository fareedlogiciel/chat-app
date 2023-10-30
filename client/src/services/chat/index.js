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

export const saveAttachment = async (attachment) => {
  try {
    const formData = new FormData();
    formData.append("attachment", attachment);
    const withAuth = true;
    const endpoint = apiEndpoints.saveAttachment;
    const headers = { "Content-Type": "multipart/form-data" };
    const response = await postRequest(endpoint, formData, withAuth, headers);
    return Promise.resolve(response?.data?.filePath);
  } catch (err) {
    return Promise.reject("Failed to save attachment!");
  }
};
