/**
 * A "construct" is a manager with a cache and methods/properties related to
 * whats being managed.
 * @abstract
 */
class Construct {
    /**
     * @param {Map} [cache] A javascript Map, or something which implements the
     * Map API such as \@discordjs/collection
     */
    constructor(cache = new Map()) {
        /**
         * The cache of blocks mapped by their ids.
         *
         * Note that this documentation is intentionally very loose and generic,
         * you should document specific types in your own classes.
         * @type {Map<*, {id: *}>}
         */
        this.cache = cache;
    }

    /**
     * Loads a block, intended to be extended (using the super keyword) or
     * replaced.
     * @param {{id: *}} block
     * @returns {boolean} true for success, false for failure
     */
    load(block) {
        this.cache.set(block.id, block);
        return true;
    }

    /**
     * Unloads a block, intended to be extended (using the super keyword) or
     * replaced.
     * @param {{id: *}} block
     * @returns {boolean} true for success, false for failure
     */
    unload(block) {
        return this.cache.delete(block.id);
    }
}

export { Construct };
