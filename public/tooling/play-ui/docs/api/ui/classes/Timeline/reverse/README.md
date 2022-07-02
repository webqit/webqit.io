---
desc: Reverse all animations in the timeline.
---
# `.reverse()`

> The `timeline.reverse()` method.

This [Timeline](..) instance method is used to reverse all animations in the timeline. [Animation](../Animation) instances added after this call are reversed immediately. But where the last call to `timeline.reverse()` restores the timeline to its original direction, [Animation](../Animation) instances added are left as-is.

## Syntax

```js
timeline.reverse(except = []);
```

**Parameters**

+ **`except`**: **`Array`** - An optional list of [Animation](../Animation) instances to excempt.

**Return**

+ **`this`** - The `Timeline` instance.

## Usage

Obtain an instance of an ongoing animation and call `.reverse()`.

```js
timeline.reverse();
```
