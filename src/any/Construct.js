import { BaseConstruct } from "./BaseConstruct.js";

/**
 * A "construct" is a manager with a cache and methods/properties related to
 * whats being managed.
 *
 * This class is deliberately generic and provided for convenience, intended to
 * be extended for your own use cases.
 * @abstract
 */
class Construct extends BaseConstruct {
    constructor() {
        super();

        /**
         * The cache of blocks mapped by their ids.
         *
         * Note that this documentation is intentionally loose and generic, and
         * you should document more specific types in your own classes.
         * @type {Map<*, {id: *, moduleSpecifier: ?string}>}
         */
        this.cache = new Map();
    }

    /**
     * Loads a block, intended to be extended (using the super keyword) or
     * replaced.
     * @name Construct#load
     * @param {{id: *, moduleSpecifier: ?string}} block
     * @returns {boolean} Returns true upon success, false upon failure
     */

    /**
     * Unloads a block, intended to be extended (using the super keyword) or
     * replaced.
     * @name Construct#unload
     * @param {{id: *, moduleSpecifier: ?string}} block
     * @returns {boolean} Returns true upon success, false upon failure
     */
}

export { Construct };
