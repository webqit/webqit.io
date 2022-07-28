---
desc: Explicitly create event links between a parent object and each of its children objects.
---
# `.build()`

This function is used to explicitly create event links between a parent object and each of its children objects such that events happening at *child* level can bubble up to *parent* level.  Event links are, under the hood, created using the [`Observer.link()`](../link) method.

## Syntax

```js
Observer.build(obj, paths = null, subtree = false);
```

**Parameters**

+ **`obj:              Object|Array`** - An object or array.
+ **`paths:              Array`** - An array of paths as used with [`Observer.observe()`](../../reactions/observe).
+ **`subtree:              Boolean`** - Whether or not to build recursively down the tree.

**Return Value**

*undefined*

## Usage

*An statically-made object tree that has no event linking between parents and children*

```js
let tree = {
    level1_a: {
        level2: {},
    },
    level1_b: {
        level2: {},
    }
};
```

*An observer recieving subtree events.*

```js
Observer.observe(tree, mutations => {
    // ...
}, { substree: true });
```

At this time, events happening down the tree do not bubble up. No event linking in the object tree.

```js
Observer.set(tree.level1_a.level2, 'subprop1', {});
```

*The event linking.*

```js
Observer.build(tree, null, true);
```

Now, events happening down the tree will bubble up

```js
Observer.set(tree.level1_a.level2, 'subprop1', {});
```

Additionally, if we wanted to build just a specific path down the tree, we would use the `paths` parameter.

```js
Observer.build(tree, [ 'level1_a', 'level2' ]);
```

Now, events happening down the specified path will bubble up

```js
Observer.set(tree.level1_a.level2, 'subprop1', {});
```

Events happening elsewhere will not bubble up

```js
Observer.set(tree.level1_b.level2, 'subprop1', {});
```

## Notes

See [additional notes at `Observer.link()`](../link#notes).

## Related Methods

+ [`Observer.link()`](../link)
+ [`Observer.unlink()`](../unlink)
