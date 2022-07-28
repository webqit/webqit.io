---
desc: Add an animation to the timeline.
---
# `.add()`

> The `timeline.add()` method.

This [Timeline](..) instance method is used to add an [Animation](../Animation) to the timeline.

## Syntax

```js
timeline.add(animation);
```

**Return**

+ **`this`** - The `Timeline` instance.

## Usage

Obtain a timeline instance and call `.add()`.

```js
// The timeline
let timeline  = new Timeline;
// The animation instance
let animation  = new Animation(el, {opacity:0});

// Add
timeline.add(animation);
```
