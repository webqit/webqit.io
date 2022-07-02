---
desc: Bind a handler to the 'cancelled' state of all animations in the timeline.
---
# `.oncancel()`

> The `timeline.oncancel()` method.

This [Timeline](..) instance method is used to bind a handler to the 'cancelled' state of all animations in the timeline.

## Syntax

```js
timeline.oncancel(callback);
```

**Parameters**

+ **`callback`**: **`function(element)`** - The function to call on *cancel*.

    **Parameters**

    + **`element`**: **`Element`** - The DOM element of the animation instance.

**Return**

+ **`this`** - The `Timeline` instance.

## Usage

Bind an *oncancel* callback to all animations.

```js
// The timeline
let timeline  = new Timeline;
// The animation instance
let animation  = new Animation(el, {opacity:0});

// Add
timeline.add(animation);

// Bind a callback
timeline.oncancel(el => {
    console.log('Animation on the ' + el.id + ' element cancelled!');
});

// Bind another callback if necessary
timeline.oncancel(el => {
    // Do something else
});

// Try cancel an animation
animation.cancel();
```
