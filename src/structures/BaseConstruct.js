/**
 * Internal class. This won't function and **will** cause errors unless extended
 * or modified after instantiation, see Construct and CollectionConstruct's
 * source code for examples of this.
 * @private
 * @abstract
 */
class BaseConstruct {
    /**
     * Loads a block, intended to be extended (using the super keyword) or
     * replaced.
     * @param {{id: *, moduleSpecifier: ?string}} block
     * @param {?string} [moduleSpecifier] Import specifier or require id string
     * @returns {boolean} Returns true upon success, false upon failure
     */
    load(block, moduleSpecifier) {
        if (moduleSpecifier) block.moduleSpecifier = moduleSpecifier;
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

export { BaseConstruct };
