import { URL } from "node:url";

/**
 * Uses the URL class compliant with the WHATWG URL Standard to check if a
 * string is considered a URL.
 * @param {*} input
 * @returns {boolean}
 */
export const isURL = function(input) {
    try {
        new URL(input);
        return true;
    } catch (error) {
        return false;
    }
};
