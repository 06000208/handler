/* eslint-disable no-unused-vars */
import EventEmitter from "node:events";
import { CollectionConstruct } from "./CollectionConstruct.js";

/**
 * @typedef {Object} EmitterConstructData
 * @property {?boolean} [useOnceByDefault=false] When true, EventEmitter#once()
 * will be used by default when loading listener functions. This will be ignored
 * when blocks dictate whether or not once should be used themselves (see
 * ListenerBlock#once)
 * @property {?boolean} [bindThis=false] When true, listener functions will have
 * their respective ListenerBlock objects set as their `this` keyword value.
 *
 * Normally, a listener function's `this` keyword is a reference to it's
 * respective EventEmitter instance, and for most purposes this is satisfactory,
 * but if you have extended the ListenerBlock class with properties or other
 * methods, you may wish for those to be accessible via `this` too.
 *
 * When using bindThis, the event emitter will still be accessible via
 * `this.emitter`. For information on the default `this` keyword in the context
 * of events, see https://nodejs.org/docs/latest/api/events.html#passing-arguments-and-this-to-listeners
 *
 * This will be ignored when blocks dictate whether or not their `this` keyword
 * should be set themselves (see ListenerBlock#bindThis)
 * @property {?boolean} [bindEmitterParameter=false] When true, the emitter will
 * be bound as the first parameter of listener functions.
 *
 * Note that this is a legacy feature, and that the preferred way to access the
 * emitter from a listener function is by using the `this` keyword, either
 * directly by default, or via ListenerBlock#emitter when EventEmitterConstruct#bindThis
 * or ListenerBlock#bindThis is enabled. See those options for more details.
 *
 * This will be ignored when blocks dictate whether or not the parameter should
 * be bound themselves (see ListenerBlock#bindEmitterParameter)
* @property {?EventEmitter} [emitter] One way of providing the EventEmitter
 * this construct is for. If omitted, you must provide the listener using
 * EventEmitterConstruct's second parameter.
 */

/**
 * A construct based around managing an event emitter, specifically node.js's
 * [EventEmitter](https://nodejs.org/docs/latest-v17.x/api/events.html#class-eventemitter)
 * class.
 *
 * By default, handler's block classes use the generateIdentifier function
 * for their ids. If this is undesirable, see {@link ListenerBlock} for
 * information on how to change that.
 */
export class EventEmitterConstruct extends CollectionConstruct {
    /**
     * @param {EmitterConstructData|EventEmitter|null} input An EmitterConstructData
     * object, or the EventEmitter this construct is for. If you don't use the
     * latter, you must provide the emitter inside the EmitterConstructData
     * object, or use the second parameter.
     * @param {?EventEmitter} [emitter] One way of providing the EventEmitter
     * this construct is for. This parameter is ignored when one was provided
     * another way.
     */
    constructor(input, emitter) {
        super();
        const options = input ? (input instanceof EventEmitter ? { "emitter": input } : { ...input }) : {};
        if (!options.emitter) {
            if (!emitter || emitter instanceof EventEmitter == false) throw new TypeError("an instance of EventEmitter must be supplied");
            options.emitter = emitter;
        }

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
         * By default, handler's block classes use the generateIdentifier
         * function for their ids. If this is undesirable, see
         * {@link ListenerBlock} for information on how to change that.
         * @type {Collection<string, ListenerBlock>}
         * @name EventConstruct#cache
         */

        /**
         * When true, EventEmitter#once() will be used by default when loading
         * listener functions.
         *
         * This will be ignored when blocks dictate whether or not once() should
         * be used themselves (see ListenerBlock#once)
         * @type {boolean}
         */
        this.useOnceByDefault = Boolean(options.useOnceByDefault);

        /**
         * When true, listener functions will have their respective
         * ListenerBlock instances set as their `this` keyword value.
         *
         * Normally, a listener function's `this` keyword is a reference to
         * it's respective EventEmitter instance, and for most purposes this is
         * satisfactory, but if you have extended the ListenerBlock class with
         * properties or other methods, you may wish for those to be accessible
         * via `this` too.
         *
         * When using bindThis, the event emitter will still be accessible via
         * `this.emitter`. For information on the default `this` keyword in the
         * context of events, see https://nodejs.org/docs/latest/api/events.html#passing-arguments-and-this-to-listeners
         *
         * This will be ignored when blocks dictate whether or not their `this`
         * keyword should be set themselves (see ListenerBlock#bindThis)
         * @type {boolean}
         */
        this.bindThis = Boolean(options.bindThis);

        /**
         * When true, the emitter will be bound as the first parameter of loaded
         * listener functions.
         *
         * Note that this is a legacy feature, and that the preferred way to
         * access the emitter from a listener function is by using the `this`
         * keyword, either directly by default, or via ListenerBlock#emitter
         * when EventEmitterConstruct or ListenerBlock's `bindThis` option is
         * enabled.
         *
         * This will be ignored when blocks dictate whether or not the parameter
         * should be bound themselves (see ListenerBlock#bindEmitterParameter)
         * @type {boolean}
         */
        this.bindEmitterParameter = Boolean(options.bindEmitterParameter);
    }

    /**
     * @param {ListenerBlock} block
     * @returns {boolean} Returns true upon success, false upon failure
     */
    load(block) {
        Object.defineProperty(block, "construct", { value: this });
        Object.defineProperty(block, "emitter", { value: this.emitter });
        const bindThis = block.bindThis === true || (this.bindThis && block.bindThis !== false);
        if (block.bindEmitterParameter === true || (this.bindEmitterParameter && block.bindEmitterParameter !== false)) {
            block.listener = block.listener.bind(bindThis ? block : this.emitter, this.emitter);
        } else if (bindThis) {
            block.listener = block.listener.bind(block);
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
