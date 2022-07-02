---
desc: Finish all animations in the timeline.
---
# `.finish()`

> The `timeline.finish()` method.

This [Timeline](..) instance method is used to finish all animations in the timeline. If there are *onfinish* handlers, they are called. [Animation](../Animation) instances added after this call are finished immediately.

## Syntax

```js
timeline.finish(except = []);
```

**Parameters**

+ **`except`**: **`Array`** - An optional list of [Animation](../Animation) instances to excempt.

**Return**

+ **`this`** - The `Timeline` instance.

## Usage

Obtain an instance of an ongoing animation and call `.finish()`.

```js
timeline.finish();
```
