export * from "./node.js";
export * from "./node/esm/ImportLoader.js";
// export * from "./node/esm/ImportQueryLoader.js";

import * as node from "./node.js";
import { ImportLoader } from "./node/esm/ImportLoader.js";
// import { ImportQueryLoader } from "./node/esm/ImportQueryLoader.js";

export default {
    ...node,
    ImportLoader,
    // ImportQueryLoader,
};
