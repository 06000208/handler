import { URL } from "node:url";

/**
 * Uses some checks and the URL class (compliant with the WHATWG URL Standard) to check if a string is considered a URL.
 * @param {*} input
 * @returns {boolean}
 */
export const isURL = function(input) {
    if (!input) return false;
    if (Array.isArray(input)) return false;
    try {
        new URL(input);
        return true;
    } catch (error) {
        return false;
    }
};
