import { generateIdentifier } from "../util/id.js";

const BlockMixin = (superClass) => class MixinBlock extends superClass {
    constructor(...args) {
        super(...args);
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
};

export { BlockMixin };
