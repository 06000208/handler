/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import { URL } from "node:url";
import { isAbsolute } from "node:path";
import { isURL } from "../util/isURL.js";

/**
 * Note that hot reloading modules and cache busting is incompatible with
 * ImportLoader as the cache used by ecmascript modules isn't accessible
 * in any way
 */
export class ImportLoader {
    /**
     * @param {string} base
     * @param {Construct|Sorter|null} target
     */
    constructor(base = null, target) {
        this.base = base;
    }

    test(path) {
        return;
    }

    /**
     * @param {string} specifier
     * @param {Construct|Sorter|null} [target]
     * @param {string|boolean} [base]
     */
    async loadModule(specifier, target, base) {
        if (!specifier) throw new TypeError("A module specifier is required");
        // if both bases are truthy, we can assume one or the other will be a string
        // if base is a string, we can attempt to use it as a base
        // if base isn't false, this.base is truthy, and the specifier fails absolute and url checks, we can assume the specifier is relative
        if ((base && this.base) || typeof base == "string" || (base !== false && this.base && !isAbsolute(specifier) && !isURL(specifier))) {
            return await this.loadRelativeModule(specifier, target, base);
        } else {
            return await this.loadAbsoluteModule(specifier, target);
        }
    }

    /**
     * @param {string} input
     * @param {Construct|Sorter|null} [target]
     * @param {string|boolean} [base]
     */
    async loadRelativeModule(input, target, base) {
        if (!base && !this.base) throw new TypeError("Cannot load relative modules without a base");
        const specifier = new URL(input, typeof base == "string" ? base : this.base).href;
        return await this.loadAbsoluteModule(specifier, target);
    }

    async loadAbsoluteModule(specifier, target) {
        const module = await import(specifier);
        return module;
    }
}
