import { BlockModule } from "../structures/BlockModule.js";
import { isFunction } from "../util/misc.js";

/**
 * Callback function called when an event is emitted, as described here:
 * https://nodejs.org/dist/latest/docs/api/events.html#events_event
 *
 * The emitter can be bound as the first parameter by EventEmitterConstruct on
 * load depending it's `bindEmitterParameter` property and ListenerBlock's
 * property of the same name, with the latter taking priority over the former.
 *
 * Note that if you use an arrow function, you won't be able to use the `this`
 * keyword to access ListenerBlock#emitter, ListenerBlock#construct, etc.
 * @callback listener
 * @param {EventEmitter} [emitter] Optionally present, bound as the first
 * parameter by EventEmitterConstruct when enabled
 * @param {...*} parameters Provided by the event being emitted
 */

/**
 * @typedef {Object} ListenerData
 * @property {string} event The name of the event the listener function is for
 * @property {?boolean|null} [once] Whether the listener should only run once
 * @property {?boolean|null} [bindEmitterParameter] Whether the EventEmitterConstruct
 * should bind the emitter as the first parameter of the function. If omitted,
 * null, or undefined, construct behavior will be left unchanged.
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
class ListenerBlock extends BlockModule {
    /**
     * @param {ListenerData|string} input Either a ListenerData object, or
     * the name of the event. If using the latter, you must provide the listener
     * function as the second parameter.
     * @param {?listener} [listener] One way of providing the listener function.
     * If omitted, you must provide the listener using the ListenerData object.
     * This parameter is ignored when the listener is provided using the
     * ListenerData object.
     */
    constructor(input, listener = null) {
        super();
        const data = this.constructor.parse(input, listener);

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
         * Whether the EventEmitterConstruct should bind the emitter as the
         * first parameter of the function. If null, construct behavior will be
         * left unchanged.
         * @type {boolean|null}
         */
        this.bindEmitterParameter = data.bindEmitterParameter == null ? null : Boolean(data.bindEmitterParameter);

        /**
         * The event emitter which will emit the event, so you can access
         * the emitter using `this.emitter` inside your listener functions.
         *
         * This property is only set by the construct on load.
         * @type {?EventEmitter}
         */
        this.emitter = null;

        /**
         * The construct which manages this block, so you can access the
         * construct using `this.construct` inside your listener functions.
         *
         * This property is only set by the construct on load.
         * @type {?EventEmitterConstruct}
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

    /**
     * Parses parameters into a valid ListenerData object, throwing on issues
     *
     * Note that this function's checks aren't meant for genuine type safety,
     * but to alert users of mistakes
     * @param {ListenerData|string} input
     * @param {?listener} [listener]
     */
    static parse(input, listener) {
        let data;
        if (input) {
            if (typeof input == "string") {
                data = {
                    "event": input,
                    "listener": listener,
                };
            } else {
                data = input;
                if (!data.event || typeof data.event != "string") throw new TypeError("ListenerData#event must be a string");
                if (!data.listener) data.listener = listener;
            }
        } else {
            throw new TypeError("first parameter cannot be falsy, must be an object or string");
        }
        if (!isFunction(data.listener)) throw new TypeError("ListenerBlock must be supplied a function to use as the listener");
        return data;
    }
}

export { ListenerBlock };
