import { FlatDataWrapper, resolveDataFromWrapper } from "./FlatDataWrapper.js";
import { FlatDataStore } from "./FlatDataStore.js";

/**
 * Stores flat objects either in memory via a Map or through an adapter
 * implementing an async version of the map API
 *
 * If you don't need async adapter support use the regular FlatDataStore class
 */
export class AsyncFlatDataStore extends FlatDataStore {
    /**
     * Returns a FlatDataWrapper instance for the specified data
     * @param {string} key
     * @returns {Promise<FlatDataWrapper>}
     */
    async get(key) {
        const data = await this.adapter.get(key);
        return new FlatDataWrapper(data, this.defaults, key);
    }

    /**
     * Adds or updates the specified key with new data, overwriting any that exists
     *
     * This accepts either an instance of FlatDataWrapper or a flat object
     * @param {string} key
     * @param {FlatDataWrapper|Object.<string, *>} value An instance of FlatDataWrapper or a flat object
     */
    async set(key, value) {
        if (!value) throw new TypeError("value cannot be falsy");
        return await this.adapter.set(key, resolveDataFromWrapper(value));
    }

    /**
     * Adds or patches the specified key with new data, updating any that exists
     *
     * This accepts either an instance of FlatDataWrapper or a flat object
     * @param {string} key
     * @param {FlatDataWrapper|Object.<string, *>} value
     */
    async patch(key, value) {
        const data = await this.adapter.get(key);
        return await this.adapter.set(key, { ...data, ...resolveDataFromWrapper(value) });
    }

    /**
     * Removes the specified data
     * @param {string} key
     * @returns {Promise<boolean>} True if the specified data existed and has been removed, or false if the data does not exist
     */
    async delete(key) {
        return await this.adapter.delete(key);
    }

    /**
     * Removes all stored data
     */
    async clear() {
        return await this.adapter.clear();
    }
}
