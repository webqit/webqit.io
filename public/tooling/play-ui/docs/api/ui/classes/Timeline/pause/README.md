---
desc: Pause all animations in the timeline.
---
# `.pause()`

> The `timeline.pause()` method.

This [Timeline](..) instance method is used to pause all animations in the timeline. [Animation](../Animation) instances added after this call are paused immediately.

## Syntax

```js
timeline.pause(except = []);
```

**Parameters**

+ **`except`**: **`Array`** - An optional list of [Animation](../Animation) instances to excempt.

**Return**

+ **`this`** - The `Timeline` instance.

## Usage

Obtain an instance of an ongoing animation and call `.pause()`.

```js
timeline.pause();
```
