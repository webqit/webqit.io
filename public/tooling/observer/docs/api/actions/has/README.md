---
desc: Test property presence on an object.
_index: 2
---
# `.has()`

This method is used to test property presence. It corresponds to the native [`Reflect.has()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has) function, which is itself the programmatic alternative to the JavaScript *in* operator – `property in obj`. `Observer.has()` offers reactivity over this operation.

## Syntax

```js
// Test the presence of a property.
let exists = Observer.has(obj, propertyName[, params = {}]);
```

**Parameters**

+ **`obj:             Object|Array`** - An object or array.
+ **`propertyName:    String`** - The property to assert.
+ **`params:          OperatorParams`** - Additional parameters for the operation. *See [OperatorParams](../../core/OperatorParams). Note that the `params.eventTypeReturn` parameter cannot be used with `Observer.has()`.*

**Return Value**

+ **`exists:          Boolean**

## Usage

*An object:*

```js
let obj = {
    fruit:'orange',
    brand:'apple',
};
```

*The assertion:*

```js
let exists = Observer.has(obj, 'fruit');
```

## Usage as a Trap's "has" Handler

`Observer.has()` can be used as the "has" handler in Proxy traps.

```js
let _obj = new Proxy(obj, { has: Observer.has });
let _arr = new Proxy(arr, { has: Observer.has });
```

*Has* operations will now be forwarded to `Observer.has()`, triggering any [*interceptors*](../../../core/overview#intercept) that may be bound to the object.

```js
let exists = 'fruit' in _obj;
let exists = '1' in _arr;
```

## Intercepting `Observer.has()`

Using [`Observer.intercept()`](../../reactions/intercept), it is possible to intercept calls to `Observer.has()`. During a "has" operation, interceptors will receive an event object containing the property name being asserted.

```js
Observer.intercept(obj, 'has', (action, previous, next) => {

    // What we received...
    console.log(action.name);

    // The read operation
    return action.name in obj;
});
```

```js
let exists = Observer.has(obj, 'fruit');
```

## Related Methods

+ [`Observer.observe()`](../../reactions/observe)
+ [`Observer.intercept()`](../../reactions/intercept)
