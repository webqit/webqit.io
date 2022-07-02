---
desc: Get the percentage progress of an animation.
---
# `.progress()`

> The `animation.progress()` method.

This [Animation](..) instance method is used to get the percentage progress of an animation.

## Syntax

```js
let progress = animation.progress();
```

**Return**

+ **`progress`**: **`Number`** - A number between `0` and `1`, representing 0% and 100% respectively, of the animation's total timing. Here the total timing is calculated as `delay + duration + endDelay`.

## Usage

Get the progress of an animation at 350ms.

```js
let animation = new Animation(el, [{
    opacity:1,
}, {
    opacity:0,
}], {
    delay: 100, 
    duration:600,
});

setTimeout(() => {
    console.log(animation.progress()); // About 0.5
}, 350);
```