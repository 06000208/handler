import { Block } from "./Block.js";

/**
 * A "box" is any object identified by an id property that has a value property.
 *
 * This class is an example, and is provided for convenience. You may be better
 * off using your own implementation.
 * @abstract
 */
class Box extends Block {
    /**
     * @param {*} [id] - The box's id
     * @param {*} [value] - The box's value
     */
    constructor(id, value = null) {
        super(id);

        /**
         * An identifier for an instantiated box.
         *
         * Note that identifiers are documented as "any" due to what Map
         * supports, you should document a specific type and syntax for your
         * ids in your own classes
         * @type {?string}
         * @name Box#id
         */

        /**
         * A value this box contains. This may be used as a way to handle things
         * you either don't have control over or don't wish to change.
         * @type {*}
         */
        this.value = value;
    }
}

export { Box };
