/**
 * Internal class. This won't function unless extended or modified, see
 * Construct and CollectionConstruct's source code for examples of this.
 * @private
 * @abstract
 */
class BaseConstruct {
    constructor() {
        /**
         * @type {null|Map<*, {id: *}>}
         */
        this.cache = null;
    }

    /**
     * Loads a block, intended to be extended (using the super keyword) or
     * replaced.
     * @param {{id: *}} block
     * @returns {boolean} Returns true upon success, false upon failure
     */
    load(block) {
        this.cache.set(block.id, block);
        return true;
    }

    /**
     * Unloads a block, intended to be extended (using the super keyword) or
     * replaced.
     * @param {{id: *}} block
     * @returns {boolean} Returns true upon success, false upon failure
     */
    unload(block) {
        return this.cache.delete(block.id);
    }
}

export { BaseConstruct };
