---
desc: Explicitly break the event link between a parent and a child object.
---
# `.unlink()`

This function is used to explicitly break the event link between a parent and a child object such that events happening at *child* level no longer bubble up to *parent* level. 

## Syntax

```js
Observer.unlink(parent, offset, child);
```

**Parameters**

+ **`parent:              Object|Array`** - An object or array.
+ **`offset:              String|Int`** - The property name of *child* in *parent*.
+ **`child:              Object|Array`** - An object or array.

**Return Value**

*undefined*

## Usage

*An initially linked parent and child.*

```js
let parent = {};
Observer.set(parent, 'prop1', {});
```

*An observer recieving subtree events.*

```js
Observer.observe(parent, mutations => {
    // ...
}, { substree: true });
```

*An operation on child that bubbles up to parent.*

```js
Observer.set(parent.prop1, 'subprop1', {});
```

*The disconnection using Observer.unlink()*

```js
Observer.unlink(parent, 'prop1', parent.prop1);
```

Now subsequent operations on child will no longer bubble up to parent.

## Notes

See [additional notes at `Observer.link()`](../link#notes).

## Related Methods

+ [`Observer.link()`](../link)
