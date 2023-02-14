// node and esm only
export * from "./node.js";
export * from "./node/esm/ImportLoader.js";
export * from "./node/esm/ImportQueryLoader.js";
export * from "./node/esm/ImportWorkerLoader.js";
export * from "./node/esm/RequireLoader.js";

import * as node from "./node.js";
import { ImportLoader } from "./node/esm/ImportLoader.js";
import { ImportQueryLoader } from "./node/esm/ImportQueryLoader.js";
import { ImportWorkerLoader } from "./node/esm/ImportWorkerLoader.js";
import { RequireLoader } from "./node/esm/RequireLoader.js";

export default {
    ...node,
    ImportLoader,
    ImportQueryLoader,
    ImportWorkerLoader,
    RequireLoader,
};
