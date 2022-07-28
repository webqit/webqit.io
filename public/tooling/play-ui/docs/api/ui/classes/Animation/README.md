---
title: Animation
desc: The Animation class.
---
# `class Animation {}`

This class provides an intuitive way to use the native [Web Animations API (WAAPI)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

## Constructor

```js
let animation = new Animation(element, effect[, timing = {}]);
```

**Parameters**

+ **`element`**: **`Element`** - A DOM element.
+ **`effect`**: **`Array|Object|String`** - The effect to play. This could be a standard keyframes array, a CSS rules object, or a stylesheet-based animation name.
+ **`timing`**: **`Object`** - Options for the animation.
    + **`duration`**: **`Number`** - The animation's duration in milliseconds.
    + **`fill`**: **`String`** - The element's final state on finish; one of `none` (default), `forwards`, `both`.
    + **`delay`**: **`Number`** - The animation's delay in milliseconds before playing.
    + **`endDelay`**: **`Number`** - The animation's delay in milliseconds after playing.
    + **`direction`**: **`String`** - The animation's direction; one of `normal` (default), `reverse`, `alternate`, `alternate-reverse`.
    + **`easing`**: **`String`** - The rate of the animation's change over time; one of `linear` (default), `ease`, `ease-in`, `ease-out`, `ease-in-out`, or a custom `cubic-bezier` value like `cubic-bezier(0.42, 0, 0.58, 1)`.
    + **`iterations`**: **`Number`** - The number of times the animation should repeat.
    + **`iterationStart`**: **`Number`** - At what point in the iteration the animation should start.
    + **`cancelForCss`**: **`Boolean`** - (Specific to this class) Whether or not to cancel the animation on finish for subsequent CSS rules on the element to take effect. By default, properties animated with WAAPI cannot be modified with CSS. Setting `cancelForCss` to `true` fixes it. 

## Usage

Create and play an animation.

```js
let el = document.querySelector('#el');
let animation = new Animation(el, [{opacity:1}, {opacity:0}], {duration:600});

animation.play().then(el => {
    console.log('The end!');
});
```

## Features

*Animation* provides the following rich set of features over WAAPI:

+ **Support for single-frame keyframes.** *Animation* will automatically derive the animation's first frame from the element's current state.

    ```js
    // Fade out from current opacity level
    let animation = new Animation(el, {opacity: 0}, timing);
    ```

+ **Support for CSS keyframes.** *Animation* can play animations defined in the document's stylesheets. Just mention an animation name.

    ```html
    <style>

    @keyframes fadeout {
    0% { opacity: 1;}
    100% { opacity: 0;}
    }

    </style>
    ```
    ```js
    // Play the animation from stylesheet
    let animation = new Animation(el, 'fadeout', timing);
    ```

+ **Support for *auto* height and width.** *Animation* accepts and automacally computes the keyword *auto* for the width and height properties.

    ```html
    <div style="width:0px"></div>
    ```
    ```js
    // Expand to the element's real size at "auto"
    let animation = new Animation(el, {width: 'auto'}, timing);
    ```

+ **Automatic units for unit-based CSS properties.** *Animation* will automacally suffix numeric values with `px` for properties like `top` that don't go without units.

    ```js
    // Help add "px" to the value for width
    let animation = new Animation(el, {width: 50}, timing);
    ```

+ **Support for shortform rules.** *Animation* will accept an object or array for the following shortforms: inset, margin, padding.

    ```js
    // Destructure the following object into their individual properties
    let animation = new Animation(el, {inset: {top: 50, left: 100}}, timing);
    // Here we actually mean 
    let animation = new Animation(el, {top: 50, left: 100}, timing);
    // ---------------
    // Destructure the following array into their individual properties
    let animation = new Animation(el, {inset: [50, 100, 75, 125,]}, timing);
    // Here we actually mean 
    let animation = new Animation(el, {top: 50, right: 100, bottom: 75, left: 125}, timing);
    // All shortforms go in this order: top, right, bottom, left
    ```

+ **Sensible default timing parameters.** *Animation* will automatically create sensible values for the animation timing where not defined.

    ```js
    // The timing object has the following defaults
    {
        duration: 400,
        fill: 'both',
    }
    ```

+ **Other usefull methods.** See below.

## Methods

Explore the instance methods of this class.