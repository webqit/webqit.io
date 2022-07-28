---
desc: Obtain the rendered rectangle of an element in the UI for manipualtion.
---
# `.rect()`

This method is used to obtain the rendered rectangle of an element in the UI for manipualtion. It is an alias of the [UIRect.calculate()](../classes/UIRect#uirectcalculateelement-params--) function.

## Syntax

```js
let rect = $(el).rect(params = {});
```

**Parameters**

+ **`params`**: **`Object`** - Directives for the method. See [UIRect.calculate()](../classes/UIRect#).

**Return**

+ **`rect`**: **`UIRect`** - An instance of [UIRect](../classes/UIRect).

### Usage

Get the *rect* of a button element.

```js
let rect = $('button').rect();
```

Manipulate the *rect*.

```js

```

------

## Static Usage

The `.rect()` instance method is internally based on the standalone `ui/rect()` function which may be used statically.

### Import

```js
const { rect } = $.ui;
```
```js
import { rect } from '@webqit/playui-js/src/ui/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)
