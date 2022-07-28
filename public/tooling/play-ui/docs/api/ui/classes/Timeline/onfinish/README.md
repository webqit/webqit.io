---
desc: Bind a handler to the 'finished' state of all animations in the timeline.
---
# `.onfinish()`

> The `timeline.onfinish()` method.

This [Timeline](..) instance method is used to bind a handler to the 'finished' state of all animations in the timeline.

## Syntax

```js
timeline.onfinish(callback);
```

**Parameters**

+ **`callback`**: **`function(element)`** - The function to call on *finish*.

    **Parameters**

    + **`element`**: **`Element`** - The DOM element of the animation instance.

**Return**

+ **`this`** - The `Timeline` instance.

## Usage

Bind an *onfinish* callback to all animations.

```js
// The timeline
let timeline  = new Timeline;
// The animation instance
let animation  = new Animation(el, {opacity:0});

// Add
timeline.add(animation);

// Bind a callback
timeline.onfinish(el => {
    console.log('Animation on the ' + el.id + ' element finished!');
});

// Bind another callback if necessary
timeline.onfinish(el => {
    // Do something else
});

// Try finish an animation
animation.finish();
```
