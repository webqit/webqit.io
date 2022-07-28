---
desc: Roll back up to a savepoint in a transaction.
---
# `.rollback()`

> The `transaction.rollback()` method.

This method is used to roll back up to a savepoint in a transaction. It re-applies the previously recorded state of the element by calling the [`writeCallback`](../#constructor) function that was used to create the instance. The complementary [`readCallback`](../#constructor) function will also be involved if the `preserveCurrentState` parameter is set to `true`.

## Syntax

```js
transaction.rollback(savepoint = 0, preserveCurrentState = false);
```

**Parameters**

+ **`savepoint`**: **`Int`** - The savepoint to roll back to. `0` refers to the record of the first call to [`.savepoint()`](../savepoint); `1` to the second call; and so on.
+ **`preserveCurrentState`**: **`Boolean`** - Specifies whether or not to detect and preserve any additional changes made after the last call to `savepoint()`.


**Return**

+ **`Any`** - The return value of the `writeCallback` function.

## Usage

See the [Transaction](../#usage) class.