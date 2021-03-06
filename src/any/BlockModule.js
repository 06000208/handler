import { Block } from "./Block.js";

/**
 * The same as {@link Block}, but has a property for module specifiers (import
 * specifiers and require ids)
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
class BlockModule extends Block {
    constructor() {
        super();

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

export { BlockModule };
