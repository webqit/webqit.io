---
desc: Asynchronously set or get one or more style properties for the given element.
---
# `.cssAsync()`

This method is used to asynchronously set or get one or more style properties for the given element. It is a convenient alternative to the native [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) and [`ElementCSSInlineStyle.style`](https://developer.mozilla.org/en-US/docs/Web/API/ElementCSSInlineStyle/style). It also has special support for vendor-prefixed properties.

The suffix *Async* differentiates this method from its *Sync* counterpart - [`.cssSync()`](../cssSync). Unlike the *Sync* counterpart, this method is promised-based. See [Async UI](../../../getting-started/overview#meet-async-ui).

+ [Set CSS Properties](#a-set-css-properties)
+ [Get CSS Properties](#b-get-css-properties)

## a. Set CSS Properties

### Syntax

```js
// Set a single property
await $(el).cssAsync(prop, value, params = {});

// Set multiple properties
await $(el).cssAsync({
    [prop]: value,
}, params = {});
```

**Parameters**

+ **`prop`**: **`String`** - A CSS property.
+ **`value`**: **`Any`** - The property value to set. When an empty string `''`, the property is unset from the element.
+ **`params`**: **`Object`** - Additional directives for the method. (This parameter only applies in the second syntax above, where the first parameter is an array.) Valid directives are:
    + **`scope`** - Set to `global` to write the new rules to a stylesheet. Or set to `inline` to write to the element's `style` attribute. By default, the element's *computed CSS* object is what is updated. But the browser also automatically writes the rules to the element's `style` attribute. The `scope:inline` directive thus has no special effect.
    + **`prepend`** - Set to `true` to write the new rules behind existing rules instead, making existing rules take priority. With the `scope:global` directive, the given rules are inserted at the start of the target stylesheet. With the `scope:inline` directive, the given rules are prepended to the element's `style` attribute.
    + **`pseudo`** - (Works with the `scope:global` directive. Forbidden otherwise.) Set to a pseudo selector (e.g `::before`) to set the CSS of a pseudo element associated with the matched element instead.
    + **`autoUuid`** - (Works with the `scope:global` directive.) Set to `false` to prevent Play UI from automatically generating a special attribute `playuo-uuid` for the element. By default, this is what is used as the CSS selector for the rules written to stylesheet.
    + **`autoId`** - (Works with the `scope:global` directive.) Set to `true` to automatically generate an ID for the element where not present. This is used as the CSS selector for the rules written to stylesheet. This also prevents Play UI from automatically generating the special `playuo-uuid` attribute as above. Note that `autoUuid` and `autoId` cannot be both `false`.
    + **`noScratchPad`** - (Works with the `scope:global` directive.) Set to `true` to target the latest *editable* stylesheet for the operation. Otherwise, a stylesheet maintained by Play UI is used.
    + **`vendorize`** - Set to `true` to automatically handle applicable vendor-specific rule prefixing.

**Return**

+ **`this`** - The Play UI instance.

### Usage

Change an element's CSS, then change the CSS of its *:after* pseudo element.

```js
$(el).cssAsync('color', 'red').then($el => {
    $el.cssAsync({
        display: 'block',
        content: '"[NEW]"',
    }, {pseudo: ':after'});
});
```

## b. Get CSS Properties

### Syntax

```js
// Get a single property
let value = await $(el).cssAsync(prop);

// Get multiple properties
let values = await $(el).cssAsync([...prop], params = {});
```

**Parameters**

+ **`prop`**: **`String`** - A CSS property.
+ **`params`**: **`Object`** - Additional directives for the method. Valid directives are:
    + **`scope`** - Set to `global` to read the global, stylesheet-based CSS for the matched element. Or set to `inline` to read the element's `style` attribute instead. By default, the element's *computed CSS* object is what is read.
    + **`pseudo`** - (Forbidden with the `scope:inline` directive.) Set to a pseudo selector (e.g `::before`) to get the CSS of a pseudo element associated with the matched element instead.
    + **`all`** - (Works with the `scope:global` directive.) Set to `true` to return an array of rule blocks gathered for the matched element from across stylesheets. Otherwise, rule blocks are merged into a single object and returned.
    + **`noCache`** - (Works with the `scope:global` directive.) Set to `true` to bypass Play UI's internal cache that optimizes traversing the document's stylesheets.
    + **`vendorize`** - Set to `true` to automatically handle applicable vendor-specific rule prefixing.

**Return**

+ **`value`**: **`Any`** - The value of the named CSS property.
+ **`values`**: **`Object`** - A key/value hash of the listed CSS properties.

### Usage

Get an element's computed CSS. Note that if we must provide a `params` object, *props list* has to be an array.

```js
let result = await $(el).cssAsync(['color'], {scope: 'inline'});
// {color: 'red'}
```

------

## Static Usage

The `.cssAsync()` instance method is internally based on the standalone `css/cssAsync()` function which may be used statically.

### Import

```js
const { cssAsync } = $.css;
```
```js
import { cssAsync } from '@webqit/playui-js/src/css/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)