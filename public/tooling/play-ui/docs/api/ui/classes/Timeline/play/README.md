---
desc: Play all animations in the timeline.
---
# `.play()`

> The `timeline.play()` method.

This [Timeline](..) instance method is used to play all animations in the timeline. [Animation](../Animation) instances added after this call are played immediately. This method is promise-based. The promise resolves at the time the animation with the highest timing completes. An animation's total timing withing the timeline could, in addition to its *delay*, *duration*, *endDelay* parameters, be affected by a direct play/play call, or its relative time of entering the timeline.

## Syntax

```js
await timeline.play();
```

**Return**

+ **`this`** - The `Timeline` instance.

## Usage

Obtain an instance of an ongoing animation and call `.play()`.

```js
let timeline = new Timeline;
timeline.play().then(() => {
    console.log('The end!');
});

// Duration: 600ms
timeline.add(new Animation(el1, {opacity:0}, {duration: 600}));
setTimeout(() => {
    // Duration: 600ms. But htis will finish in 900ms
    timeline.add(new Animation(el2, {opacity:0}, {duration: 600}));
}, 300);
```
