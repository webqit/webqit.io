---
title: Event
desc: The Event class.
---
# `class Event {}`

Instances of this class represent a mutation event. They are internally created by mutators ([`Observer.set()`](../../actions/set), [`Observer.defineProperty()`](../../actions/defineProperty), and [`Observer.deleteProperty()`](../../actions/deleteProperty)) and passed to [observers](../../reactions/observe).

## Constructor

```js
let event = new Event(target[, cancellable = false]);
```

**Parameters**

+ **`target`**: **`Object|Array`** - An Object or Array - the event target.
+ **`cancellable`**: **`Boolean`** - A flag that specifies if the event can be *cancelled*.

## Properties

+ **`event.target`**: **`Object|Array`** - (Readonly) Returns the target object or array passed to the constructor.
+ **`event.cancellable`**: **`Boolean`** - (Readonly) Returns the original `details.cancellable` flag passed to the constructor.
+ **`event.defaultPrevented`**: **`Boolean`** - (Readonly) Tells if the instance's `.preventDefault()` method has been called.
+ **`event.propagationStopped`**: **`Boolean`** - (Readonly) Tells if the instance's `.stopPropagation()` method has been called.
+ **`event.promises`**: **`null|Promise`** - (Readonly) Returns a *Promise* that consolidates all promises assigned by the event handlers using the instance's `.waitUntil()` method. Returns `null` if no Promises have been received.

*The above instance properties are designed to be used by operators to honour [Negotiating With Operators](#negotiating-with-operators).*

## Instance Methods

+ `event.stopPropagation()`
+ `event.preventDefault()`
+ `event.waitUntil()`
+ `event.respondWith()`

*The above instance methods are designed to be used by observers to [Negotiating With Operators](#negotiating-with-operators).*

## Negotiating With Operators

Observers may negotiate with the initiator of an operation by calling an appropriate method on the `Event` object they recieve on their second parameter, or by returning an equivalent return value. The initiator of the operation may obtain the `Event` object to honour the response.

**`event.stopPropagation()`:** Calling this method stops further processing of the operation, that is, stops the event from reaching other event handlers, and prevents the initiator of the operation from taking any default action that it normally would take after the operation. Returning `false` from the handler has the same effect. 

```js
Observer.observe(obj, propertyName, (mutation, event) => {
    event.stopPropagation();
    // Or event.respondWith(false);
    // Or, return false;
});
```

The initiator of the operation would need to have flagged the event as *cancellable* for the above to be honoured. (Learn more about `params.cancellable` at [OperatorParams](../OperatorParams).)

```js
Observer.deleteProperty(obj, propertyName, {
    cancellable: true,
});
```

The initiator may also obtain the `Event` object to determine the state of the event. Notice the `params.eventTypeReturn` parameter below that tells `Observer.deleteProperty()` to return the `Event` object for use. (Learn more about `params.eventTypeReturn` at [OperatorParams](../OperatorParams).)

```js
let event = Observer.deleteProperty(obj, propertyName, {
    cancellable: true,
    eventTypeReturn: true,
});
```

*Now, it determines the state of the event:*

```js
// Determine event state...
if (event.propagationStopped) {
}
```

**`event.preventDefault()`:** Calling this method prevents the initiator of the operation from taking any default action that it normally would take after the current type of operation. Returning `false` from the handler has the same effect. (The event still reaches other handlers.)

```js
Observer.observe(obj, propertyName, (mutation, event) => {
    event.preventDefault();
    // Or event.respondWith(false);
    // Or, return false;
});
```

The initiator of the operation may obtain the `Event` object to determine the state of the event.

```js
// Determine event state...
if (event.defaultPrevented) {
}
```

**event.waitUntil(promise)** Calling this method tells the initiator of the operation to wait until a *Promise* is resolved before continuing with further operations. Returning a `Promise` from the handler has the same effect. (The event still reaches other handlers without waiting.)

```js
Observer.observe(obj, propertyName, (mutation, event) => {
    let promise = new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
    event.waitUntil(promise);
    // Or event.respondWith(promise);
    // Or, return promise;
});
```

The initiator of the operation may obtain the `Event` object to determine the state of the event. The state of the event's `.promises` property becomes a promise where one or more handlers responded with a promise.

```js
// Determine event state...
if (event.promises) {
    event.promises.then(() => {
    });
}
```
