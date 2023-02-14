# handler

Extendable javascript handlers for objects, events, and modules. Includes some extra utilities.

The handler-related code is only useful for specific purposes. Don't force code patterns where it doesn't make any sense.

This is a work in progress, indicated by using major version 0.

## Planned

- [ ] Documentation
- [ ] Working vscode intellisense based on typescript types for all forms of importing the module (esm import, cjs require, package.json subpaths)
- [ ] Making EventEmitterConstruct and ListenerBlock platform independent, so that it may be used with polyfills the same as the node.js EventEmitter module
- [ ] Browser counterpart to event handling based on [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
- [ ] Feature complete module handling across cjs and esm through Loader classes
