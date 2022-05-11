import { generateIdentifier } from "./util/id.js";

/**
 * A "block" is an object identified by an id property, and anything that Map
 * accepts as a key may be used as an id.
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
class Block {
    constructor() {
        /**
         * An identifier for an instantiated block.
         *
         * Note that while identifiers are documented as "any" here due to what
         * Map supports, you should document a specific type and syntax for your
         * ids in your own classes.
         * @type {*}
         */
        this.id = this.constructor._getIdentifier();
    }

    /**
     * Returns an identifier used for instances of this class.
     *
     * To use different identifiers, extend the class, or a class which extends
     * this one, and replace _getIdentifier by adding a static method of the
     * same name. Whatever your method returns will be used as an
     * identifier.
     *
     * Block's default static _getIdentifier method simply uses handler's
     * generateIdentifier function
     * @returns {*}
     */
    static _getIdentifier() {
        return generateIdentifier();
    }
}

export { Block };
