const BoxMixin = (superClass) => class MixedBox extends superClass {
    /**
     * @param {*} [value] The box's value
     * @param {...*} [args]
     */
    constructor(value = null, ...args) {
        super(...args);

        /**
         * A value this box contains. This may be used as a way to handle things
         * you either don't have control over or don't wish to change.
         * @type {*}
         */
        this.value = value;
    }
};

export { BoxMixin };
