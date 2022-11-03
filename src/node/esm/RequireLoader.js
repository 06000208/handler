/* eslint-disable no-unused-vars */
import { createRequire } from "node:module";

/**
 * ESM counterpart to the node.js cjs only class RequireLoader using
 * createRequire
 *
 * This is capable of loading commonjs modules in your ESM project,
 * but is generally not recommended
 */
export class RequireLoader {
    constructor(path) {
        this.require = createRequire(path);
    }

    loadModule(specifier) {
        //
    }
}
