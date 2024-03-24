import React, { useEffect, useState } from 'react';

/**
 * Generates a debounced value based on the provided value and delay time.
 *
 * @param {any} value - The value to debounce.
 * @param {number} delayTime - The delay time in milliseconds.
 * @return {string} - The debounced value.
 */
const useDebounce = (value, delayTime) => {
    const [debounce, setDebounce] = useState('');

    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            setDebounce(value);
        }, delayTime);
        return () => {
            clearTimeout(setTimeoutId);
        }
    }, [value, delayTime]);

    return debounce;
};

export default useDebounce;