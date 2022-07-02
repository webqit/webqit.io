---
desc: Append matched elements to target elements.
---
# `.appendToSync()`

This method is used to append matched elements to target elements.

The suffix *Sync* differentiates this method from its *Async* counterpart - [`.appendToAsync()`](../appendToAsync). Unlike the *Async* counterpart, this method is not promised-based.

## Syntax

```js
$(el).appendToSync(target);
```

**Parameters**

+ **`target`**: **`String|Element`** - A CSS selector of the element, or the element itself `Element`, to append to.

**Return**

+ **`this`** - The Play UI instance.

## Usage

Append some dynamically-created nodes to document body.

```js
$('<h1>Playful people!</h1>').appendToSync(document.body);
```

Append an existing `div` to multiple targets. The `div` is cloned into all targets except the last target.

```js
let div = document.querySelector('div');
$(div).appendToSync('.multiple');
```

------

## Static Usage

The `.appendToSync()` instance method is internally based on the standalone `dom/appendToSync()` function which may be used statically.

### Import

```js
const { appendToSync } = $.dom;
```
```js
import { appendToSync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)