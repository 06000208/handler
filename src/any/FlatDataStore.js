import { FlatDataWrapper, resolveDataFromWrapper } from "./FlatDataWrapper.js";

/**
 * Stores flat objects either in memory via a Map or through an adapter
 * implementing the map API
 *
 * See AsyncDataStore for async adapter support (for example, with the keyv package)
 */
export class FlatDataStore {
    /**
     * @param {Map<string, Object.<string, *>>} [adapter] Anything that implements get, set, delete, and clear, derived from the map api. Expected to handle serialization if needed.
     * @param {?Object.<string, *>} [defaults] Flat object with default values
     */
    constructor(adapter, defaults) {
        /**
         * @type {Map<string, Object.<string, *>>}
         */
        this.adapter = adapter || new Map();

        /**
         * Flat object with default values
         * @type {{}|Object.<string, *>}
         * @readonly
         */
        this.defaults = defaults || {};
    }

    /**
     * Returns a FlatDataWrapper instance for the specified data
     * @param {string} key
     * @returns {FlatDataWrapper}
     */
    get(key) {
        return new FlatDataWrapper(this.adapter.get(key), this.defaults, key);
    }

    /**
     * Adds or updates the specified key with new data, overwriting any that exists
     *
     * This accepts either an instance of FlatDataWrapper or a flat object
     * @param {string} key
     * @param {FlatDataWrapper|Object.<string, *>} value An instance of FlatDataWrapper or a flat object
     */
    set(key, value) {
        if (!value) throw new TypeError("value cannot be falsy");
        return this.adapter.set(key, resolveDataFromWrapper(value));
    }

    /**
     * Adds or patches the specified key with new data, updating any that exists
     *
     * This accepts either an instance of FlatDataWrapper or a flat object
     * @param {string} key
     * @param {FlatDataWrapper|Object.<string, *>} value
     */
    patch(key, value) {
        const data = this.adapter.get(key) || {};
        return this.adapter.set(key, { ...data, ...resolveDataFromWrapper(value) });
    }

    /**
     * Removes the specified data
     * @param {string} key
     * @returns {boolean} True if the specified data existed and has been removed, or false if the data does not exist
     */
    delete(key) {
        return this.adapter.delete(key);
    }

    /**
     * Removes all stored data
     */
    clear() {
        return this.adapter.clear();
    }
}
