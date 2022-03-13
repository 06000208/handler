/**
 * A "block" is an object identified by an id property, and anything that Map
 * accepts as a key may be used as an id.
 *
 * This class is an example, and is provided for convenience. You may be better
 * off using your own implementation.
 * @abstract
 */
class Block {
    /**
     * @param {*} [id] - The block's id
     */
    constructor(id = null) {
        /**
         * An identifier for an instantiated block.
         *
         * Note that identifiers are documented as "any" due to what Map
         * supports, you should document a specific type and syntax for your
         * ids in your own classes
         * @type {*}
         */
        this.id = id;
    }
}

export { Block };
