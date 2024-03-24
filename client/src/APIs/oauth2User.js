import axios from '../axios.js';

/**
 * Sends a login request to the API using OAuth2 credentials.
 *
 * @param {string} outh2Id - The OAuth2 ID.
 * @param {string} tokenLogin - The login token.
 * @return {Promise} A promise that resolves with the API response.
 */
export const apiOauth2Login = ({ oauth2Id, tokenLogin }) => {
    return axios({
        url: 'http://localhost:4000/api/auth/login-success',
        method: 'POST',
        data: {
            oauth2Id,
            tokenLogin
        }
    });
}
apiOauth2Login({ oauth2Id: ``, tokenLogin: `` })
    .then(response => {
        console.log("API Oauth2 Login Response:", response.token);
    })
    .catch(error => {
        console.error("API Oauth2 Login Error:", error);
    })



/**
 * Retrieves an OAuth2 user from the API using the provided token.
 *
 * @param {string} token - The authentication token.
 * @return {Promise} A Promise that resolves to the user data.
 */
export const apiGetOauth2User = (token) => {
    console.log('aaaa')
    console.log(token)
    return axios({
        url: 'http://localhost:4000/api/oauth2user/get-one',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
// apiGetOauth2User('')
//     .then(response => {
//         console.log("API Get Oauth2 User Response:", response.data);
//     })
//     .catch(error => {
//         console.error("API Get Oauth2 User Error:", error);
//     })