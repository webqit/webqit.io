---
desc: Apply a new state to the element in a transaction.
---
# `.apply()`

> The `transaction.apply()` method.

This method is used to apply a new state to the element in a transaction. It is just another way to call the [`writeCallback`](../#constructor) function that was used to create the instance.

## Syntax

```js
transaction.apply(state);
```

**Parameters**

+ **`state`**: **`Object`** - A new state object that is passed to the instance's [`writeCallback`](../#constructor).

**Return**

+ **`Any`** - The return value of the transaction's `writeCallback` function.

## Usage

Obtain an instance of an ongoing transaction and call `.apply()`. Below, we build on the usage example on the [Transaction](../#usage) page. Here we use the `.apply()` method to apply the CSS properties in that example.

```js
ananimationi.apply({
    color: 'brown',
    backgroundColor: 'teal',
});
```
