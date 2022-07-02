---
desc: Asynchronously prepend content to an element.
---
# `.prependAsync()`

This method is used to asynchronously prepend content to an element. It works exactly the same as the native [`ParentNode.prepend()`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend) except that when the implied content is undefined, it is converted to an empty string.

The suffix *Async* differentiates this method from its *Sync* counterpart - [`.prependSync()`](../prependsync). Unlike the *Sync* counterpart, this method is promised-based. See [Async UI](../../../getting-started/overview#meet-async-ui).

## Syntax

```js
// Prepend content(s) to an element
await $(el).prependAsync(content[, ...content]);
```

**Parameters**

+ **`content`**: **`String|Node`** - The text or HTML content, or some DOM node, to prepend.

**Return**

+ **`this`** - The Play UI instance.

## Usage

Prepend an element node and some text content to an element.

```js
let div = document.createElement("div");
$(el).prependAsync('!', 'people', ' ', 'Playful', div);
```

------

## Static Usage

The `.prependAsync()` instance method is internally based on the standalone `dom/appendAsync()` function which may be used statically.

### Import

```js
const { prependAsync } = $.dom;
```
```js
import { prependAsync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)