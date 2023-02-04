import { Block } from "./Block.js";

/**
 * The same as {@link Block}, but has a property for module specifiers (import
 * specifiers and require ids). See the Block class for more info.
 * @abstract
 */
export class BlockModule extends Block {
    /**
     * @param {*} id An identifier for an instantiated block. Needed for serializing blocks to/from regular objects and other use cases.
     */
    constructor(id) {
        super(id);

        /**
         * If module origin is applicable to an instance of this class, this
         * will be a string, if not, this will be null. The string is either an
         * import specifier usable with ESM imports, or an id usable with
         * node.js's require()
         *
         * Due to relative module specifiers and the mechanics involved, this
         * property is intended to be set after instantiation.
         * @type {string|null}
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
         * @see https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#import-specifiers
         * @see https://nodejs.org/dist/latest-v16.x/docs/api/modules.html#requireid
         */
        this.moduleSpecifier = null;
    }
}
