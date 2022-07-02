---
desc: Unbind observers previously bound with <code>Observer.observe()</code>.
_index: 1
---
# `.unobserve()`

This method is used to unbind *observers* previously bound with the [`Observer.observe()`](../observe) method.

## Syntax

```js
// Unbind all observers bound to the following property name
// regardless of the handler function
Observer.unobserve(obj, path);

// Unbind the observer bound with the following handler function
Observer.unobserve(obj, path, originalCallback);

// Unbind the observer bound with the following handler function and tags
Observer.unobserve(obj, path, originalCallback, { tags: [ ...originalTags ] });

// Unbind the observer bound with the following handler function and reflex type 
Observer.unobserve(obj, path, originalCallback, { type: ’set’ });

// Unbind all observers bound with the following tags
// regardless of the handler function
Observer.unobserve(obj, [ path, ... ], null, { tags: [ ...originalTags ] });
```

**Parameters**

+ **`obj:             Object|Array`** - An object or array.
+ **`path:            String|Array`** - If not `null`, a path to unobserve.
+ **`originalCallback: Function`** - If not `null`, the *original* callback function used during [`Observer.observe()`](../observe)
+ **`params:          Object`** - Additional parameters for the method.
        
    + **`tags:     Array`** - If not `null`, the list of the *original* tags (in any order) used during [`Observer.observe()`](../observe).


**Return Value**

*undefined*

## Usage

*See [`Observer.observe()`](../observe#usage).*

## Related Methods

+ [`Observer.observe()`](../observe)
