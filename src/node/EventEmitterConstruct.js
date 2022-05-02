/* eslint-disable no-unused-vars */
import EventEmitter from "node:events";
import { CollectionConstruct } from "./CollectionConstruct.js";

/**
 * @typedef {Object} EventEmitterData
 * @property {?boolean} [useOnceByDefault=false] When true, EventEmitter#once()
 * will be used by default when loading listener functions. This will be ignored
 * when blocks dictate whether or not once should be used themselves (see
 * ListenerBlock#once)
 * @property {?boolean} [bindEmitterParameter=false] When true, the emitter will
 * be bound as the first parameter of listener functions. This will be ignored
 * when blocks dictate whether or not the parameter should be bound themselves
 * (see ListenerBlock#bindEmitterParameter)
 * @property {?EventEmitter} [emitter] One way of providing the EventEmitter
 * this construct is for. If omitted, you must provide the listener using
 * EventEmitterConstruct's second parameter.
 */

/**
 * A construct based around managing an event emitter, specifically node.js's
 * [EventEmitter](https://nodejs.org/docs/latest-v17.x/api/events.html#class-eventemitter)
 * class.
 *
 * By default, handler's block classes use handler's generateIdentifier function
 * for their ids. If this is undesirable, see {@link ListenerBlock} for
 * information on how to change that.
 */
class EventEmitterConstruct extends CollectionConstruct {
    /**
     * @param {EventEmitterData|EventEmitter} input An EventEmitterData object,
     * or the EventEmitter this construct is for. If you don't use the latter,
     * you must provide the emitter inside the EventEmitterData object, or use
     * the second parameter.
     * @param {?EventEmitter} [emitter] One way of providing the EventEmitter
     * this construct is for. This parameter is ignored when one was provided
     * another way.
     */
    constructor(input, emitter = null) {
        super();
        const data = this.constructor.parse(input, emitter);

        /**
         * The EventEmitter this construct is for
         * @name EventEmitterConstruct#emitter
         * @type {EventEmitter}
         * @readonly
         */
        Object.defineProperty(this, "emitter", { value: data.emitter });

        /**
         * Cached ListenerBlocks mapped by their ids.
         *
         * By default, handler's block classes use handler's generateIdentifier
         * function for their ids. If this is undesirable, see
         * {@link ListenerBlock} for information on how to change that.
         * @type {Collection<string, ListenerBlock>}
         * @name EventConstruct#cache
         */

        /**
         * When true, the emitter will be bound as the first parameter of loaded
         * listener functions.
         *
         * This is by default false, as the preferred way to access the emitter
         * from a listener function is by using `this` to access
         * ListenerBlock#emitter.
         *
         * This will be ignored when blocks dictate whether or not the
         * parameter should be bound themselves (see
         * ListenerBlock#bindEmitterParameter)
         * @type {boolean}
         */
        this.bindEmitterParameter = Boolean(data.bindEmitterParameter);

        /**
         * When true, EventEmitter#once() will be used by default when loading
         * listener functions.
         *
         * This is by default false, as most of the time, you will want your
         * listener functions to be loaded with EventEmitter#on()
         *
         * This will be ignored when blocks dictate whether or not once() should
         * be used themselves (see ListenerBlock#once)
         * @type {boolean}
         */
        this.useOnceByDefault = Boolean(data.useOnceByDefault);
    }

    /**
     * @param {ListenerBlock} block
     * @returns {boolean} Returns true upon success, false upon failure
     */
    load(block) {
        if (block.bindEmitterParameter === true || (block.bindEmitterParameter !== false && this.bindEmitterParameter)) {
            block.listener = block.listener.bind(block, this.emitter);
        }
        if (block.once === true || (block.once !== false && this.useOnceByDefault)) {
            this.emitter.once(block.event, block.listener);
        } else {
            this.emitter.on(block.event, block.listener);
        }
        return super.load(block);
    }

    /**
     * @param {ListenerBLock} block
     * @returns {boolean} Returns true upon success, false upon failure
     */
    unload(block) {
        if (this.emitter.listeners(block.event).includes(block.listener)) {
            this.emitter.removeListener(block.event, block.listener);
        }
        return super.unload(block);
    }

    /**
     * Parses parameters into a valid EventEmitterData object, throwing on
     * issues
     *
     * Note that this function's checks aren't meant for genuine type safety,
     * but to detect and throw in inoperable circumstances
     * @param {EventEmitterData|EventEmitter} input
     * @param {?EventEmitter} [emitter]
     */
    static parse(input, emitter) {
        let data;
        if (input) {
            if (input instanceof EventEmitter) {
                data = { "emitter": input };
            } else {
                data = input;
                if (!data.emitter) data.emitter = emitter;
            }
        } else {
            throw new TypeError("first parameter cannot be falsy, must be an EventEmitterData object or an instance of EventEmitter");
        }
        if (!data.emitter || !(data.emitter instanceof EventEmitter)) throw new TypeError("EventEmitterConstruct must be supplied an instance of EventEmitter");
        return data;
    }
}

export { EventEmitterConstruct };
