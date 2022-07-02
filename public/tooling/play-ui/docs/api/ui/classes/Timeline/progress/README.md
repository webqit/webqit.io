---
desc: Get the average percentage progress of all animations in the timeline.
---
# `.progress()`

> The `timeline.progress()` method.

This [Animation](..) instance method is used to get the average percentage progress of all animations in the timeline.

## Syntax

```js
let progress = timeline.progress();
```

**Return**

+ **`progress`**: **`Number`** - A number between `0` and `1`, representing 0% and 100% respectively, of the timeline's calculated timing.

## Usage

Get the progress of an timeline at 450ms.

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

// Total duration of timeline: 900ms
// Get the progress of an animation at 450ms.
setTimeout(() => {
    console.log(timeline.progress()); // About 0.5
}, 450);
```
