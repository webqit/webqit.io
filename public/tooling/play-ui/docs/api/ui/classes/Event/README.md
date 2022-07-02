---
title: Event
desc: The Event class.
---
# `class Event {}`

Instances of this class represent a DOM event or user gesture event.

## Constructor

```js
let event = new Event(target, e);
```

**Parameters**

+ **`target`**: **`Element`** - The DOM element on which the event happend.
+ **`e`**: **`Event`** - The origin event object that this class will wrap. This is either a [native browser event object](https://developer.mozilla.org/en-US/docs/Web/API/Event) or a [Hammer.js event object](https://hammerjs.github.io/api/#event-object) describing a gesture event.

## Properties

+ **`event.type`**: **`String`** - (Readonly) Returns the type of the origin event passed to the constructor.
+ **`event.target`**: **`Element`** - (Readonly) Returns the target element passed to the constructor.
+ **`event.defaultPrevented`**: **`Boolean`** - (Readonly) Tells if the instance's `.preventDefault()` method has been called.
+ **`event.propagationStopped`**: **`Boolean`** - (Readonly) Tells if the instance's `.stopPropagation()` method has been called.
+ **`event.promises`**: **`null|Promise`** - (Readonly) Returns a *Promise* that consolidates all promises assigned by the event handlers using the instance's `.promise()` method. Returns `null` if no Promise has been received.
+ **`event.e`**: **`Event`** - (Readonly) Returns the origin event object passed to the constructor.

## Instance Methods

### `event.preventDefault()`
### `event.stopPropagation()`
### `event.promise()`
### `event.response()`
