import { Construct } from "./Construct.js";
import { pushArrayInMap, filterArrayInMap } from "../util/maps.js";

/**
 * @abstract
 */
class ModuleConstruct extends Construct {
    /**
     * @param {Map} [cache] A javascript Map, or something which implements the
     * Map API such as \@discordjs/collection
     * @param {Map<?string, [string]>} [idsByModuleSpecifier] A javascript Map,
     * or something which implements the Map API such as \@discordjs/collection
     */
    constructor(cache = new Map(), idsByModuleSpecifier = new Map()) {
        super(cache);

        /**
         * Module specifiers mapped to arrays containing the ids of blocks
         * claiming to originate from that module.
         *
         * `null` is used for blocks without module specifiers if any were
         * loaded.
         * @type {Map<?string, [string]>}
         */
        this.idsByModuleSpecifier = idsByModuleSpecifier;
    }

    /**
     * Loads a block, intended to be extended (using the super keyword)
     * @param {{id: *, moduleSpecifier: ?string}} block
     * @returns {boolean} true for success, false for failure
     */
    load(block) {
        pushArrayInMap(this.idsByModuleSpecifier, block.moduleSpecifier, block.id);
        return super.load(block);
    }

    /**
     * Unloads a block, intended to be extended (using the super keyword)
     * @param {{id: *, moduleSpecifier: ?string}} block
     * @returns {boolean} true for success, false for failure
     */
    unload(block) {
        filterArrayInMap(this.idsByModuleSpecifier, block.moduleSpecifier, block.id);
        return super.unload(block);
    }
}

export { ModuleConstruct };