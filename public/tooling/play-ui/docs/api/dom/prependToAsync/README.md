---
desc: Asynchronously prepend matched elements to target elements.
---
# `.prependToAsync()`

This method is used to asynchronously prepend matched elements to target elements.

The suffix *Async* differentiates this method from its *Sync* counterpart - [`.prependToSync()`](../prependtosync). Unlike the *Sync* counterpart, this method is promised-based. See [Async UI](../../../getting-started/overview#meet-async-ui).
## Syntax

```js
await $(el).prependToAsync(target);
```

**Parameters**

+ **`target`**: **`String|Element`** - A CSS selector of the element, or the element itself `Element`, to prepend to.

**Return**

+ **`this`** - The Play UI instance.

## Usage

Prepend some dynamically-created nodes to document body.

```js
$('<h1>Playful people!</h1>').prependToAsync(document.body);
```

Prepend an existing `div` to multiple targets. The `div` is cloned into all targets except the last target.

```js
let div = document.querySelector('div');
$(div).prependToAsync('.multiple');
```

------

## Static Usage

The `.prependToAsync()` instance method is internally based on the standalone `dom/prependToAsync()` function which may be used statically.

### Import

```js
const { prependToAsync } = $.dom;
```
```js
import { prependToAsync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)