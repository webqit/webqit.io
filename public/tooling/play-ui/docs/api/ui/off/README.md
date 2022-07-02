---
desc: Unbind event or gesture handlers previously bound to an element using on().
---
# `.off()`

This method is used to unbind event or gesture handlers previously bound to an element using [`.on()`](../on).

## Syntax

```js
// Unbind all listeners bound to the following event name
// regardless of the event handler
$(el).off(eventName);

// Unbind the listener bound with the following event handler  
$(el).off(eventName, originalHandler);

// Unbind the listener bound with the following event handler and tag 
$(el).off(eventName, originalHandler, {tags:[...originalTags]});

// Unbind the listener bound with the following tag 
// regardless of the event handler
$(el).off(eventName, null, {tags:[...originalTags]});
```

**Parameters**

+ **`eventName`**: **`String`** - The event or gesture name.
+ **`originalHandler`**: **`Function`** - The handler function originally used with [`.on()`](../on).
+ **`params`**: **`Object`** - Additional parameters.

**Return**

+ **`this`** - The Play UI instance.

### Usage

Unbind a specific listener bound to *doubletap*.

```js
$(document.body).off('doubletap', originalHandler);
```

Unbind all listeners bound to *doubletap*.

```js
$(document.body).off('doubletap');
```

------

## Matching By Tags

The `params.tags` parameter can be used to match listeners that were [tagged](../on#tagging-a-listener) by the [`.on()`](../on) method.

```js
$(el).off(eventName, originalHandler, {tags:['#tag']});
```

------

## Static Usage

The `.off()` instance method is internally based on the standalone `ui/off()` function which may be used statically.

### Import

```js
const { off } = $.ui;
```
```js
import { off } from '@webqit/playui-js/src/ui/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)
