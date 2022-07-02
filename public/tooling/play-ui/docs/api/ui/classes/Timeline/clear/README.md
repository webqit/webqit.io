---
desc: Cancel all animations from off the timeline.
---
# `.clear()`

> The `timeline.clear()` method.

This [Timeline](..) instance method is used to clear all animations from off the timeline.

## Syntax

```js
timeline.clear(except = []);
```

**Parameters**

+ **`except`**: **`Array`** - An optional list of [Animation](../Animation) instances to excempt.

**Return**

+ **`this`** - The `Timeline` instance.

## Usage

Obtain an instance of an ongoing animation and call `.clear()`.

```js
timeline.clear();
```