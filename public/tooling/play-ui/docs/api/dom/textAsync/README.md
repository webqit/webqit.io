---
desc: Asynchronously set or get an element's text content.
---
# `.textAsync()`

This method is used to asynchronously set or get an element's text content. It is the programmatic alternative to [`Element.innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText). Additionally, when this function receives `undefined` for a *set* operation, it is converted to an empty string.

The suffix *Async* differentiates this method from its *Sync* counterpart - [`.textSync()`](../textSync). Unlike the *Sync* counterpart, this method is promised-based. See [Async UI](../../../getting-started/overview#meet-async-ui).

+ [Set Text Content](#a-set-text-content)
+ [Get Text Content](#b-get-text-content)

## a. Set Text Content

### Syntax

```js
// Set text content of an element
await $(el).textAsync(content);
```

**Parameters**

+ **`content`**: **`String`** - The text content to set.

**Return**

+ **`this`** - The Play UI instance.

### Usage

Replace an element's content with some text.

```js
let text = 'Playful people!';
$(el).textAsync(text);
```

## b. Get Text Content

### Syntax

```js
// Get Text content of an element
let content = await $(el).textAsync();
```

**Return**

+ **`content`**: **`String`** - The element's text content.

### Usage

Get an element's text content.

```js
let content = await $(el).textAsync();
// Playful people!
```

------

## Static Usage

The `.textAsync()` instance method is internally based on the standalone `dom/textAsync()` function which may be used statically.

### Import

```js
const { textAsync } = $.dom;
```
```js
import { textAsync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)
