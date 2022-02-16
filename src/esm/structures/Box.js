import { Block } from "./Block.js";

/**
 * A "box" is any object identified by an id property that has a value property.
 *
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
         * An identifier for an instantiated box
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