---
title: Transaction
desc: The Transaction class.
---
# `class Transaction {}`

This class lets us create rollback points while manipulating an element.

## Constructor

```js
let transaction = new Transaction(el, props, readCallback, writeCallback);
```

**Parameters**

+ **`el`**: **`Element`** - The element that will be modified.
+ **`props`**: **`String|Array`** - A property or list of properties that describes the operation on the element.
+ **`readCallback`**: **`function(el, props)`** - A function that is called to capture the state of the element using the listed *props*.

    **Parameters**

    + **`el`**: **`Element`** - The element being operated on.
    + **`props`**: **`Array`** - An array of the properties passed to the instance.

    **Return**

    + **`Object`** - A key/value hash for the listed properties.
    + **`Promise`** - A promise that should resolve to the object above.
        
        This return value is what the transaction's [`savepoint()`](classes/transaction/savepoint) instance method returns when called.

+ **`writeCallback`**: **`function(el, record)`** - A function that is called to re-apply the recorded state of the element as previously derived by the `readCallback` function.

    **Parameters**

    + **`el`**: **`Element`** - The element being operated on.
    + **`record`**: **`Object`** - The recorded state of the element as previously derived by the `readCallback` function.

    **Return**

    + **`Any`** - Any value may be returned and will not be used.
    + **`Promise`** - A promise that may resolve to anything.
        
        This return value is what the transaction's [`rollback()`](rollback) and [`apply()`](apply) instance methods return when called.

**Return**

+ **`Transaction`** - The Transaction instance.

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
// The readCallback will read the INLINE values of the listed properties
// This state is what will be restored on a call to transaction.rollback() 
// Notice the "inline" flag, which tells cssSync() to read INLINE CSS
const readCallback = (el, props) => {
    return $(el).cssSync(props, {inline: true});
};

// The writeCallback will restore the INLINE values of the listed properties previously stored
// It is triggered by a call to transaction.rollback() and to transaction.apply() 
const writeCallback = (el, record) => {
    return $(el).cssSync(record);
};

// Obtaine a Transaction instance
let transaction = $('#el').transaction(['background-color', 'color'], readCallback, writeCallback);
```

*Do some modifications and create savepoints along the way:*

```js
const el = document.querySelector('#el');

// Create a savepoint for the initial state of the element - savepoint1
// We can rollback to this point later
transaction.savepoint();

// Alter the element's computed style
el.style.color = 'green';
el.style.backgroundColor = 'black';
// Create a savepoint - savepoint2
// We can rollback to this point later
transaction.savepoint();

// Alter the element's computed style further
el.style.color = 'brown';
el.style.backgroundColor = 'teal';
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

To automatically detect *foreign changes* and leave them untouched, we would set the `preserveCurrentState` parameter of the [`rollback()`](rollback) method to `true`. (The `readCallback` function will be called again to take the element's current state for comparison.)

```js
// The following changes were made after our last savepoint
el.style.color = 'brown';

// Rollback to savepoint2
setTimeout(() => {
    // Rollback all the way to the element's initial state
    transaction.rollback(0, true);
    // Now, color will be left at 'brown'
}, 2000);
```

## Properties

+ **`.length`**: **`Int`** - Gives the number of savepoints in the transaction.

## Methods

Check out *Transaction's* methods.