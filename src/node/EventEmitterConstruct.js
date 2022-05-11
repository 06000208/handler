/* eslint-disable no-unused-vars */
import EventEmitter from "node:events";
import { CollectionConstruct } from "./CollectionConstruct.js";

/**
 * @typedef {Object} EmitterConstructData
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
     * @param {EmitterConstructData|EventEmitter} input An EmitterConstructData
     * object, or the EventEmitter this construct is for. If you don't use the
     * latter, you must provide the emitter inside the EmitterConstructData
     * object, or use the second parameter.
     * @param {?EventEmitter} [emitter] One way of providing the EventEmitter
     * this construct is for. This parameter is ignored when one was provided
     * another way.
     */
    constructor(input, emitter) {
        super();
        if (!input) throw new TypeError("first parameter cannot be falsy, must be an EmitterConstructData object or an instance of EventEmitter");
        let options;
        if (input instanceof EventEmitter) {
            options = { "emitter": input };
        } else {
            options = { ...input };
            if (!options.emitter) options.emitter = emitter;
        }
        if (!options.emitter) throw new TypeError("an instance of EventEmitter must be supplied");

        /**
         * The EventEmitter this construct is for
         * @name EventEmitterConstruct#emitter
         * @type {EventEmitter}
         * @readonly
         */
        Object.defineProperty(this, "emitter", { value: options.emitter });

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
        this.bindEmitterParameter = Boolean(options.bindEmitterParameter);

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
        this.useOnceByDefault = Boolean(options.useOnceByDefault);
    }

    /**
     * @param {ListenerBlock} block
     * @returns {boolean} Returns true upon success, false upon failure
     */
    load(block) {
        if (block.bindEmitterParameter === true || (this.bindEmitterParameter && block.bindEmitterParameter !== false)) {
            block.listener = block.listener.bind(block, this.emitter);
        }
        if (block.once === true || (this.useOnceByDefault && block.once !== false)) {
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
}

export { EventEmitterConstruct };
