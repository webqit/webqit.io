---
titlw: Timeline
desc: The Timeline class.
---
# Timeline

This class provides a convenient way to control multiple [Animation](../Animation) instances.

## Constructor

```js
let timeline = new Timeline(animations[, params = {}]);
```

**Parameters**

+ **`animations`**: **`Array`** - Zero or more [Animation](../Animation) instances.
+ **`params`**: **`Object`** - A few parameters for the timeline. (Currently none).

## Usage

Play/pause multiple animations in one call.

```js
let ani1 = new Animation(el1, [{opacity:1}, {opacity:0}], {duration:600});
let ani2 = new Animation(el2, [{width:0}, {width:100}], {duration:900});

let timeline = new Timeline([ani1, ani2]);
timeline.pause();
setTimeout(() => {
   timeline.play().then(() => {
        console.log('The end; all animations!');
    });
}, 1000);
```

## Features

+ **Runtime manipulation of timeline.** *Timeline* allows you to add/remove animation instances at runtime without altering coordination and synchronization.

    ```js
    // Fade out from current opacity level
    let timeline = new Timeline([ani1, ani2]);

    // Kick off
    timeline.play().then(() => {
        console.log('The end; all animations!');
    });

    // On the fly
    timeline.add(ani3);
    timeline.remove(ani1);
    // Yet, our play.then() will work as expected
    ```

## Methods

Explore the instance methods of this class.