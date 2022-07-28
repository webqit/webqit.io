---
desc: Cancel all animations in the timeline.
---
# `.cancel()`

> The `timeline.cancel()` method.

This [Timeline](..) instance method is used to cancel all animations in the timeline. If there are *oncancel* handlers, they are called. [Animation](../Animation) instances added after this call are canclled immediately.

## Syntax

```js
timeline.cancel(except = []);
```

**Parameters**

+ **`except`**: **`Array`** - An optional list of [Animation](../Animation) instances to excempt.

**Return**

+ **`this`** - The `Timeline` instance.

## Usage

Obtain an instance of an ongoing animation and call `.cancel()`.

```js
timeline.cancel();
```
