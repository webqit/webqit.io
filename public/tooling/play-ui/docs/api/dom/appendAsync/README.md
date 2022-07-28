---
desc: Asynchronously append content to an element.
---
# `.appendAsync()`

This method is used to asynchronously append content to an element. It works exactly the same as the native [`ParentNode.append()`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append) except that when the implied content is undefined, it is converted to an empty string.

The suffix *Async* differentiates this method from its *Sync* counterpart - [`.appendSync()`](../appendSync). Unlike the *Sync* counterpart, this method is promised-based. See [Async UI](../../../getting-started/overview#meet-async-ui).

## Syntax

```js
// Append content(s) to an element
await $(el).appendAsync(content[, ...content]);
```

**Parameters**

+ **`content`**: **`String|Node`** - The text or HTML content, or some DOM node, to append.

**Return**

+ **`this`** - The Play UI instance.

## Usage

Append an element node and some text content to an element.

```js
let div = document.createElement("div");
$(el).appendAsync(div, 'Playful', ' ', 'people', '!');
```

------

## Static Usage

The `.appendAsync()` instance method is internally based on the standalone `dom/appendAsync()` function which may be used statically.

### Import

```js
const { appendAsync } = $.dom;
```
```js
import { appendAsync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)