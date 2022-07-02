---
desc: Prepend content to an element.
---
# `.prependSync()`

This method is used to prepend content to an element. It works exactly the same as the native [`ParentNode.prepend()`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend) except that when the implied content is undefined, it is converted to an empty string.

The suffix *Sync* differentiates this method from its *Async* counterpart - [`.prependAsync()`](../prependasync). Unlike the *Async* counterpart, this method is not promised-based.

## Syntax

```js
// Prepend content(s) to an element
$(el).prependSync(content[, ...content]);
```

**Parameters**

+ **`content`**: **`String|Node`** - The text or HTML content, or some DOM node, to prepend.

**Return**

+ **`this`** - The Play UI instance.

## Usage

Prepend an element node and some text content to an element.

```js
let div = document.createElement("div");
$(el).prependSync('!', 'people', ' ', 'Playful', div);
```

------

## Static Usage

The `.prependSync()` instance method is internally based on the standalone `dom/prependSync()` function which may be used statically.

### Import

```js
const { prependSync } = $.dom;
```
```js
import { prependSync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)