---
desc: Set or get an element's text content.
---
# `.textSync()`

This method is used to set or get an element's text content. It is the programmatic alternative to [`Element.innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText). Additionally, when this function receives `undefined` for a *set* operation, it is converted to an empty string.

The suffix *Sync* differentiates this method from its *Async* counterpart - [`.textAsync()`](../textAsync). Unlike the *Async* counterpart, this method is not promised-based.

+ [Set Text Content](#a-set-text-content)
+ [Get Text Content](#b-get-text-content)

## a. Set Text Content

### Syntax

```js
// Set text content of an element
$(el).textSync(content);
```

**Parameters**

+ **`content`**: **`String`** - The text content to set.

**Return**

+ **`this`** - The Play UI instance.

### Usage

Replace an element's content with some text.

```js
let text = 'Playful people!';
$(el).textSync(text);
```

## b. Get Text Content

### Syntax

```js
// Get Text content of an element
let content = $(el).textSync();
```

**Return**

+ **`content`**: **`String`** - The element's text content.

### Usage

Get an element's text content.

```js
let content = $(el).textSync();
// Playful people!
```

------

## Static Usage

The `.textSync()` instance method is internally based on the standalone `dom/textSync()` function which may be used statically.

### Import

```js
const { textSync } = $.dom;
```
```js
import { textSync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)
