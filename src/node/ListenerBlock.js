import { BlockModule } from "../any/BlockModule.js";

/**
 * Callback function called when an event is emitted, as described here:
 * https://nodejs.org/dist/latest/docs/api/events.html#events_event
 *
 * By default, the `this` keyword is a reference to the function's respective
 * EventEmitter. This may be changed to the function's respective ListenerBlock
 * via EventEmitterConstruct and ListenerBlock's `bindThis` options, with the
 * latter taking priority over the former.
 *
 * Note that if you use an arrow function, you won't be able to use the `this`
 * keyword to access the event emitter (by default), or ListenerBlock#emitter,
 * ListenerBlock#construct, etc. when bindThis is enabled.
 *
 * As a legacy feature, the emitter can be bound as the first parameter on load
 * depending EventEmitterConstruct and ListenerBlock's `bindEmitterParameter`
 * options, with the latter taking priority over the former.
 * @callback listener
 * @param {EventEmitter} [emitter] Optionally present, only bound as the first
 * parameter by EventEmitterConstruct when enabled. Note that this is a legacy
 * feature, and that the preferred way to access the emitter from a listener
 * function is by using the `this` keyword. See EventEmitterConstruct or
 * ListenerBlock's `bindThis` options for more information
 * @param {...*} parameters Provided by the event being emitted
 */

/**
 * @typedef {Object} ListenerData
 * @property {string} event The name of the event the listener function is for
 * @property {?boolean|null} [once] Whether the listener should only run once
 * @property {?boolean|null} [bindThis] Whether the listener's this keyword
 * should be set to it's respective ListenerBlock
 * @property {?boolean|null} [bindEmitterParameter] Whether the EventEmitterConstruct
 * should bind the emitter as the first parameter of the function
 * @property {?listener} [listener] One way of providing the listener
 * function. If omitted, you must provide the listener using ListenerBlock's
 * second parameter.
 */

/**
 * A block based on a listener callback for an event emitter. Specifically,
 * node.js's [EventEmitter](https://nodejs.org/docs/latest-v17.x/api/events.html#class-eventemitter)
 * class. This should also be compatible with re-implementations and shims,
 * so it's still exported by the browser compatible version of Handler.
 *
 * By default, this uses handler's generateIdentifier function for it's ids. If
 * this is undesirable, extend the class and replace Block#_getIdentifier by
 * adding a static function of the same name.
 */
export class ListenerBlock extends BlockModule {
    /**
     * @param {ListenerData|string} input Either a ListenerData object, or
     * the name of the event. If using the latter, you must provide the listener
     * function as the second parameter.
     * @param {?listener} [listener] One way of providing the listener function.
     * If omitted, you must provide the listener using the ListenerData object.
     * This parameter is ignored when the listener is provided using the
     * ListenerData object.
     */
    constructor(input, listener) {
        super();
        if (!input) throw new TypeError("first parameter cannot be falsy, must be an object or string");
        let data;
        if (typeof input == "string") {
            data = { "event": input, "listener": listener };
        } else {
            data = { ...input };
            if (!data.event || typeof data.event != "string") throw new TypeError("event must be a string");
            if (!data.listener) data.listener = listener;
        }
        if (!data.listener || typeof data.listener != "function") throw new TypeError("a listener function must be supplied");

        /**
         * The name of the event the listener is for
         * @type {string}
         */
        this.event = data.event;

        /**
         * Whether the listener should only run once (whether EventEmitter#on()
         * or EventEmitter#once() is used). If null, construct behavior will be
         * left unchanged.
         * @type {boolean|null}
         */
        this.once = data.once == null ? null : Boolean(data.once);

        /**
         * Whether the listener's `this` keyword should be set to it's respective
         * ListenerBlock. If null, construct behavior will be left unchanged.
         *
         * Normally, a listener function's `this` keyword is a reference to it's
         * respective EventEmitter instance, and for most purposes this is
         * satisfactory, but if you have extended the ListenerBlock class with
         * properties or other methods, you may wish for those to be accessible
         * via `this` too.
         *
         * When using bindThis, the event emitter will still be accessible via
         * `this.emitter`. For information on the default `this` keyword in the
         * context of events, see https://nodejs.org/docs/latest/api/events.html#passing-arguments-and-this-to-listeners
         * @type {boolean|null}
         */
        this.bindThis = data.bindThis == null ? null : Boolean(data.bindThis);

        /**
         * Whether the EventEmitterConstruct should bind the emitter as the
         * first parameter of the function. If null, construct behavior will be
         * left unchanged.
         *
         * Note that this is a legacy feature, and that the preferred way to
         * access the emitter from a listener function is by using the `this`
         * keyword, either directly by default, or via ListenerBlock#emitter
         * when EventEmitterConstruct or ListenerBlock's `bindThis` option is
         * enabled.
         * @type {boolean|null}
         */
        this.bindEmitterParameter = data.bindEmitterParameter == null ? null : Boolean(data.bindEmitterParameter);

        /**
         * The event emitter which will emit the event, so you can access it
         * using `this.emitter` inside your listener functions.
         *
         * This property is only set on load, and will be null after
         * instantiation.
         * @type {EventEmitter|null}
         */
        this.emitter = null;

        /**
         * The construct which manages this block, so you can access it using
         * `this.construct` inside your listener functions.
         *
         * This property is only set on load, and will be null after
         * instantiation.
         * @type {EventEmitterConstruct|null}
         */
        this.construct = null;

        /**
         * Callback function called when the event named by the
         * ListenerBlock.event property is emitted, referred to as the listener
         * function.
         *
         * Note that if you use an arrow function, you won't be able to use the
         * `this` keyword to access ListenerBlock#emitter,
         * ListenerBlock#construct, etc.
         *
         * The emitter can be bound as the first parameter by
         * EventEmitterConstruct on load depending on it's
         * `bindEmitterParameter` property, or ListenerBlock's override of the
         * same name.
         * @type {listener}
         * @abstract
         */
        this.listener = data.listener;
    }
}
