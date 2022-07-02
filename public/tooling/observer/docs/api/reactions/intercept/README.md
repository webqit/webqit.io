---
desc: Intercept operations performed on an object or array.
_index: 2
---
# `.intercept()`

This method is used to intercept operations performed on an object or array with custom handlers. Operations like *set*, *deleteProperty*, *get* and *has* are trapped and forwarded to these custom handlers.

## Syntax

```js
// Intercept all operations or queries
Observer.intercept(obj, handler[, params = {}]);

// Intercept a specific operation
Observer.intercept(obj, type, handler[, params = {}]);
```

**Parameters**

+ **`obj:     Object|Array`** - An object or array.
+ **`type:    String`** - The type of operation to intercept.
+ **`handler: Function`** - A function that handles the operation.

    **Syntax**

    ```js
    function(action, previous, next) {}
    ```

    **Parameters**

    + **`action:       Action`** - An [Action](../../core/Action) object containing details of the ongoing operation.
    + **`previous:    Any`** - The value passed by a previous handler in the list, if any. `undefined` if none.
    + **`next:        Function`** - A function that calls the next handler in the list, if any.

    **Return Value**

    *See [Handler Return Value](#handler-return-value) below.*

+ **`params:  Object`** - Additional parameters for the method.
    + **`tags:    Array`** - *See [Tagging an Interceptor](#tagging-an-interceptor) below*.

**Return Value**

An [*Interceptor* instance](#the-returned-interceptor-instance).

## Usage

Interception examples are documented alongside each [action type](../../actions). Below are additional examples.

*Case 1 - An imaginary product, with a computed `likes` property - a record of "user likes" -  calculated ondemand.*

```js
let product = { name: 'Product Name', likes: null };
```

Below, we're intercepting the *get* operation that accesses this property and doing the computation on the first access.

```js
Observer.intercept(product, (action, previous, next) => {
    if (action.type === 'get') {
        let propertyName = action.name;
        if (propertyName === 'likes' && product[propertyName] === null) {
            product[propertyName] =  getProductLikes(); // 50
        }
        return product[propertyName];
    }
    return next();
});
```

Now, let's see what we get for each property we access.

```js
console.log(Observer.get(product, 'name')); // 'Product Name'
console.log(Observer.get(product, 'likes')); // 50
```

*Case 2 - Transforming an incoming value for a specific property.* We'd intercept the "set" operation, this time, explicitly using the `type` parameter to specify that.

```js
Observer.intercept(obj, 'set', (action, previous, next) => {
    if (action.name === 'url' && action.value.startsWith('http:')) {
        // Continue with the flow until the set operation completes
        // The next interceptor, if any, will recieve the transformed URL
        // if none, the default handler for "set" operations will recieve the transformed URL
        return next(action.value.replace('http:', 'https:'));
    }
    // Forward all other operation to their default handlers
    return next();
});
```

Now, let's attempt setting different URLs on our object.

```js
console.log(Observer.set(obj, 'url', 'https://example.com')); // Set as-is
console.log(Observer.set(obj, 'url', 'http://example.com')); // Transformed before being set
```

## Handler Return Value

The return value expected of a handler function depends on the operation being intercepted. For mutation operations - `set`, `defineProperty`, `deleteProperty` - a *Boolean* `true/false` is what is expected as a return value to indicate the outcome of the operation. For all other operations - `keys`, `has`, `get`, etc - the return value must correspond to the result defined for the operation. For example, the return value must be an array for `keys`, a Boolean for `has`, any value for `get`, and so on.

## Tagging an Interceptor

The `params.tags` parameter can be used to tag an interceptor. Tags are an *array* of values (*strings*, *numbers*, *objects*, etc) that can be used to uniquely identify the interceptor for later retrieval. *See [`Observer.unintercept()`](../unintercept).*

```js
Observer.intercept(obj, handler, { tags: [ '#tag' ] });
```

## Cascading Multiple Interceptors

Multiple interceptors can be applied to an object. Each interceptor will forward events to the next.

An interceptor is called with `previous` - whatever value is passed from the *previous* interceptor \(or *undefined* where there is no previous interceptor\), and `next` - a function that calls the *next* interceptor \(or the default handler where there is no next interceptor\). This `next` function can be used to pass a value to the next handler.

Below, we set an additional interceptor to handle setting the `url` property. But this time, we wouldn't bother if the previous interceptor has handled the URL transformation.

```js
Observer.intercept(obj, 'set', (action, previous, next) => {
    If (previous) {
        // A previous handler has handled this!
        return next(previous);
    }
    return next();
});
```

## The Returned Interceptor Instance

The `Observer.intercept()` method returns an *Interceptor* instance with certain useful methods.

*Obtain the Interceptor instance:*

```js
let instance = Observer.intercept(obj, handler);
```

*Synthetically fire the interceptor handler:*

```js
instance.fire({
    type:'set',
    name: 'propertyName'
    value:'...',
});
```
*Disconnect the interceptor:*

```js
instance.disconnect();
```

## Related Methods

+ [`Observer.unintercept()`](../unintercept)