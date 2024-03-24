import axios from '../axios'

/**
 * Retrieves a list of brands from the API.
 *
 * @return {Promise} A Promise that resolves to the list of brands.
 */
export const apiGetBrands = () => {
    return axios({
        url: '/brand/brands',
        method: 'GET',
    });
}
apiGetBrands()
    .then(response => {
        console.log("API getBrands Response:", response.data);
    })
    .catch(error => {
        console.error("API getBrands Error:", error);
    })