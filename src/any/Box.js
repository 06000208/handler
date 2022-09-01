import { Block } from "./Block.js";

/**
 * A "box" is any object identified by an id property that has a value property.
 *
 * This class is deliberately generic and provided for convenience, intended to
 * be extended for your own use cases.
 *
 * By default, this uses handler's generateIdentifier function for it's ids. If
 * this is undesirable, extend the class and replace Block#_getIdentifier by
 * adding a static function of the same name.
 *
 * Note that you may be better off using your own implementation, and that doing
 * so is fine. Regular objects also work as blocks, as long as you follow the
 * specification of the construct you're using them with.
 * @abstract
 */
export class Box extends Block {
    /**
     * @param {*} [value] The box's value
     */
    constructor(value = null) {
        super();

        /**
         * A value this box contains. This may be used as a way to handle things
         * you either don't have control over or don't wish to change.
         * @type {*}
         */
        this.value = value;
    }
}
