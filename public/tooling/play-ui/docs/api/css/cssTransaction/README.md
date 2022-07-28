---
desc: Start a transaction on an element for CSS operations that eventually might need to be rolled back.
---
# `.cssTransaction()`

This method is used to start a transaction on an element for CSS operations that eventually might need to be rolled back. It is a convenient way to use the Play UI's [Transaction](../classes/transaction) class.

## Syntax

```js
let transaction = $(el).cssTransaction(props, asyncWrites = false);
```

**Parameters**

+ **`props`**: **`String|Array`** - A property or list of properties that describes the operation on the element.
+ **`asyncWrites`**: **`Boolean`** - Specifies whether to use the asynchronous mode for writes by using [`cssAsync`](../cssAsync) instead of [`cssSync`](../cssSync).

**Return**

+ **`Transaction`** - The [Transaction](../classes/transaction) instance.

## Usage

Below, we modify an element's CSS properties and later roll back the element to its initial state.

*Define the element's stylesheet- and inline-based CSS:*

```html
<style>
div {
    background-color: yellow;
}
</style>

<div id="el" style="color:red"></div>
```

*Start a transaction:*

```js
// Obtaine a Transaction instance. We're using the asyncWrites mode
let transaction = $('#el').cssTransaction(['background-color', 'color'], true);
```

*Do some modifications and create savepoints along the way:*

```js
const el = document.querySelector('#el');

// Create a savepoint for the initial state of the element - savepoint1
// We can rollback to this point later
transaction.savepoint();

// Alter the element's computed style
$(el).cssSync({
    color: 'green',
    backgroundColor: 'black',
});
// Create a savepoint - savepoint2
// We can rollback to this point later
transaction.savepoint();

// Alter the element's computed style further.
// Here we use the transaction's .apply method to keep things neat.
// Calls cssSync() (or cssAsync where asyncWrites is true) under the hood. 
transaction.apply({
    color: 'brown',
    backgroundColor: 'teal',
});
// Create a savepoint - savepoint3
// We can rollback to this point later
transaction.savepoint();
```

*Rollback to a savepoint*

```js
// Rollback to anypoint after some time
setTimeout(() => {
    // Rollback all the way to the element's initial state
    transaction.rollback(0);
    // Now background-color should fallback to yellow
    // And color should be back to red
}, 2000);
```

In the code above, if another part of the app had changed one of those properties after the last *savepoint* we made, then the call to `rollback()` would have overridden those *foreign changes* to restore the element to the specified *savepoint*.

To automatically detect *foreign changes* and leave them untouched, we would set the `preserveCurrentState` parameter of the [`rollback()`](../classes/transaction/rollback) method to `true`.

```js
// The following changes were made after our last savepoint
el.style.color = 'brown';

// Rollback to savepoint2
setTimeout(() => {
    // Rollback all the way to the element's initial state
    transaction.rollback(0, true);
    // Color will be left at 'brown'
}, 2000);
```

------

## Static Usage

The `.cssTransaction()` instance method is internally based on the standalone `css/cssTransaction()` function which may be used statically.

### Import

```js
const { cssTransaction } = $.css;
```
```js
import { cssTransaction } from '@webqit/playui-js/src/css/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)