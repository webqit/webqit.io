---
desc: Seek to a percentage point in all animations in the timeline.
---
# `.seek()`

> The `timeline.seek()` method.

This [Timeline](..) instance method is used to seek to a percentage point in all animations in the timeline.

## Syntax

```js
timeline.seek(point[, except = []]);
```

**Parameters**

+ **`point`**: **`Number`** - A number between `0` and `1`, representing 0% and 100% respectively, of an animation's total timing. Here the total timing is calculated as `delay + duration + endDelay`.
+ **`except`**: **`Array`** - An optional list of [Animation](../Animation) instances to excempt.

**Return**

+ **`this`** - The `Timeline` instance.

## Usage

Seek an animation to half its total duration.

```js
// The timeline
let timeline  = new Timeline;
// The animation instance
let animation  = new Animation(el, {opacity:0});

// Add
timeline.add(animation);

// Seek the timeline to half its total duration
timeline.seek(0.5);
```
