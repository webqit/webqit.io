---
title: Action
desc: The Action class.
---
# `class Action {}`

Instances of this class represent an action record. They are internally created by [actions](../../actions) (e.g. [`Observer.set()`](../../actions/set), [`Observer.get()`](../../actions/get), and [`Observer.ownKeys()`](../../actions/ownKeys), etc) and passed to [interceptors](../../reactions/intercept).

## Constructor

```js
let action = new Action(target, details);
```

**Parameters**

+ **`target`**: **`Object|Array`** - An Object or Array - the action target.
+ **`details`**: **`Object`** - An object describing the change. This may contain any property in addition to the following required properties:
    + **`type`**: **`String`** - The type of operation. This would be the same as the name of the operation. E.g. `set` for the `set()` operation, `deleteProperty` for the `deleteProperty()` operation, `defineProperty` for the `defineProperty()` operation, etc.

## Properties

+ **`action.type`**: **`String`** - (Readonly) Returns the original `details.type` value passed to the constructor.
+ **`action.?`** - (Readonly) Any additional properties of the original `details` object passed to the constructor.
