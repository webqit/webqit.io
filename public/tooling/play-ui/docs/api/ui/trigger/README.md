---
desc: Trigger event or gesture handlers previously bound to an element using on().
---
# `.trigger()`

This method is used to trigger event or gesture handlers previously bound to an element using [`.on()`](../on).

## Syntax

```js
let event = $(el).trigger(eventName[, details = {}]);
```

**Parameters**

+ **`eventName`**: **`String`** - The event or gesture name.
+ **`details`**: **`Object`** - Custom data to pass to the fired event handlers.

**Return**

+ **`event`**: **`Event`** - An instance of [Event](../classes/Event).

### Usage

Programmatically fire gesture handlers.

```js
let event = $(document.body).trigger('doubletap', {time:0});
```

Inspect the returned *event* object to see how the fired listeners responded to the event.

```js
if (event.defaultPrevented) {
    // event.preventDefault() has been called by a handler
    // Or a handler returned false
} else if (event.propagationStopped) {
    // event.stopPropagation() has been called by a handler
    // Or a handler returned false
} else if (event.promises) {
    // event.promise() has been called by a handler
    // Or a handler returned a promise
    event.promises.then(() => {
    // When all promises resolve
    }).catch(() => {
    // When any of the promises fail
    });
}
```

------

## Static Usage

The `.trigger()` instance method is internally based on the standalone `ui/trigger()` function which may be used statically.

### Import

```js
const { trigger } = $.ui;
```
```js
import { trigger } from '@webqit/playui-js/src/ui/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)
