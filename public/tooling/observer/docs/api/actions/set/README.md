---
desc: Reactively set the value of an object's property.
_index: first
---
# `.set()`

This method is used to reactively set the value of an object's property. It corresponds to the JavaScript's [`Reflect.set()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set) function, which is itself the programmatic alternative to the assignment expression – `object.property = value`. `Observer.set()` offers reactivity over this operation.

## Syntax

```js
// Set or modify a specific property
Observer.set(obj, propertyName, value[, params = {}]);

// Set or modify a list of properties with the same value
Observer.set(obj, propertyNames, value[, params = {}]);

// Perform multiple key/value assignments
Observer.set(obj, keyValueMap[, = {}]);
```

**Parameters**

+ **`obj:             Object|Array`** - An object or array.
+ **`propertyName:    String|Number`** - The property to create or update.
+ **`propertyNames:   Array`** - A list of properties to create or update. *These will be assigned the same value.*
+ **`value:           Any`** - The value to set.
+ **`keyValueMap:     Object`** - An object of key/value pairs.
+ **`params:          OperatorParams`** - Additional parameters for the operation. *See [OperatorParams](../../core/OperatorParams).

**Return Value**

+ **Boolean** - This is either `true` or `false` on the outcome of the operation.
+ **Event** - The returned [Event](../../../core/Event) object for the operation when the `params.eventTypeReturn` is set to `true`. *Learn more at [Negotiating With Operators](../../core/Event#negotiating-with-operators).*

## Usage

*Case 1 - Setting a specific property:*

```js
// On an object
Observer.set(obj, 'fruit', 'orange');
```

```js
// On an array
Observer.set(arr, 0, 'orange');
```

*Case 2 - Setting multiple properties:*

```js
// On an object
Observer.set(obj, {
    fruit:'apple',
    brand:'apple'
});
```

```js
// On an array
// Provide key/value as an object
Observer.set(arr, {
    0:'apple',
    3:'apple'
});
```

*Case 3 - Setting multiple properties - with a shared value:*

```js
// On an object
Observer.set(obj, [ 'fruit', 'brand' ], 'apple');
```

```js
// On an array
Observer.set(arr, [0, 3], 'apple');
```

## Usage as a Trap's "set" Handler

`Observer.set()` returns a *Boolean* value for *set* operations and can, therefore, be used as the "set" handler in Proxy traps.

```js
let _obj = new Proxy(obj, {set: Observer.set});
let _arr = new Proxy(arr, {set: Observer.set});
```

Assignment operations will now be forwarded to `Observer.set()` and triggering any [*interceptors*](../../../core/overview#intercept) and [*observers*](../../../core/overview#observe) that may be bound to the object.

```js
_obj.fruit = 'apple';
_arr[2] = 'Item 3';
```

## Usage with Property Setters

It is possible to implement *property setters* that use `Observer.set()` behind the scene. This gives us the benefit of using JavaScript's assignment syntax reactively.

This is automatically done by the [`Observer.accessorize()`](../../actors/accessorize) method.

```js
// Virtualize a property or multiple properties
Observer.accessorize(obj, 'fruit');
Observer.accessorize(obj, [ 'fruit', 'brand' ]);
```

Now assigning on the properties will trigger any [*interceptors*](../../../core/overview#intercept) and [*observers*](../../../core/overview#observer) that may be bound to the object.

```js
// Now we can do without Observer.set
obj.fruit = 'apple';
obj.brand = 'apple';
```

## Intercepting `Observer.set()`

Using [`Observer.intercept()`](../../reactions/intercept), it is possible to intercept calls to `Observer.set()`. During a "set" operation, interceptors will receive an event object containing the property name being set and the assignable value.

```js
Observer.intercept(obj, 'set', (action, previous, next) => {
    
    // What we received...
    console.log(action.name, action.value);

    // The assignment operation
    obj[action.name] = action.value;

    // The return value - Boolean
    return true;
});
```

```js
Observer.set(obj, 'fruit', 'orange');
```

The interceptor is expected to return *true* if the custom operation was successful; *false* otherwise.

When the "set" operation is of multiple key/value assignments, an interceptor will get fired for each pair while also recieving the total list of properties as a hint - via `action.related`.

```js
Observer.intercept(obj, 'set', (action, previous, next) => {

    // What we received...
    console.log(action.name, action.value, action.related);

    // The assignment operation
    obj[action.name] = action.value;

    // The return value - Boolean
    return true;
});
```

```js
Observer.set(obj, {fruit: 'orange', brand:'apple'});
```

The above should trigger our interceptor twice with `action.related` being `[ 'fruit', 'brand' ]` each time.

## Related Methods

+ [`Observer.observe()`](../../reactions/observe)
+ [`Observer.intercept()`](../../reactions/intercept)
