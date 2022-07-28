---
title: OperatorParams
desc: The OperatorParams object.
---
# `OperatorParams {}`

This is an object of additional parameters that may be passed with any [action](../../actions).

## Properties

*Properties that can be passed by any action:*

+ **`namespace:   String`** - (Experimental) A *namespace* under which to perform the action.

*Properties that can be passed by mutators ([`Observer.set()`](../../actions/set), [`Observer.defineProperty()`](../../actions/defineProperty), and [`Observer.deleteProperty()`](../../actions/deleteProperty))*

+ **`detail:   Any`** - An optional value to pass to observers. *See [Passing a Value to Observers](#passing-a-value-to-observers) below.*
+ **`eventTypeReturn:   Boolean`** - Whether to return the *Event Object* for the operation. *Learn more at [Negotiating With Operators](../Event#negotiating-with-operators).*
+ **`cancellable:      Boolean`** - Whether the default taken after this operation is cancellable by observers. *Learn more at [Negotiating With Operators](../Event#negotiating-with-operators).*

## Passing a Value to Observers

The `params.detail` property can be used by mutators to pass a value specifically to observers that might be responding to an operation. Any type of value can be passed.

```js
Observer.deleteProperty(obj, propertyName, {
    detail: 'This is observer-specific detail',
});
```

The *detail* above would now be available to every observer.

```js
Observer.observe(obj, propertyName, mutation => {
    console.log(mutation.detail);
});
```
