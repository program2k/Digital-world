import axios from "../axios";

export const apiGetCategories = (params) => {
    return axios({
        url: '/productCategory/productCategories',
        method: 'GET',
        params
    });
}

apiGetCategories()
    .then(response => {
        console.log("API getCategories Response:", response.data);
    })
    .catch(error => {
        console.error("API getCategories Error:", error);
    });

export const apiGetCategoryById = (id) => {
    return axios({
        url: `productCategory/productCategory/${id}`,
        method: 'GET'
    });
};

apiGetCategoryById()
    .then(response => {
        console.log("API getCategoryById Response:", response.data);
    })
    .catch(error => {
        console.error("API getCategoryById Error:", error);
    });
