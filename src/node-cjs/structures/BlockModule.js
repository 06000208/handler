const Block = require("./Block.js");

/**
 * The same as {@link Block}, but has a property for module specifiers (import
 * specifiers and require ids)
 * @abstract
 */
class BlockModule extends Block {
    /**
     * @param {any} [id] - The block's id
     * @param {*} [moduleSpecifier] - Import specifier or require id string
     */
    constructor(id = null, moduleSpecifier = null) {
        super(id);

        /**
         * If module origin is applicable to an instance of this class, this
         * will be a string, if not this will be null. The string is either an
         * import specifier usable with ESM imports, or an id usable with
         * node.js's require()
         *
         * For relative module specifiers it's intended that this property can
         * be null after instantiation and set afterwards
         * @type {?string}
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
         * @see https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#import-specifiers
         * @see https://nodejs.org/dist/latest-v16.x/docs/api/modules.html#requireid
         */
        this.moduleSpecifier = moduleSpecifier;
    }
}

module.exports = BlockModule;
