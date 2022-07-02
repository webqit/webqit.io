---
desc: Asynchronously set or get an element's attribute.
---
# `.attrAsync()`

This method is used to asynchronously set or get an element's attribute. It is a shorter alternative to the native [`Element.setAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute), [`Element.getAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute), and [`Element.removeAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute). It also has special support for list-based attributes like `class`.

The suffix *Async* differentiates this method from its *Sync* counterpart - [`attrSync()`](../attrSync). Unlike the *Sync* counterpart, this method is promised-based. See [Async UI](../../../getting-started/overview#meet-async-ui).

+ [Set Attributes](#a-set-attributes)
+ [Get Attributes](#b-get-attributes)
+ [Unset Attributes](#c-unset-attributes)
+ [Modyfying Delimited Attributes](#d-modyfying-delimited-attributes)

## a. Set Attributes

### Syntax

```js
// Set a single attribute
await $(el).attrAsync(name, value);

// Set multiple attributes
await $(el).attrAsync({
    [name]: value,
});
```

**Parameters**

+ **`name`**: **`String`** - The attribute name to set.
+ **`value`**: **`String|Boolean`** - The attribute value to set. When `true`, the string `"true"` is set on the attribute. When `false`, the attribute is unset from the element; [see below](#unset-attributes).

**Return**

+ **`this`** - The Play UI instance.

### Usage

**Set the ID attribute on an `<input />` element.** Then set other attributes.

```js
// Set a single attribute
$(el).attrAsync('id', 'email-input').then($el => {
    $el.attrAsync({
        type: 'email',
        required: true,
    });
});
```

## b. Get Attributes

### Syntax

```js
// Get a single attribute
let attribute = await $(el).attrAsync(name);

// Get multiple attributes
let attributes = await $(el).attrAsync([...name]);
```

**Parameters**

+ **`name`**: **`String`** - The attribute name.

**Return**

+ **`value`**: **`Any`** - The value of the named attribute.
+ **`values`**: **`Object`** - A key/value hash of the listed attributes.

### Usage

**Get the attribute on an `<input />` element.**

```js
// Set a single attribute
let value = await $(el).attrAsync('id');
// email-input
```

## c. Unset Attributes

### Syntax

```js
// Remove a single attribute
$(el).attrAsync(name, false);

// Remove multiple attributes
await $(el).attrAsync({
    [name]: false,
});
```

**Parameters**

+ **`name`**: **`String`** - The attribute name.

**Return**

+ **`this`** - The Play UI instance.

### Usage

**Unset an element's ID attribute.**

```js
$(el).attrAsync('id', false);
```

## d. Modyfying Delimited Attributes

### Syntax

```js
// Add a single token to an attribute
await $(el).attrAsync(name, token, mutation === true);

// Add multiple tokens to an attributes
await $(el).attrAsync(name, [ token, ... ] mutation === true);
await $(el).attrAsync(name, {
    [token]: mutation === true,
});

// Remove a token from a single delimited attribute
await $(el).attrAsync(name, token, mutation === false);

// Remove multiple tokens to an attributes
await $(el).attrAsync(name, [ token, ... ] mutation === false);
await $(el).attrAsync(name, {
    [token]: mutation === false,
});
```

**Parameters**

+ **`name`**: **`String`** - The attribute name to modify.
+ **`token`**: **`String`** - The attribute token to add or remove.
+ **`mutation`**: **`Boolean`** - The *add/remove* directive. When `true`, the given token is added to the attribute's value. When `false`, the given token is removed from the attribute's value.

**Return**

+ **`this`** - The Play UI instance.

### Usage

**Modify an element's *class* attribute,** then confirm the operation.

```html
<div class="class1 class2" role="article"></div>
```

```js
let el = document.querySelector('.class1');
// Insert a class entry
await $(el).attrAsync('class', 'class3', true);
// Confirm the operation
console.log(await $(el).attrAsync('class')); // class1 class2 class3
```

**Toggle *icon* classes on an element.**

```html
<i class="volume-icon bi bi-volume-up"></i>
```

```js
let volumeIconElement = document.querySelector('.volume-icon');
let isMute = false;
$(volumeIconElement).on('click', async e => {
    await $(el).attrAsync('class', {
        'bi-volume-mute': isMute,
        'bi-volume-up': !isMute,
    });
    isMute = !isMute;
});
```

------

## Static Usage

The `.attrAsync()` instance method is internally based on the standalone `dom/attrAsync()` function which may be used statically.

### Import

```js
const { attrAsync } = $.dom;
```
```js
import { attrAsync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)