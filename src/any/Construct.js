/**
 * A "construct" is a manager with a cache, load and unload methods, and usually
 * methods/properties related to whats being managed. This code pattern is most
 * useful for "handlers" which manage cachable objects or instances, usually by
 * loading them from files, hence the name of the library.
 *
 * Caches must be either instances of Map or implement Map's api, such as
 * discord.js's Collection class.
 *
 * This class is deliberately generic and provided for convenience, intended to
 * be extended for your own use cases.
 * @abstract
 */
export class Construct {
    /**
     * @param {?Map<*, {id: *, moduleSpecifier: ?string}>} [cache]
     */
    constructor(cache) {
        /**
         * The cache of blocks mapped by their ids.
         *
         * Note that this documentation is intentionally loose and generic, and
         * you should document more specific types in your own classes.
         * @type {Map<*, {id: *, moduleSpecifier: ?string}>}
         */
        this.cache = cache || new Map();
    }

    /**
     * Loads a block, intended to be extended (using the super keyword) or
     * replaced.
     * @param {{id: *, moduleSpecifier: ?string}} block
     * @returns {boolean} Returns true upon success, false upon failure
     */
    load(block) {
        this.cache.set(block.id, block);
        return true;
    }

    /**
     * Unloads a block, intended to be extended (using the super keyword) or
     * replaced.
     * @param {{id: *, moduleSpecifier: ?string}} block
     * @returns {boolean} Returns true upon success, false upon failure
     */
    unload(block) {
        return this.cache.delete(block.id);
    }
}
