---
desc: Create property accessors that use the Observer API behind the scenes.
_index: 6
---
# `.accessorize()`

This function is used to create property *setters* and *getters* on that use `Observer.set()` and `Observer.get()` respectively behind the scene. This gives us the benefit of using JavaScript's assignment and accessor syntax reactively.

## Syntax

```js
// Accessorize a single property
let successFlag = Observer.accessorize(obj, propertyName[, params = {}]);

// Accessorize multiple properties
let successFlags = Observer.accessorize(obj, [ propertyName, ... ][, params = {}]);

// Accessorize all existing properties
let successFlags = Observer.accessorize(obj[, params = {}]);
```

**Parameters**

+ **`obj:             Object|Array`** - An object or array.
+ **`propertyName:    String`** - The property to *accessorize*.
+ **`params:          Object`** - Additional parameters for the method.
    + **`configurable:          Boolean`** - Whether the property should be defined with a *configurable* flag. Defaults to `true`. Set to `false` to prevent the property from being deleted or reconfigured.

**Return Value**

+ **`successFlag:     Boolean`** - A flag that tells whether or not the given property was successfully accessorized.
+ **`successFlags:     Array`** - A list of flags for each property that tells whether or not the property was successfully accessorized.

## Usage

*An observer:*

```js
// We observe the 'preferences' property
Observer.observe(obj, mutations => {
    mutations.forEach(mutation => {
        console.log(mutation.type, mutation.name, mutation.path, mutation.value, mutation.oldValue);
    });
});
```

*Case 1 - Accessorize a property - on an empty object:*

```js
let obj = {};
```

*The accessorize method:*

```js
// Now we accessorize this property
Observer.accessorize(obj, 'preferences');
```

Now, assigning something to the property will fire our observer.

```js
obj.preferences = {};
```

*Case 2 - Accessorize all existing properties - on an object with existing properties:*

```js
let obj = {
    fruit: 'Mango',
    brand: 'Apple',
};
```

*The accessorize method:*

```js
// Now we accessorize this property
Observer.accessorize(obj);
```

Now, assigning something to any of the properties will fire our observer.

```js
obj.fruit = 'Orange';
```

## Related Methods

+ [`Observer.unaccessorize()`](../unaccessorize)