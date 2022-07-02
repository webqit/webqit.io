---
title: UIRect
desc: The UIRect class.
---
# `class UIRect {}`

Instances of this class represent the rendered rectangle of an element in the UI. And a good amount of transformation to this *rect* is possible.

## Constructor

```js
let rect = new UIRectect(props[, params = {}]);
```

**Parameters**

+ **`props`**: **`Object`** - Properties with to initalize the instance. These props are set as *readonly* properties of the instance. Standard properties are: `left`, `top`, `bottom`, `right`, `width`, `height`. Any additional properties are defined as *[non-enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#description)* on the instance.
+ **`params`**: **`Object`** - The directives used during calculation of the given props.

## Properties

+ **`rect.params`**: **`Object`** - (Readonly) The original `params` object passed to the constructor.
+ **`rect.offset`**: **`Object`** - (Readonly) A hash of the instance's `.left` and `.top` properties.
+ **`rect.size`**: **`Object`** - (Readonly) A hash of the instance's `.width` and `.height` properties.
+ **`rect[prop]`**: **`Any`** - (Readonly) Any other property (`prop`) in the original `props` object passed to the constructor.

## Static Methods

### UIRect.calculate(element[, params = {}])

**Parameters**

+ **`element`**: **`Element`** - A DOM element.
+ **`params`**: **`Object`** - Directives for the method.
    + **`offsetOrigin`**: **`Any`** - This directive is used to specify the offset origin from which to calculate the *top/left* distances of the rendered rectangle for the element. Three origins can be used:
        `client` - offsets are calculated from the *top/left* origins of the screen. This is the default offset origin.
        `page` - offsets are calculated from the *top/left* origins of the page. Specify this origin by setting this directive to the keyword `page` or `document`, or to the *document* object.
        `offset` - offsets are calculated from the *top/left* origins of the element's *[offset parent](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent)*. Specify this origin by setting this directive to `true` or the keyword `offset`, or to an instance of the element to use as origin (must be an ancestor of the subject element).

**Return**

`UIRect` - An instance of *UIRect*.

## Instance Methods

### `rect.intersectionWith()`
### `rect.unionWith()`

### `rect.angleWith()`
### `rect.proximityWith()`

### `rect.rotationTo()`
### `rect.scaleTo()`
### `rect.translationTo()`
