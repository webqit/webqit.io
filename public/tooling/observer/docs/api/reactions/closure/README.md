---
desc: Create a reactive context under which to execute code.
---
# `.closure()`

This method is used to create an *observer-aware* context under which to execute code that could potentially mutate an object or array. Under this context, all mutations made to the object will be detected and [*observers*](../../../concepts#observers) that may be bound to the object will be notified.

## Syntax

```js
// Establish a closure on one or more objects
Observer.closure(callback, object[, object[, … ]]);
```

**Parameters**

+ **`callback:    Function`** - The closure's callback function.

    **Syntax**

    ```js
    function(...objects) {}
    ```
    
    **Parameters**
    
    + **`...objects:    Array`** - The objects originally given in the call to `Observer.closure()`, passed in in the order they were received.

    **Return Value**

    Any value may be returned by this callback, and it will, in turn, be the return value of the call to `Observer.closure()`. If this turns out to be a *Promise*, `Observer.closure()` will wait until it is resolved before going further to evaluate the objects for changes and firing events.

+ **`...objects:    Array`** - A list of objects to observe for the operation in the closure.

**Return Value**

*undefined*

## Usage

The objects and their observer.

```js
// The observed object/array
let arr = [], obj = {};
Observer.observe(arr, mutations => {
    mutations.forEach(mutation => {
        console.log(mutation.target, mutation.type, mutation.name, mutation.path, mutation.value, mutation.oldValue);
    });
});
```

The closure, where objects are manipulated.

```js
// The closure
Observer.closure((arr, obj) => {
    arr.push('one');
    arr.push('two');
    arr.push('three');
    arr.push('four');
    arr.shift();
}, arr, obj);
```

The operation above will notify our observer *once* for a *set* operation on the properties `0`, `1`, `2`, `length` of the array - which is what is given in `mutation.target`.

Notice that changes are detected and reported by *observers* after the closure runs. These changes are detected by comparing the state of the objects before and after the transaction. Intermediate changes, therefore, do not get caught. Also, *[interceptors](../../../overview#interceptors)* that may have been bound to the objects don't get fired. (Compare [`Observer.proxy()`](../../actors/proxy).)

## Related Methods

+ [`Observer.proxy()`](../../actors/proxy)