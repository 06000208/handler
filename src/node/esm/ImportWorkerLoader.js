/* eslint-disable no-unused-vars */
/**
 * Would use worker threads & messaging module contents back to the main process
 * to implement cache busting for ecmascript modules. However, this may have
 * implications as to what modules may or may not contain, resulting in the
 * approach being completely unfeasible
 * @see https://nodejs.org/api/worker_threads.html
 */
export class ImportWorkerLoader {}
