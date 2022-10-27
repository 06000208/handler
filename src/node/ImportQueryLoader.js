/* eslint-disable no-unused-vars */

/**
 * As opposed to ImportLoader, this allows for "hot reloading" imported
 * modules, but it will not **not** their dependencies.
 *
 * This approach will "leak memory" as every module loaded is permanently cached
 * by the ESM cache, which cannot be modified. The same is true of regular imports,
 * but it's a bigger problem for this as it lets you load the "same module"
 * multiple times.
 *
 * This is partially mitigated by using a query string unique to any given file,
 * so memory use will only grow when the file itself has been changed or you
 * override this protection.
 *
 * Keep in mind that every unique load will increase memory.
 */
export class ImportQueryLoader {
    constructor() {
        //
    }
}
