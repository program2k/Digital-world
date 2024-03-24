import axios from "../axios.js";

/**
 * Retrieves a list of products from the API.
 *
 * @param {Object} params - The parameters for the API request.
 * @return {Promise} A promise that resolves with the response data.
 */
export const apiGetProducts = async (params) => {
    return axios({
        url: '/product/products',
        method: 'GET',
        params
    })
};

/**
 * Retrieves product data from the API based on the provided ID.
 *
 * @param {number} id - The ID of the product to retrieve.
 * @return {Promise} A Promise that resolves to the product data.
 */
export const apiGetProductById = (id) => {
    return axios({
        url: '/product/products/' + id,
        method: 'GET',
    })
};

/**
 * Sends a PUT request to the '/product/rating' endpoint with the provided data.
 *
 * @param {object} data - The data to be sent with the request.
 * @return {Promise} A promise that resolves with the response from the server.
 */
export const apiRating = (data) => {
    console.log(data)
    return axios({
        url: '/product/rating',
        method: 'PUT',
        data
    });
};


/**
 * Creates a new product using the API.
 *
 * @param {Object} data - The data object containing the product information.
 * @return {Promise} A Promise that resolves to the response from the API.
 */
export const apiCreateProduct = (data) => {
    return axios({
        url: '/product/createProduct',
        method: 'POST',
        data
    });
}


/**
 * Updates a product in the API.
 *
 * @param {string} productId - The ID of the product to update.
 * @param {object} data - The data to update the product with.
 * @return {Promise} A promise that resolves to the updated product.
 */
export const apiUpdateProduct = (productId, data) => {
    return axios({
        url: '/product/updateProduct/' + productId,
        method: 'PUT',
        data
    });
}

/**
 * Deletes a product from the server.
 *
 * @param {number} productId - The ID of the product to be deleted.
 * @return {Promise} A promise that resolves with the result of the deletion.
 */
export const apiDeleteProduct = (productId) => {
    return axios({
        url: '/product/deleteProduct/' + productId,
        method: 'DELETE',
    });
}


/**
 * Adds a variant to the product using the API.
 *
 * @param {object} data - The data for the variant.
 * @param {string} id - The ID of the product.
 * @return {Promise} A promise that resolves with the result of the API call.
 */
export const apiAddVariant = (data, id) => {
    return axios({
        url: '/product/variant/' + id,
        method: 'PUT',
        data
    });
}



/**
 * Creates an order using the provided data.
 *
 * @param {Object} data - The data for creating the order.
 * @return {Promise} A promise that resolves to the created order.
 */
export const apiCreateOrder = (data) => {
    console.log('dddddd')
    console.log('data: ', data)
    return axios({
        url: '/order/create',
        method: 'POST',
        data
    });
}


/**
 * Retrieves orders from the server based on the provided parameters.
 *
 * @param {Object} params - The parameters to filter the orders.
 * @return {Promise} A promise that resolves to the response from the server.
 */
export const apiGetUserOrders = (params) => {
    return axios({
        url: '/order/orders',
        method: 'GET',
        params
    });
}