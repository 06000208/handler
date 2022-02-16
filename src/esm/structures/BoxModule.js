import { Box } from "./Box.js";

/**
 * The same as {@link Box}, but has a property for module specifiers (import
 * specifiers and require ids)
 * @abstract
 */
class BoxModule extends Box {
    /**
     * @param {*} [id] - The box's id
     * @param {*} [value] - The box's value
     * @param {*} [moduleSpecifier] - Import specifier or require id string
     */
    constructor(id, value = null, moduleSpecifier = null) {
        super(id, value);

        /**
         * If module origin is applicable to an instance of this class, this
         * will be a string, if not this will be null. The string is either an
         * import specifier usable with ESM imports, or an id usable with
         * node.js's require()
         * @type {?string}
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
         * @see https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#import-specifiers
         * @see https://nodejs.org/dist/latest-v16.x/docs/api/modules.html#requireid
         */
        this.moduleSpecifier = moduleSpecifier;
    }
}

export { BoxModule };
