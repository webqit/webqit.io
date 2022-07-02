---
title: Mutation
desc: The Mutation class.
---
# `class Mutation {}`

Instances of this class represent a mutation record. They are internally created by mutators ([`Observer.set()`](../../actions/set), [`Observer.defineProperty()`](../../actions/defineProperty), and [`Observer.deleteProperty()`](../../actions/deleteProperty)) and passed to [observers](../../reactions/observe).

## Constructor

```js
let mutation = new Mutation(target, details);
```

**Parameters**

+ **`target`**: **`Object|Array`** - An Object or Array - the mutation target.
+ **`details`**: **`Object`** - An object describing the mutation. This may contain any property in addition to the following required properties:
    + **`type`**: **`String`** - The type of operation. E.g. `set` for a `set()` operation, `deletion` for a `deleteProperty()` operation, `definition` for a `defineProperty()` operation, etc.
    + **`name`**: **`String`** - The name of the property being mutated.

## Properties

+ **`mutation.type`**: **`String`** - (Readonly) Returns the original `details.type` value passed to the constructor.
+ **`mutation.name`**: **`String`** - (Readonly) Returns the original `details.name` value passed to the constructor.
+ **`mutation.path`**: **`Array`** - (Readonly) Returns the dynamically derived path of the mutation point in the object tree.
+ **`mutation.?`** - (Readonly) Any additional properties of the original `details` object passed to the constructor.
