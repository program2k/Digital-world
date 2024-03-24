import icons from "./icons";

/**
 * Formats a string by converting it to lowercase, normalizing it, and replacing diacritics with their base characters.
 *
 * @param {string} string - The string to be formatted.
 * @return {string} The formatted string with diacritics replaced and spaces replaced with hyphens.
 */
export const format = (string) => {
    return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');
}

/**
 * Formats the given price into a string representation with a single decimal place
 * and localized thousands separators.
 *
 * @param {number} price - The price to be formatted.
 * @return {string} The formatted price as a string.
 */
export const formatPrice = (price) => {
    return Number(price?.toFixed(1)).toLocaleString();
}


/**
 * Renders stars based on the number of stars given.
 *
 * @param {number} stars - The number of stars to render.
 * @return {Array} - An array of React components representing the stars.
 */
export const renderStars = (stars) => {
    const { AiOutlineStar, AiFillStar } = icons;
    const starArr = [];
    if (!Number(stars)) {
        return;
    }
    for (let i = 0; i < +stars; i++) {
        starArr.push(<AiFillStar color="orange" />);
    }
    for (let i = 5; i > +stars; i--) {
        starArr.push(<AiOutlineStar color="orange" />);
    }
    return starArr;
};

/**
 * Validates the payload and sets invalid fields.
 *
 * @param {Object} payload - The payload to be validated.
 * @param {function} setInvalidFields - The function to set invalid fields.
 * @return {number} The count of invalid fields.
 */
export const validate = (payload, setInvalidFields) => {
    let invalidCount = 0;
    const formatPayload = Object.entries(payload);

    for (let arr of formatPayload) {
        if (arr[1].trim() === '') {
            invalidCount++;
            setInvalidFields((prev) => [
                ...prev,
                { name: arr[0], message: 'Required field' }
            ]);
        }
    }
    for (let arr of formatPayload) {
        switch (arr[0]) {
            case 'email':
                const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (!arr[1].match(validRegex)) {
                    invalidCount++;
                    setInvalidFields((prev) => [
                        ...prev,
                        { name: arr[0], message: 'Email is not valid' }
                    ]);
                }
                break;
            case 'password':
                if (arr[1].length < 6) {
                    invalidCount++;
                    setInvalidFields((prev) => [
                        ...prev,
                        { name: arr[0], message: 'The minimum password length required is 6 characters.' }
                    ]);
                }
                break;
            default:
                break;
        }
    }
    return invalidCount;
}

/**
 * Formats the given price by rounding it to the nearest thousand.
 *
 * @param {number} price - The price to be formatted.
 * @return {number} The formatted price.
 */
export const formatMoney = (price) => {
    return Math.round(price / 1000) * 1000;
}

/**
 * Generates an array of numbers within a specified range.
 *
 * @param {number} start - The starting number of the range.
 * @param {number} end - The ending number of the range.
 * @return {Array} - An array of numbers within the specified range.
 */
export const generateRange = (start, end) => {
    const length = end + 1 - start; // 10 = 10 + 1 - 1
    return Array.from({ length }, (_, index) => start + index);
};

/**
 * Generates a base64 representation of the given file.
 *
 * @param {Blob} file - The file to be converted to base64.
 * @return {Promise} A promise that resolves with the base64 data of the file.
 *                    If an error occurs, the promise is rejected with an error message.
 */
export function getBase64(file) {
    if (!(file instanceof Blob)) {
        return Promise.reject(new Error('Đầu vào không phải là đối tượng Blob hợp lệ'));
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
            // Khi thành công, resolve với dữ liệu base64
            resolve(reader.result);
        };
        
        reader.onerror = (error) => {
            // Khi xảy ra lỗi, reject với thông báo lỗi
            reject(error);
        };
        
        // Đọc dữ liệu thành dạng base64
        reader.readAsDataURL(file);
    });
}


