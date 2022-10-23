export * from "./node.js";
import * as node from "./node.js";
import * as RequireLoader from "./node/cjs/RequireLoader.cjs";
export { RequireLoader };
export default {
    ...node,
    ...RequireLoader,
};
// import { RequireLoader } from "./node/cjs/RequireLoader.cjs";
// export { RequireLoader };
// export default {
//     ...node,
//     "RequireLoader": RequireLoader,
// };
