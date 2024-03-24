import axios from "../axios";

/**
 * Register a user through the API.
 *
 * @param {Object} data - The user data to be registered.
 * @return {Promise} - A promise that resolves to the response from the API.
 */
export const apiRegister = (data) => {
  return axios({
    url: "/user/register",
    method: "POST",
    data: data,
    withCredentials: true,
  });
};
apiRegister()
  .then((response) => {
    console.log("API Register Response:", response.data);
  })
  .catch((error) => {
    console.error("API register Error:", error);
  });

/**
 * Sends a login request to the API server.
 *
 * @param {Object} data - The login data.
 * @return {Promise} A Promise that resolves to the response from the server.
 */
export const apiLogin = (data) => {
  return axios({
    url: "/user/login",
    method: "POST",
    data,
  });
};
apiLogin()
  .then((response) => {
    console.log("API login Response:", response.data);
  })
  .catch((error) => {
    console.error("API login Error:", error);
  });

/**
 * Sends a request to the server to reset the user's password.
 *
 * @param {Object} data - The data object containing the user's email or username.
 * @return {Promise} A promise that resolves to the response from the server.
 */

/**
 * Sends a request to the server to reset the user's password.
 *
 * @param {Object} data - The data needed to reset the password.
 * @return {Promise} A promise that resolves with the response from the server.
 */
export const apiForgotPassword = (data) => {
  return axios({
    url: "user/forgotPassword",
    method: "POST",
    data,
  });
};
apiForgotPassword()
  .then((response) => {
    console.log("API ForgotPassword Response:", response.data);
  })
  .catch((error) => {
    console.error("API ForgotPassword Error:", error);
  });

/**
 * Sends a request to reset the user's password.
 *
 * @param {Object} data - The data for the request.
 * @return {Promise} A promise that resolves with the response from the server.
 */
export const apiResetPassword = (data) => {
  return axios({
    url: "/user/resetPassword",
    method: "PUT",
    data,
  });
};
apiResetPassword()
  .then((response) => {
    console.log("API Reset Password Response:", response.data);
  })
  .catch((error) => {
    console.error("API Reset Password Error:", error);
  });

/**
 * Sends a final registration request to the API using the provided token.
 *
 * @param {string} token - The registration token.
 * @return {Promise} A promise that resolves to the response from the API.
 */
export const apiFinalRegister = (token) => {
  return axios({
    url: "/user/register/finalRegister/" + token,
    method: "PUT",
  });
};
apiFinalRegister()
  .then((response) => {
    console.log("API Final register Response:", response.data);
  })
  .catch((error) => {
    console.error("API Final register Error:", error);
  });

/**
 * Sends a POST request to the server to log in using Google OAuth2.
 *
 * @return {Promise} A promise that resolves to the server response.
 */
export const apiOauth2LoginByGoogle = () => {
  return axios({
    url: "http://localhost:4000/api/auth/login-success",
    method: "POST",
  });
};

/**
 * Retrieves user data from the server.
 *
 * @return {Promise} A Promise that resolves to the user data.
 */
export const apiGetUser = () => {
  return axios({
    url: "/user/user",
    method: "GET",
  });
};
apiGetUser()
  .then((response) => {
    console.log("API get user Response:", response.data);
  })
  .catch((error) => {
    console.error("API get user Error:", error);
  });

/**
 * Retrieves all users from the API.
 *
 * @return {Promise} A Promise that resolves with the response from the API.
 */
export const apiGetAllUsers = (params) => {
  return axios({
    url: "/user/users",
    method: "GET",
    params,
  });
};
apiGetAllUsers()
  .then((response) => {
    console.log("API get all users Response:", response.data);
  })
  .catch((error) => {
    console.error("API get all users Error:", error);
  });

/**
 * Deletes a user from the API.
 *
 * @param {string} userId - The ID of the user to be deleted.
 * @return {Promise} A Promise that resolves to the API response.
 */
export const apiDeleteUser = (userId) => {
  return axios({
    url: "/user/delete/" + userId,
    method: "DELETE",
  });
};
apiDeleteUser()
  .then((response) => {
    console.log("API delete user Response:", response.data);
  })
  .catch((error) => {
    console.error("API delete user Error:", error);
  });

/**
 * Updates a user in the API.
 *
 * @param {object} data - The data to update the user with.
 * @param {string} userId - The ID of the user to update.
 * @return {Promise} A promise that resolves with the result of the update.
 */
export const apiUpdateUser = (data, userId) => {
  return axios({
    url: "/user/update/" + userId,
    method: "PUT",
    data,
  });
};
apiUpdateUser()
  .then((response) => {
    console.log("API update user Response:", response.data);
  })
  .catch((error) => {
    console.error("API update user Error:", error);
  });

/**
 * Updates the current user's information.
 *
 * @param {Object} data - The data containing the updated user information.
 * @return {Promise} A Promise that resolves to the updated user information.
 */
export const apiUpdateCurrentUser = (data) => {
  return axios({
    url: "/user/updateCurrentUser",
    method: "PUT",
    data,
  });
};
apiUpdateCurrentUser()
  .then((response) => {
    console.log("API update user Response:", response.data);
  })
  .catch((error) => {
    console.error("API update user Error:", error);
  });

/**
 * Updates the user's cart with the provided data.
 *
 * @param {object} data - The data to be sent in the request.
 * @return {Promise} A promise that resolves to the response data.
 */
export const apiUpdateUserCart = (data) => {
  return axios({
    url: "/user/updateCart",
    method: "PUT",
    data,
  });
};
apiUpdateUserCart()
  .then((response) => {
    console.log("API update user cart Response:", response.data);
  })
  .catch((error) => {
    console.error("API update user cart Error:", error);
  });

/**
 * Removes a user's cart item based on the given product ID and color.
 *
 * @param {string} p_id - The product ID of the item to be removed from the cart.
 * @param {string} color - The color of the item to be removed from the cart.
 * @return {Promise} A Promise that resolves to the result of the API call.
 */
export const apiRemoveUserCart = (p_id, color) => {
  return axios({
    url: "/user/removeCart/" + p_id + "/" + color,
    method: "DELETE",
  });
};
apiRemoveUserCart()
  .then((response) => {
    console.log("API remove user cart Response:", response.data);
  })
  .catch((error) => {
    console.error("API remove user cart Error:", error);
  });

/**
 * Sends a login request to the API using OAuth2 credentials.
 *
 * @param {string} outh2Id - The OAuth2 ID.
 * @param {string} tokenLogin - The login token.
 * @return {Promise} A promise that resolves with the API response.
 */
export const apiOauth2Login = (oauth2Id, tokenLogin) => {
  return axios({
    url: "http://localhost:4000/api/user/auth/login-success",
    method: "POST",
    data: {
      oauth2Id,
      tokenLogin,
    },
  });
};
apiOauth2Login({ oauth2Id: ``, tokenLogin: `` })
  .then((response) => {
    console.log("API Oauth2 Login Response:", response.token);
  })
  .catch((error) => {
    console.error("API Oauth2 Login Error:", error);
  });

/**
 * Retrieves an OAuth2 user from the API using the provided token.
 *
 * @param {string} token - The authentication token.
 * @return {Promise} A Promise that resolves to the user data.
 */
export const apiGetOauth2User = (oauth2Id) => {
  return axios({
    url: "http://localhost:4000/api/user/get-one/" + oauth2Id,
    method: "GET",
  });
};
apiGetOauth2User(12)
  .then((response) => {
    console.log("API Get Oauth2 User Response:", response.data);
  })
  .catch((error) => {
    console.error("API Get Oauth2 User Error:", error);
  });
