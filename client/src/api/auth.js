import { postRequest } from "../requests";
import defaultUser from "../utils/default-user";
import { apiEndpoints } from "./endpoints.js/index.js";

export const signIn = async (data) => {
  try {
    // Send request
    const endpoint = apiEndpoints.login;
    const withAuth = false;
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
      message: "Authentication failed",
    });
  }
};

export async function getUser() {
  try {
    // Send request

    return {
      isOk: true,
      data: defaultUser,
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to create account",
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}
