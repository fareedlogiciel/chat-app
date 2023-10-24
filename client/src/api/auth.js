import defaultUser from "../utils/default-user";

export const signIn = async (data) => {
  try {
    // Send request
  } catch (err) {
    //
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

export async function changePassword(email, recoveryCode) {}

export async function resetPassword(email) {}
