---
desc: Commit up to a savepoint in a transaction.
---
# `.commit()`

> The `transaction.commit()` method.

This method is used to commit up to a savepoint in a transaction. It is used to certify that all records up to the specified savepoint are permanent changes.

## Syntax

```js
transaction.commit(savepoint = 0);
```

+ **`savepoint`**: **`Int`** - The savepoint to commit up to. `0` refers to the record of the first call to [`.savepoint()`](../savepoint); `1` to the second call; and so on.

**Return**

+ **`this`** - The [Transaction](../) instance.

## Usage

Obtain an instance of an ongoing transaction and call `.commit()`. Below, we build on the usage example on the [Transaction](../#usage) page. Here we use the `.commit()` method to commit all savepoints. Calling the transaction's `.rollback()` method after this point will have no effect.

```js
ananimationi.commit(0);
```
