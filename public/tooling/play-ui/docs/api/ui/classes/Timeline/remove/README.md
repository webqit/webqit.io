---
desc: Remove an animation from the timeline.
---
# `.remove()`

> The `timeline.remove()` method.

This [Timeline](..) instance method is used to remove an [Animation](../Animation) from the timeline.

## Syntax

```js
timeline.remove(animation);
```

**Return**

+ **`this`** - The `Timeline` instance.

## Usage

Obtain a timeline instance and call `.remove()`.

```js
// The timeline
let timeline  = new Timeline;
// The animation instance
let animation  = new Animation(el, {opacity:0});

// Add
timeline.add(animation);

// Then remove
timeline.remove(animation);
```
