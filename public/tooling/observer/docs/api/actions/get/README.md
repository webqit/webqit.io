---
desc: Return the value of a property.
_index: 1
---
# `.get()`

This method is used to return the value of a property. It corresponds to the native [`Reflect.get()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get) function, which is itself the programmatic alternative to the object accessor syntax – `obj.property; obj[property]`. `Observer.get()` offers reactivity over this operation.

## Syntax

```js
// Read a specific property.
// The return value will be the value of the property
var value = Observer.get(obj, propertyName[, params = {}]);

// Read a list of properties
// The return value will be a key/value map of the listed properties
var values = Observer.get(obj, [ propertyName, ... ][, params = {}]);
```

**Parameters**

+ **`obj:             Object|Array`** - An object or array.
+ **`propertyName:    String`** - The property to read.
+ **`params:          OperatorParams`** - Additional parameters for the operation. *See [OperatorParams](../../core/OperatorParams). Note that the `params.eventTypeReturn` parameter cannot be used with `Observer.get()`.*

**Return Value**

+ **`value:   Any`** - The value of the property.
+ **`values:  Object`** - A key/value map of the listed properties in the second syntax above.

## Usage

*Case 1 - read a specific property:*

```js
let obj = {
    fruit:'orange',
    brand:'apple',
};
```

```js
let fruit = Observer.get(obj, 'fruit');
```

*Case 2 - Read a list of properties:*

```js
let obj = {
    fruit:'orange',
    brand:'apple',
};
```

```js
let fruits = Observer.get(obj, ['fruit', 'brand']);
```

## Usage as a Trap's "get" Handler

`Observer.get()` can be used as the "get" handler in Proxy traps.

```js
let _obj = new Proxy(obj, { get: Observer.get });
let _arr = new Proxy(arr, { get: Observer.get });
```

*Get* operations will now be forwarded to `Observer.get()`, triggering any [*interceptors*](../../../core/overview#intercept) that may be bound to the object.

```js
let fruit = _obj.fruit;
let value = _arr[2];
```

## Usage with Property Getters

It is possible to implement *property getters* that use `Observer.get()` behind the scene. This gives us the benefit of using JavaScript's accessor syntax reactively.

This is automatically done by the [`Observer.accessorize()`](../../actors/accessorize) function.

```js
// Virtualize a property or multiple properties
Observer.accessorize(obj, 'fruit');
Observer.accessorize(obj, ['fruit', 'brand']);
```

Now accessing the properties will trigger any [*interceptors*](../../../core/overview#intercept) that may be bound to the object.

```js
// Now we can do without Observer.get
let fruit = obj.fruit;
let brand = obj.brand;
```

## Intercepting `Observer.get()`

Using [`Observer.intercept()`](../../reactions/intercept), it is possible to intercept calls to `Observer.get()`. During a "deleteProperty" operation, interceptors will receive an event object containing the property name being accessed.

```js
Observer.intercept(obj, 'get', (action, previous, next) => {

    // What we received...
    console.log(action.name);

    // The read operation
    return obj[action.name];
});
```

```js
let value = Observer.get(obj, 'fruit');
```

When the "get" operation is of multiple properties, the interceptor gets fired for each property while also recieving the total list of properties as a hint - via `action.related`.

```js
Observer.intercept(obj, 'get', (action, previous, next) => {

    // What we received...
    console.log(action.name, action.related);

    // The read operation
    return obj[action.name];
});
```

```js
let values = Observer.get(obj, ['orange', 'apple']);
```

The above should trigger our interceptor twice with `action.related` being `[ 'fruit', 'brand' ]` each time.

## Related Methods

+ [`Observer.observe()`](../../reactions/observe)
+ [`Observer.intercept()`](../../reactions/intercept)
