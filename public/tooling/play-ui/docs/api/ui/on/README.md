---
desc: Bind event or gesture handlers to an element.
---
# `.on()`

This method is used to bind event or gesture handlers to an element. This works like the native [`EventTarget.addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) function but adds support for user gestures and custom event implementation.

## Syntax

```js
let listener = $(el).on(eventName, handler[, params = {}]);
```

**Parameters**

+ **`eventName`**: **`String`** - The event or gesture name.
+ **`handler`**: **`function(event)`** - The handler function.

    **Parameters**

    + **`event`**: **`Object`** - An [Event](../classes/Event) object.

+ **`params`**: **`Object`** - Additional parameters.

**Return**

+ **`listener`**: **`Listener`** - An instance of [Listener](../classes/Listener).

## Usage

Handle gesture events.

```js
$(document.body).on('doubletap', event => {
    console.log('You doubletapped me!', event.details);
});
```

Try using the [`trigger()`](../trigger) method to fire the event.

```js
// Trigger
$(document.body).trigger('doubletap');
// And we can add details
$(document.body).trigger('doubletap', {time:0});
```

------

## Tagging a Listener

The `params.tags` parameter can be used to tag a listener. Tags are an *array* of values (*strings*, *numbers*, *objects*, etc) that can be associated with the *listener* for later use. See tags in action using the [`.off()`](../off#matching-by-tags) method.

```js
let listener = $(el).on(eventName, handler, {tags:['#tag']});
```

Programmatically manipulate the returned *listener* object.

```js
// Synthetically trigger the listener
listener.fire({
    type: 'doubletap',
});

// Disconnect the listener
listener.disconnect();
```

## Gestures

PlayUI uses the [Hammer.js](https://hammerjs.github.io/) gesture library to support the following gestures out of the box. For details of these gestures, see the _Hammer.js_ documentation.

* **press**: press, pressup
* **rotate**: rotate, rotatestart, rotatemove, rotateend, rotatecancel
* **pinch**: pinch, pinchstart, pinchmove, pinchend, pinchcancel, pinchin, pinchout
* **pan**: pan, panstart, panmove, panend, pancancel, panleft, panright, panup, pandown
* **swipe**: swipe, swipeleft, swiperight, swipeup, swipedown
* **tap**: tap, \(by custom extension: tripletap, doubletap, singletap\)

Be sure to include Hammer.js on your page before trying to observe gestures.

------

## Static Usage

The `.on()` instance method is internally based on the standalone `ui/on()` function which may be used statically.

### Import

```js
const { on } = $.ui;
```
```js
import { on } from '@webqit/playui-js/src/ui/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)
