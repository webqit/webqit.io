---
desc: Bind a handler to the 'finished' state of an animation.
---
# `.onfinish()`

> The `animation.onfinish()` method.

This [Animation](..) instance method is used to bind a handler to the 'finished' state of an animation.

## Syntax

```js
animation.onfinish(callback);
```

**Parameters**

+ **`callback`**: **`function(element)`** - The function to call on *finish*.

    **Parameters**

    + **`element`**: **`Element`** - The DOM element of the animation instance.

**Return**

+ **`this`** - The `Animation` instance.

## Usage

Bind an *onfinish* callback to an animation.

```js
// Obtain an Animation instance
let animation = new Animation(el, {opacity: 0});

// Bind a callback
animation.onfinish(el => {
    console.log('Animation on the ' + el.id + ' element finished!');
});

// Bind another callback if necessary
animation.onfinish(el => {
    // Do something else
});
```