/* eslint-disable no-unused-vars */
import { createRequire } from "module";

/**
 * ESM counterpart to the node.js cjs only class RequireLoader using
 * createRequire
 */
class RequireLoader {
    constructor(path) {
        this.require = createRequire(path);
    }

    loadModule(id) {
        //
    }
}

throw Error("Unfinished");
