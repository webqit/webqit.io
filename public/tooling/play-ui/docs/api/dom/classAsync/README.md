---
desc: Asynchronously modify or match an element's class list.
---
# `.classAsync()`

This method is used to asynchronously modify or match an element's class list. It provides convenience over using the [`attrAsync()`](../attrAsync) method to modify an element's class attribute.

The suffix *Async* differentiates this method from its *Sync* counterpart - [`classSync()`](../classSync). Unlike the *Sync* counterpart, this method is promised-based. See [Async UI](../../../getting-started/overview#meet-async-ui).

+ [Modify Class List](#a-modify-class-list)
+ [Match Class List](#b-match-class-list)

## a. Modify Class List

### Syntax

```js
// Add member classes
await $(el).classAsync(class, mutation === true);
await $(el).classAsync([ class, ... ], mutation === true);
await $(el).classAsync({
    [class]: mutation === true,
});

// Remove member classes
await $(el).classAsync(class, mutation === false);
await $(el).classAsync([ class, ... ], mutation === false);
await $(el).classAsync({
    [class]: mutation === false,
});
```

**Parameters**

+ **`class`**: **`String`** - The class to add or remove.
+ **`mutation`**: **`Boolean`** - The *add/remove* directive. When `true`, the given string is added to the class list. When `false`, the given string is removed from the class list.

**Return**

+ **`this`** - The Play UI instance.

### Usage

**Add member classes to an element,** then confirm operation.

```html
<div class="class1 class2"></div>
```

```js
let el = document.querySelector('.class1');
$(el).classAsync('class3 class4', true).then(Sel => {
    // Confirm operation
    console.log($el.attrSync('class')); // class1 class2 class3 class4
});
```

**Toggle *icon* classes on an element.**

```html
<i class="volume-icon bi bi-volume-up"></i>
```

```js
let volumeIconElement = document.querySelector('.volume-icon');
let isMute = false;
$(volumeIconElement).on('click', e => {
    $(el).classAsync({
        'bi-volume-mute': isMute,
        'bi-volume-up': !isMute,
    });
    isMute = !isMute;
});
```

## b. Match Class List

### Syntax

```js
// See if one pr more class exists
var exists = await $(el).classAsync(classList);
```

**Parameters**

+ **`classList`**: **`String|Array`** - One or more class names.

**Return**

+ **`exists`**: **`Boolean`** - This is `true` if *all* listed classes exist.

### Usage

**Assert that the given class names exist.**

```html
<div class="class1 class2 class3"></div>
```

```js
let el = document.querySelector('.class1');
// Match classes
console.log(await $(el).classAsync('class1')); // true
console.log(await $(el).classAsync('class1 class3')); // true
console.log(await $(el).classAsync('class1 class4')); // false
// As an array
console.log(await $(el).classAsync(['class1 class3'])); // true
console.log(await $(el).classAsync(['class1', 'class3'])); // true
console.log(await $(el).classAsync(['class1', 'class4'])); // false
// Mixed
console.log(await $(el).classAsync(['class1', 'class3 class2'])); // true
```

------

## Static Usage

The `.classAsync()` instance method is internally based on the standalone `dom/classAsync()` function which may be used statically.

### Import

```js
const { classAsync } = $.dom;
```
```js
import { classAsync } from '@webqit/playui-js/src/dom/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)