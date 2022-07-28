---
desc: Bind a handler to the 'ready' state of an animation.
---
# `.ready()`

> The `animation.ready()` method.

This [Animation](..) instance method is used to bind a handler to the 'ready' state of an animation. This is useful as there are cases where the animation is created asynchronously.

## Syntax

```js
animation.ready(readyCallback[, failureCallback = null]);
```

**Parameters**

+ `readyCallback`: `function(waapi, timing, firstFrame, lastFrame)`: The function to call on ready.

    **Parameters**

    + **`waapi`**: **`Animation`** - The underlying WAAPI `Animation` instance.
    + **`timing`**: **`Object`** - The instance's timing object.
    + **`firstFrame`**: **`Object`** - The animation's *firstFrame* object. Especially useful where this has to be automatically derived by Ani.
    + **`lastFrame`**: **`Object`** - The animation's *lastFrame* object. Especially useful where this has to be automatically resolved by Ani.

+ **`failureCallback`**: **`function(errorMsg)`** - A function to call on fatal errors preventing the creation of the animation.

    **Parameters**

    + **`errorMsg`**: **`String`** - The description of the error.


**Return**

+ **`this`** - The `Animation` instance.

## Usage

Bind a *ready* callback to an animation.

```js
// Obtain an Ani instance and call ready()
let animation = new Animation(el, {
    width: 'auto',
});

aanimationni.ready((waapi, timing, firstFrame, lastFrame) => {
    // Show the two keyframes
    console.log(firstFrame, lastFrame);
});
```