/**
 * Small utility functions for interacting with maps
 * @module util/maps
 */

/**
 * Logic for easily appending to & creating arrays in maps
 * @param {Map} map
 * @param {*} key
 * @param {...*} values
 */
const pushArrayInMap = function(map, key, ...values) {
    if (!values.length) return;
    const value = map.get(key);
    if (value && Array.isArray(value)) {
        value.push(...values);
    } else {
        map.set(key, values);
    }
};

/**
 * Logic for easily removing elements from arrays stored in maps
 * @param {Map} map
 * @param {*} key
 * @param {...*} values
 */
const filterArrayInMap = function(map, key, ...values) {
    if (!values.length) return;
    const value = map.get(key);
    if (!value || !Array.isArray(value)) return;
    if (value.length === 1 && value[0] === values[0]) {
        map.delete(key);
    } else {
        map.set(key, value.filter(element => !values.includes(element)));
    }
};

export { pushArrayInMap, filterArrayInMap };
