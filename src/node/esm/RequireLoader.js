/* eslint-disable no-unused-vars */
import { createRequire } from "node:module";

/**
 * ESM counterpart to the node.js cjs only class RequireLoader using
 * createRequire
 *
 * This is capable of loading commonjs modules in your ESM project,
 * but is generally not recommended
 *
 * Note: You may get this intellisense for the CJS version of the
 * class, which is wrong, but as far as I can see unfixable.
 */
export class RequireLoader {
    constructor(path) {
        this.require = createRequire(path);
    }

    loadModule(specifier) {
        //
    }
}
