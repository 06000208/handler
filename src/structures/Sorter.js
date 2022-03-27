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
class Sorter {
    constructor() {
        /**
         * Type strings paired with constructs, or something which implements
         * the Construct API
         * @private
         * @type {Object.<string, Construct>}
         */
        this.index = {};

        /**
         * Classes mapped to equivalent type strings, which are then used with
         * the regular Sorter#index
         * @private
         * @type {Map<*, string>}
         */
        this.classTypes = new Map();

        /**
         * Array of classes used in the classTypes map as keys, necessary for
         * performance
         * @private
         * @type {[*]}
         */
        this.classes = [];
    }

    /**
     * Registers a type string with a corresponding construct in the sorter.
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
     * Registers a class in the sorter with a corresponding type string and
     * construct in the sorter.
     *
     * This function returns the sorter instance to enable chaining.
     * @param {*} cls
     * @param {string} type A string representing a type, such as the name of
     * a class. The type property of blocks you want sorted will use this string
     * @param {?Construct} [construct] If omitted, will only register the class.
     * Blocks won't be sorted unless the type has already been, or will be,
     * registered with Sorter#registerType()
     */
    registerClass(cls, type, construct) {
        if (!cls || !type) return this;
        this.classTypes.set(cls, type);
        this.classes.push(cls);
        return construct ? this.registerType(type, construct) : this;
    }

    /**
     * Removes type/construct pair from the sorter
     *
     * This function returns the sorter instance to enable chaining.
     * @param {string} type A string representing a type, such as the name of
     * a class. The type property of blocks you want sorted will use this string
     */
    removeType(type) {
        if (!type) return this;
        delete this.index[type];
        return this;
    }

    /**
     * Removes a class and corresponding type & construct from the sorter.
     *
     * This function returns the sorter instance to enable chaining.
     * @param {*} cls
     * @param {boolean} [deleteType=true] If you want the type & construct to
     * remain untouched, set this to false.
     */
    removeClass(cls, deleteType = true) {
        if (!cls) return this;
        if (deleteType) this.removeType(this.classTypes.get(cls), false);
        this.classTypes.delete(cls);
        this.classes.filter(value => value !== cls);
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
     * You can input arrays via destructuring: `sorter.sort(...array)`
     *
     * This function returns the sorter instance to enable chaining.
     * @param  {...{id: *, type: string}} blocks
     */
    sort(...blocks) {
        if (!blocks.length) return this;
        for (const block of blocks) {
            if (!block) continue;
            if (block.type && this.index[block.type]) {
                this.index[block.type].load(block);
            } else if (this.classes.length) {
                for (const cls of this.classes) {
                    if (block instanceof cls && this.index[this.classTypes.get(cls)]) {
                        this.index[this.classTypes.get(cls)].load(block);
                        break;
                    }
                }
            }
        }
        return this;
    }
}

export { Sorter };
