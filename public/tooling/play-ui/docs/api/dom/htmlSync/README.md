---
desc: Set or get an element's HTML/XML content.
---
# `.htmlSync()`

This method is used to set or get an element's HTML/XML content. It is the programmatic alternative to [`Element.innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML). Additionally, when this function receives `undefined` for a *set* operation, it is converted to an empty string.

The suffix *Sync* differentiates this method from its *Async* counterpart - [`.htmlAsync()`](../htmlAsync). Unlike the *Async* counterpart, this method is not promised-based.

+ [Set HTML Content](#a-set-html-content)
+ [Get HTML Content](#b-get-html-content)

## a. Set HTML Content

### Syntax

```js
// Set HTML content of an element
$(el).htmlSync(content);
```

**Parameters**

+ **`content`**: **`String|Node`** - The text or HTML content, or some DOM node, to set.

**Return**

+ **`this`** - The Play UI instance.

### Usage

Replace an element's content with some HTML markup.

```js
let div = '<div>Playful people!</div>';
$(el).htmlSync(div);
```

## b. Get HTML Content

### Syntax

```js
// Get HTML content of an element
let content = $(el).htmlSync();
```

**Return**

+ **`content`**: **`String`** - The element's HTML content.

### Usage

Get an element's HTML content.

```js
let content = $(el).htmlSync();
// <div>Playful people!</div>
```

------

## Static Usage

The `.htmlSync()` instance method is internally based on the standalone `dom/htmlSync()` function which may be used statically.

### Import

```js
const { htmlSync } = $.dom;
```
```js
import { htmlSync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)
