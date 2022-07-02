---
desc: Start a transaction on an element for operations that eventually might need to be rolled back.
---
# `.transaction()`

This method is used to start a transaction on an element for operations that eventually might need to be rolled back. It is a convenient way to use the Play UI's [Transaction](../classes/Transaction) class.

## Syntax

```js
let transaction = $(el).transaction(props, readCallback, writeCallback);
```

**Parameters**

+ **`props`**: **`String|Array`** - A property or list of properties that describes the operation on the element.
+ **`readCallback`**: **`function(el, props)`** - A function that is called to capture the state of the element using the listed *props*. See the [Transaction](../classes/Transaction#constructor) class.
+ **`writeCallback`**: **`function(el, record)`** - A function that is called to re-apply the recorded state of the element as previously derived by the `readCallback` function. See the [Transaction](../classes/Transaction#constructor) class.

**Return**

+ **`Transaction`** - The [Transaction](../classes/Transaction) instance.

## Usage

See the [Transaction](../classes/Transaction#constructor) class.

------

## Static Usage

The `.transaction()` instance method is internally based on the standalone `misc/transaction()` function which may be used statically.

### Import

```js
const { transaction } = $.misc;
```
```js
import { transaction } from '@webqit/playui-js/src/misc/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)