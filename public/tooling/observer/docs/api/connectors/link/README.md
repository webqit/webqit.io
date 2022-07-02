---
desc: Explicitly establish an event link between a parent and a child object.
---
# `.link()`

This function is used to explicitly establish an event link between a parent and a child object such that events happening at *child* level can bubble up to *parent* level.

## Syntax

```js
Observer.link(parent, offset, child);
```

**Parameters**

+ **`parent:              Object|Array`** - An object or array.
+ **`offset:              String|Int`** - The property name of *child* in *parent*.
+ **`child:              Object|Array`** - An object or array.

**Return Value**

*undefined*

## Usage

*An explicit event link between a parent and child that are not hierarchically related.*

```js
let parent = {};
let child = {};
Observer.set(parent, 'prop1', child);
```

*An observer recieving subtree events from child.*

```js
Observer.observe(parent, mutations => {
    console.log(mutations[0].path);
}, { substree: true });
```

*An operation on child that bubbles up to parent, with event path being `[ 'prop1', 'subprop1' ]`.*

```js
Observer.set(child, 'subprop1', {});
```

## Notes

Observer's mutation methods, like [`Observer.set()`](../../actions/set), already automatically manage event links between any parent and child objects such that `Observer.link()` and `Observer.unlink()` need not be explicitly used.

+ Any parent and child objects are automatically linked by the `Observer.set()` and `Observer.defineProperty()` methods.

    ```js
    let parent = {};
    let child1 = {};
    let child2 = {};
    Observer.set(parent, 'prop1', child1);
    ```

    Events happening at child level will bubble up to parent.

    On setting a new child object to that same property, the previous child object will be automatically unlinked, and the new child object linked.

    ```js
    Observer.set(parent, 'prop1', child2);
    ```

+ Any parent and child objects are automatically unlinked by the `Observer.deleteProperty()` method.

    ```js
    Observer.deleteProperty(parent, 'prop1');
    ```

    Events happening at child level will no longer bubble up to parent.

The `Observer.link()` and `Observer.unlink()` methods are, therefore, only good for explicitly managing the event linking between two objects that are not actually hierarchically related or whose relationship was established (or broken) outside of Observer's mutation methods.

## Related Methods

+ [`Observer.unlink()`](../unlink)
