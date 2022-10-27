export * from "./node.js";
export * from "./node/ImportLoader.js";
export * from "./node/ImportQueryLoader.js";

import * as node from "./node.js";
import { ImportLoader } from "./node/ImportLoader.js";
import { ImportQueryLoader } from "./node/ImportQueryLoader.js";

export default {
    ...node,
    ImportLoader,
    ImportQueryLoader,
};
