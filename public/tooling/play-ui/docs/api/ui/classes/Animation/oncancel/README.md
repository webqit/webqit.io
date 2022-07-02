---
desc: Bind a handler to the 'cancelled' state of an animation.
---
# `.oncancel()`

> The `animation.oncancel()` method.

This [Animation](..) instance method is used to bind a handler to the 'cancelled' state of an animation.

## Syntax

```js
animation.oncancel(callback);
```

**Parameters**

+ **`callback`**: **`function(element)`** - The function to call on *cancel*.

    **Parameters**

    + **`element`**: **`Element`** - The DOM element of the animation instance.

**Return**

+ **`this`** - The `Animation` instance.

## Usage

Bind an *oncancel* callback to an animation.

```js
// Obtain an Animation instance
let animation = new Animation(el, {opacity: 0});

// Bind a callback
animation.oncancel(el => {
    console.log('Animation on the ' + el.id + ' element cancelled!');
});

// Bind another callback if necessary
animation.oncancel(el => {
    // Do something else
});
```