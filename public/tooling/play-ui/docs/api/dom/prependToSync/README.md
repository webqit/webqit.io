---
desc: Prepend matched elements to target elements.
---
# `.prependToSync()`

This method is used to prepend matched elements to target elements.

The suffix *Sync* differentiates this method from its *Async* counterpart - [`.prependToAsync()`](../prependtoasync). Unlike the *Async* counterpart, this method is not promised-based.

## Syntax

```js
$(el).prependToSync(target);
```

**Parameters**

+ **`target`**: **`String|Element`** - A CSS selector of the element, or the element itself `Element`, to prepend to.

**Return**

+ **`this`** - The Play UI instance.

## Usage

Prepend some dynamically-created nodes to document body.

```js
$('<h1>Playful people!</h1>').prependToSync(document.body);
```

Prepend an existing `div` to multiple targets. The `div` is cloned into all targets except the last target.

```js
let div = document.querySelector('div');
$(div).prependToSync('.multiple');
```

------

## Static Usage

The `.prependToSync()` instance method is internally based on the standalone `dom/prependToSync()` function which may be used statically.

### Import

```js
const { prependToSync } = $.dom;
```
```js
import { prependToSync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)