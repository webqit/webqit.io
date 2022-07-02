---
desc: Seek to a percentage point in animation.
---
# `.seek()`

> The `animation.seek()` method.

This [Animation](..) instance method is used to seek to a percentage point in an animation.

## Syntax

```js
animation.seek(point);
```

**Parameters**

+ **`point`**: **`Number`** - A number between `0` and `1`, representing 0% and 100% respectively, of the animation's total timing. Here the total timing is calculated as `delay + duration + endDelay`.

**Return**

+ **`this`** - The `Animation` instance.

## Usage

Seek an animation to half its total duration.

```js
let animation = new Animation(el, [{
    opacity:1,
}, {
    opacity:0,
}], {
    delay: 100, 
    duration:600,
});

// Seek the animation to 350ms
animation.seek(0.5);
```