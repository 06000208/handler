/* eslint-disable no-unused-vars */
import { createRequire } from "node:module";

/**
 * ESM counterpart to the node.js cjs only class RequireLoader using
 * createRequire
 */
export class RequireLoader {
    constructor(path) {
        this.require = createRequire(path);
    }

    loadModule(id) {
        //
    }
}
