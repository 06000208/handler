import { Collection } from "@discordjs/collection";
import { BaseConstruct } from "../structures/BaseConstruct.js";

/**
 * A "construct" is a manager with a cache and methods/properties related to
 * whats being managed.
 *
 * This class is deliberately generic and provided for convenience, intended to
 * be extended for your own use cases.
 *
 * As opposed to the Construct class which uses a Map, this uses a Collection
 * from @discordjs/collection
 * @abstract
 */
class CollectionConstruct extends BaseConstruct {
    constructor() {
        super();

        /**
         * The cache of blocks mapped by their ids.
         *
         * Note that this documentation is intentionally loose and generic, and
         * you should document more specific types in your own classes.
         * @type {Collection<*, {id: *, moduleSpecifier: ?string}>}
         */
        this.cache = new Collection();
    }

    /**
     * Loads a block, intended to be extended (using the super keyword) or
     * replaced.
     * @name Construct#load
     * @param {{id: *, moduleSpecifier: ?string}} block
     * @param {?string} [moduleSpecifier] Import specifier or require id string
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

export { CollectionConstruct };
