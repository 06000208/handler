/**
 * Used to load blocks of different classes/types with their corresponding
 * construct.
 *
 * This is only compatible with blocks which have a type property, which isn't
 * present in any of the example classes exported by the package.
 *
 * When there isn't a type property, or the type isn't present in the sorter's
 * index object, the block is ignored.
 */
class Sorter {
    constructor() {
        /**
         * Type strings paired with constructs, or things which
         * implement the Construct API
         * @type {Object.<string, Construct>}
         */
        this.index = {};
    }

    /**
     * Convenience function to set constructs in the sorter's index object.
     *
     * This function returns the sorter instance to enable chaining.
     * @param {string} type - A string representing a type, such as the name of
     * a class. The type property of blocks you want sorted will use this string
     * @param {Construct} construct - Any instance of a construct, or something
     * which implements the Construct API
     */
    set(type, construct) {
        Object.defineProperty(this.index, type, { value: construct });
        return this;
    }

    /**
     * Convenience function to delete constructs from the sorter's index object.
     *
     * This function returns the sorter instance to enable chaining.
     * @param {string} type - A string representing a type, such as the name of
     * a class. The type property of blocks you want sorted will use this string
     */
    delete(type) {
        delete this.index[type];
        return this;
    }

    /**
     * Loads blocks into constructs by type.
     *
     * This is only compatible with blocks which have a type property, which
     * isn't present in any of the example classes exported by the package.
     *
     * When there isn't a type property, or the type isn't present in the
     * sorter's index object, the block is ignored.
     *
     * This function returns the sorter instance to enable chaining.
     * @param  {...{id: *, type: string}} blocks
     */
    sort(...blocks) {
        if (!blocks.length) return this;
        for (const block of blocks) {
            if (!block || !block.type) continue;
            const constructor = this.index[block.type];
            if (!constructor) continue;
            constructor.load(block);
        }
        return this;
    }
}

export { Sorter };
