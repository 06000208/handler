/**
 * Used to load blocks of different classes/types with their corresponding
 * construct.
 *
 * This is only compatible with blocks which have a type property (more
 * performant), or are instances of a class.
 *
 * When there isn't a type property, if the type isn't registered, or if the
 * block isn't an instance of any registered classes, the block will be ignored.
 */
export class Sorter {
    constructor() {
        /**
         * Type strings paired with constructs, or something which implements
         * the Construct API
         * @private
         * @type {Object.<string, Construct>}
         */
        this.index = {};

        /**
         * Type strings mapped to their equivalent Class, to enable sorting
         * based on class alone
         * @private
         * @type {Map<string, *>}
         */
        this.classTypes = new Map();
    }

    /**
     * Registers a type string with a corresponding construct in the sorter.
     *
     * If the type has already been registered, this replaces the previous
     * registration
     *
     * This function returns the sorter instance to enable chaining.
     * @param {string} type A string representing a type, such as the name of
     * a class. The type property of blocks you want sorted will use this string
     * @param {Construct} construct Any instance of a construct, or something
     * which implements the Construct API
     */
    registerType(type, construct) {
        if (!type || !construct) return this;
        Object.defineProperty(this.index, type, { value: construct });
        return this;
    }

    /**
     * Registers a class in the sorter with a corresponding type and construct
     * in the sorter.
     *
     * Note that when classes are used, sorts will take longer.
     *
     * This function returns the sorter instance to enable chaining.
     * @param {string} type A string representing a type, such as the name of
     * a class. The type property of blocks you want sorted will use this string
     * @param {*} cls
     * @param {?Construct} [construct] If omitted, will only register the class.
     * Blocks won't be sorted unless the type has already been, or will be,
     * registered with Sorter#registerType()
     */
    registerClass(type, cls, construct) {
        if (!type || !cls) return this;
        this.classTypes.set(type, cls);
        return construct ? this.registerType(type, construct) : this;
    }

    /**
     * Removes a type and construct from the sorter.
     *
     * This function returns the sorter instance to enable chaining.
     * @param {string} type A string representing a type, such as the name of
     * a class. The type property of blocks you want sorted will use this string
     * @param {boolean} [removeClass=true] If you want the class to remain
     * untouched, set this to false. Usually, you don't want to do this.
     */
    removeType(type, removeClass = true) {
        if (!type) return this;
        delete this.index[type];
        if (removeClass) this.removeClass(type, false);
        return this;
    }

    /**
     * Removes a class and it's corresponding type/construct pair from the
     * sorter.
     *
     * This function returns the sorter instance to enable chaining.
     * @param {string} type A string representing a type, such as the name of
     * a class. The type property of blocks you want sorted will use this string
     * @param {boolean} [removeType=true] If you want the type & construct to
     * remain untouched, set this to false. Usually, you don't want to do this.
     */
    removeClass(type, removeType = true) {
        if (!type) return this;
        this.classTypes.delete(type);
        if (removeType) this.removeType(type, false);
        return this;
    }

    /**
     * Loads blocks into constructs by type.
     *
     * This is only compatible with blocks which have a type property (more
     * performant), or are instances of a class.
     *
     * When there isn't a type property, if the type isn't registered, or if the
     * block isn't an instance of any registered classes, the block will be
     * ignored.
     *
     * You can sort arrays of blocks via destructuring: `sorter.sort(...array)`
     *
     * This function returns the sorter instance to enable chaining.
     * @param  {...{id: *, type: string}} blocks
     */
    load(...blocks) {
        if (!blocks.length) return this;
        for (const block of blocks) {
            if (!block) continue;
            if (block.type && this.index[block.type]) {
                this.index[block.type].load(block);
            } else if (this.classTypes.size) {
                for (const [type, cls] of this.classTypes.entries()) {
                    if (block instanceof cls && this.index[type]) {
                        this.index[type].load(block);
                        break;
                    }
                }
            }
        }
        return this;
    }
}
