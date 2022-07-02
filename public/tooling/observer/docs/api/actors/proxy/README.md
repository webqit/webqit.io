---
desc: Wrap an object or array in a reactive proxy.
_index: 8
---
# `.proxy()`

This function is used to wrap an object or array in a reactive proxy that forwards all operations to the appropriate [*interceptors*](../../reactions/interceptors), and announces them to [*observers*](../../reactions/observe).

## Syntax

```js
// Wrap an object
let _obj = Observer.proxy(obj[, params = {}]);
```

**Parameters**

+ **`obj:             Object|Array`** - an object or array.
+ **`params:          OperatorParams`** - Additional parameters for the operation. *See [OperatorParams](../../core/OperatorParams). Note that the `params.eventTypeReturn` parameter cannot be used with `Observer.proxy()`.*

**Return Value**

+ **`_obj:            Proxy`**

## Usage

```js
// The observed object/array
let arr = [];
Observer.observe(arr, mutations => {
    mutations.forEach(mutation => {
        console.log(mutation.type, mutation.name, mutation.path, mutation.value, mutation.oldValue);
    });
});
```

```js
// The proxy
Observer.proxy(arr).push('one', 'two');
```

The above operation above will notify our observer *three times* each for a *set* operation on the properties `0`, `1`, `length`.

## Related Methods

+ [`Observer.unproxy()`](../unproxy)
+ [`Observer.accessorize()`](../accessorize)
