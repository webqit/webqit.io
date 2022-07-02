---
desc: Restore an object's accessorized properties to their original state.
_index: 7
---
# `.unaccessorize()`

This function is used to restore an object's accessorized properties to their original state.

## Syntax

```js
// Unaccessorize a single property
let successFlag = Observer.unaccessorize(obj, propertyname[, params = {}]);

// Unaccessorize multiple properties
let successFlags = Observer.unaccessorize(obj, [propertyname, ...][, params = {}]);

// Unaccessorize all previously accessorized properties
let successFlags = Observer.unaccessorize(obj[, params = {}]);
```

**Parameters**

+ **`obj:             Object|Array`** - an object or array.
+ **`propertyName:    String`** - the property to *unaccessorize*.
+ **`params:          OperatorParams`** - Additional parameters for the operation. *See [OperatorParams](../../core/OperatorParams). Note that the `params.eventTypeReturn` parameter cannot be used with `Observer.unaccessorize()`.*

**Return Value**

+ **`successFlag:     Boolean`** - A flag that tells whether or not the given property was successfully unaccessorized.
+ **`successFlags:     Array`** - A list of flags for each property that tells whether or not the property was successfully unaccessorized.

## Usage

Unaccessorizing an initially accessorized property.

*An observer:*

```js
let obj = {};
Observer.observe(obj, 'preferences', mutations => {
    mutations.forEach(mutation => {
        console.log(mutation.type, mutation.name, mutation.path, mutation.value, mutation.oldValue);
    });
});
```

*Accessorizing the property:*

```js
Observer.accessorize(obj, 'preferences');
```

*Assigning something to the property with reactivity:*

```js
obj.preferences = {};
```

*Unaccessorizing the property:*

```js
Observer.unaccessorize(obj, 'preferences');
```

*Now, zero reactivity on further assignments:*

```js
obj.preferences = {};
```

## Related Methods

+ [`Observer.accessorize()`](../accessorize)