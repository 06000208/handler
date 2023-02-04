/**
 * If an instance of FlatDataWrapper, returns FlatDataWrapper.data, otherwise returns input
 * @param {*} value
 * @returns {Object.<string, *>}
 * @private
 */
export const resolveDataFromWrapper = (value) => value instanceof FlatDataWrapper ? value.data : value;

/**
 * Data wrapper for a flat object and defaults accessible through a proxy, mainly useful for flat key/value settings or user data.
 */
export class FlatDataWrapper {
    /**
     * @param {Object.<string, *>} [data]
     * @param {Object.<string, *>} [defaults] Flat object with default values
     * @param {?string} [id]
     */
    constructor(data, defaults, id) {
        /**
         * Regular settings data
         * @type {{}|Object.<string, *>}
         */
        this.data = { ...data };

        /**
         * Default settings
         * @type {{}|Object.<string, *>}
         * @readonly
         */
        this.defaults = { ...defaults };

        /**
         * Optional identifier this data is associated with, for use with DataStore and AsyncDataStore
         * @type {?string}
         */
        this.id = id || null;
    }

    /**
     * Proxy for accessing your data with fallback to provided defaults when properties are undefined
     *
     * Setting, deleting, keys(), entries(), etc. will be performed on your data unchanged
     * @returns {Proxy}
     */
    get proxy() {
        // This property shadows the getter, as we can't delete or redeclare getters on class instances
        Object.defineProperty(this, "proxy", {
            value: new Proxy(this.data, {
                get: (target, key) => target[key] === undefined ? this.defaults[key] : target[key],
            }),
            enumerable: true,
        });
        return this.proxy;
    }
}
