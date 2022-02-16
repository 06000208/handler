/**
 * A "block" is an object identified by an id property, and anything that Map
 * accepts as a key may be used as an id.
 *
 * This class is an example implementation & provided for convenience.
 * @abstract
 */
class Block {
    /**
     * @param {any} [id] - The block's id
     */
    constructor(id = null) {
        /**
         * An identifier for an instantiated block.
         *
         * Note that identifiers are documented as "any" due to what Map
         * supports, so you should document a specific type/syntax for your ids
         * if extending any of handler's classes
         * @type {any}
         */
        this.id = id;
    }
}

export { Block };
