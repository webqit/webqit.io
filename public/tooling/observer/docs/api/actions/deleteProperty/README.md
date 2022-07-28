---
desc: Reactively delete a property from an object.
_index: 3
---
# `.deleteProperty()`

This method is used to reactively delete a property from an object. It corresponds to the native [`Reflect.deleteProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty) function, which is itself the programmatic alternative to the `delete` keyword – `delete object.property`. `Observer.deleteProperty()` offers reactivity over this operation.

The `Observer.del()` function is an alias of this function and can be used interchangeably.

## Syntax

```js
// Delete a specific property
Observer.deleteProperty(obj, propertyName[, params = {}]);

// Delete a list of properties
Observer.deleteProperty(obj, [ propertyName, ... ][, params = {}]);
```

**Parameters**

+ **`obj:                 Object|Array`** - An object or array.
+ **`propertyName:        String`** - The property to delete.
+ **`params:          OperatorParams`** - Additional parameters for the operation. *See [OperatorParams](../../core/OperatorParams).

**Return Value**

+ **Boolean** - This is either `true` or `false` on the outcome of the operation.
+ **Event** - The returned [Event](../../../core/Event) object for the operation when the `params.eventTypeReturn` is set to `true`. *Learn more at [Negotiating With Operators](../../core/Event#negotiating-with-operators).*

## Usage

*Case 1 - Delete a specific property:*

*On an object:*

```js
Observer.deleteProperty(obj, 'fruit');
```

*On an array:*

```js
Observer.deleteProperty(arr, 0);
```

*Case 2 - Delete a list of properties:*

*On an object:*

```js
Observer.deleteProperty(obj, [ 'fruit', 'brand' ]);
```

*On an array:*

```js
Observer.deleteProperty(arr, [ 0, 3 ]);
```

## Usage as a Trap's "deleteProperty" Handler

`Observer.deleteProperty()` returns a *Boolean* value by default, and can, therefore, be used as the "deleteProperty" handler in Proxy traps.

```js
let _obj = new Proxy(obj, {deleteProperty: Observer.deleteProperty});
let _arr = new Proxy(arr, {deleteProperty: Observer.deleteProperty});
```

Delete operations will now be forwarded to `Observer.deleteProperty()`, triggering any [*interceptors*](../../../core/overview#intercept) and [*observers*](../../../core/overview#observe) that may be bound to the object.

```js
delete _obj.fruit;
delete _arr[2];
```

## Intercepting `Observer.deleteProperty()`

Using [`Observer.intercept()`](../../reactions/intercept), it is possible to intercept calls to `Observer.deleteProperty()`. During a "deleteProperty" operation, interceptors will receive an event object containing the property name being deleted.

```js
Observer.intercept(obj, 'deleteProperty', (action, previous, next) => {
    
    // What we received...
    console.log(action.name);

    // We can actually prevent the deletion of the property

    // The return value - Boolean
    return false;
});
```

```js
Observer.deleteProperty(obj, 'fruit');
```

The interceptor is expected to return *true* if the custom operation was successful; *false* otherwise.

When the "deleteProperty" operation is of multiple properties, the interceptor gets fired for each property while also recieving the total list of properties as a hint - via `action.related`.

```js
Observer.intercept(obj, 'deleteProperty', (action, received, next) => {
    
    // What we received...
    console.log(action.name, action.related);

    // The delete operation
    delete obj[action.name];

    // The return value - Boolean
    return true;
});
```

```js
Observer.deleteProperty(obj, [ 'fruit', 'brand' ]);
```

The above should trigger our interceptor twice with `action.related` being `['fruit', 'brand']` in each case.

## Related Methods

+ [`Observer.observe()`](../../reactions/observe)
+ [`Observer.intercept()`](../../reactions/intercept)
