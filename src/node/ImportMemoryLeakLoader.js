/* eslint-disable no-unused-vars */

/**
 * Warning: This approach *will* leak memory, don't expect garbage collection to
 * work properly for modules when using this. This only allows for reloading the
 * imported module, not it's dependencies.
 */
class ImportMemoryLeakLoader {}
throw Error("Unfinished");
