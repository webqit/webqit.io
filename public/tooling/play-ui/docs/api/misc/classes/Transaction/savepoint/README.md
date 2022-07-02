---
desc: Create a savepoint from the current state of an element in a transaction.
---
# `.savepoint()`

> The `transaction.savepoint()` method.

This method is used to create a savepoint from the current state of an element in a transaction. It takes records by calling the [`readCallback`](../#constructor) function that was used to create the instance.

## Syntax

```js
transaction.savepoint();
```

**Return**

+ **`Any`** - The return value of the `readCallback` function.

## Usage

See the [Transaction](../#usage) class.