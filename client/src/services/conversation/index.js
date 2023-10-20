import { getRequest } from "../../requests";
import { apiEndpoints } from "../endpoints.js/index.js";

export const fetchConversations = async (userId) => {
  try {
    const endpoint = `${apiEndpoints.fetchConversations}/${userId}`;
    const response = await getRequest(endpoint);
    if (response && response?.data) {
      return Promise.resolve({
        conversations: structuredClone(response?.data),
      });
    }
  } catch (err) {
    return Promise.reject({ error: err?.response?.data?.message });
  }
};
