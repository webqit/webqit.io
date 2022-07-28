---
desc: Asynchronously set or get an element's HTML/XML content.
---
# `.htmlAsync()`

This method is used to asynchronously set or get an element's HTML/XML content. It is the programmatic alternative to [`Element.innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML). Additionally, when this function receives `undefined` for a *set* operation, it is converted to an empty string.

The suffix *Async* differentiates this method from its *Sync* counterpart - [`.htmlSync()`](../htmlSync). Unlike the *Sync* counterpart, this method is promised-based. See [Async UI](../../../getting-started/overview#meet-async-ui).

+ [Set HTML Content](#a-set-html-content)
+ [Get HTML Content](#b-get-html-content)

## a. Set HTML Content

### Syntax

```js
// Set HTML content of an element
await $(el).htmlAsync(content);
```

**Parameters**

+ **`content`**: **`String|Node`** - The text or HTML content, or some DOM node, to set.

**Return**

+ **`this`** - The Play UI instance.

### Usage

Replace an element's content with some HTML markup.

```js
let div = '<div>Playful people!</div>';
$(el).htmlAsync(div);
```

## b. Get HTML Content

### Syntax

```js
// Get HTML content of an element
let content = await $(el).htmlAsync();
```

**Return**

+ **`content`**: **`String`** - The element's HTML content.

### Usage

Get an element's HTML content.

```js
let content = await $(el).htmlAsync();
// <div>Playful people!</div>
```

------

## Static Usage

The `.htmlAsync()` instance method is internally based on the standalone `dom/htmlAsync()` function which may be used statically.

### Import

```js
const { htmlAsync } = $.dom;
```
```js
import { htmlAsync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)
