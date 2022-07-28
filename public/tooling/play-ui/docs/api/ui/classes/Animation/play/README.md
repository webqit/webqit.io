---
desc: Play an animation.
---
# `.play()`

> The `animation.play()` method.

This [Animation](..) instance method is used to play an animation. This method is promised-based.

## Syntax

```js
await animation.play();
```

**Return**

+ **`this`** - The `Animation` instance.

## Usage

Obtain an instance of an ongoing animation and call `.play()`.

```js
let animation = new Animation(el, [{
    opacity:1,
}, {
    opacity:0,
}], {
    duration:600
});

animation.play().then(animation => {
    console.log('The end!');

    // Call other methods
    animation.reverse();
});
```