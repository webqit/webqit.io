---
desc: Get all text nodes within an element.
---
# `.getTextNodes()`

This method is used to get all text nodes within an element.


## Syntax

```js
let textNodes = $(el).getTextNodes();
```

**Return**

+ **`textNodes`**: **`Array`** - The text nodes found; each an instance of [`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text).

## Usage

Return all text nodes in the document.

```js
let textNodes = $(document.body).getTextNodes();
textNodes.forEach(node => {
    // Show text content
    console.log(node.wholeText);
    // Replace text content
    node.textContent = 'New text content.';
});
```

------

## Static Usage

The `.getTextNodes()` instance method is internally based on the standalone `dom/getTextNodes()` function which may be used statically.

### Import

```js
const { getTextNodes } = $.dom;
```
```js
import { getTextNodes } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)
