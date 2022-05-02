/**
 * Small module containing miscellaneous utility functions
 * @module util/misc
 */

/**
 * Checks whether or not a value is a function
 * @param {*} value The value being checked
 * @returns {boolean} True if value is a function, otherwise false
 */
const isFunction = (value) => value && typeof value == "function";

export { isFunction };
