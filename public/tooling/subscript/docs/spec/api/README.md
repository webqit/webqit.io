---
title: API
desc: The SubscriptFunction API.
_index: 2
---
# API

## SubscriptFunction

`SubscriptFunction` is a one-to-one equivalent of the [JavaScript Function constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function). They work interchangeably 😎.

### Syntax

```js
// Statically
let subscrFunction = SubscriptFunction( functionBody );
let subscrFunction = SubscriptFunction( arg1, functionBody );
let subscrFunction = SubscriptFunction( arg1, ... argN, functionBody );

// With the new operator
let subscrFunction = new SubscriptFunction( functionBody );
let subscrFunction = new SubscriptFunction( arg1, functionBody );
let subscrFunction = new SubscriptFunction( arg1, ... argN, functionBody );
```

### Parameters

#### `arg1, ... argN`

Names to be used by the function as formal argument names. Each must be a string that corresponds to a valid JavaScript parameter (any of plain identifier, rest parameter, or destructured parameter, optionally with a default), or a list of such strings separated with commas.

#### `functionBody`

A string that represents the function body.

### Return Value

A regular `Function` object, or an `async function` object where the `await` keyword is used within `functionBody`.

```js
// Create a regular function - sum
let sum = SubscriptFunction( 'a', 'b', 'return a + b;' );

// Call the returned sum function and log the result
console.log( sum( 10, 2 ) );
< 12
```

```js
// Create an async function - sum
let sum = SubscriptFunction( 'a', 'b', 'return a + await b;' );

// Call the returned sum function and log the result
sum( 10, 2 ).then( result => {
    console.log( result );
} );
< 12
```

### The `this` Binding

Functions returned by `SubscriptFunction` are standard functions that can have their own [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) binding at *call time*.

```js
// Create a function - colorSwitch - that sets a DOM element's color
let colorSwitch = SubscriptFunction( 'color', 'this.style.color = color;' );

// Call colorSwitch, with document.body as it's this binding
let element = document.body;
colorSwitch.call( element, 'red' );
```

But, where the `this` binding is `undefined` at call time, the `this` binding of the `SubscriptFunction` itself is used. This lets us have a default `this` binding at *creation time*.

```js
// Create the same colorSwitch, this time, with a this binding that can be used at call time
let element = document.body;
let colorSwitch = SubscriptFunction.call( element, 'color', 'this.style.color = color;' );

// Call colorSwitch, without a this binding
colorSwitch( 'red' );
colorSwitch.call( undefined, 'red' );

// Call colorSwitch, with a different this binding
let h1Element = document.getElementById( 'h1' );
colorSwitch.call( h1Element, 'red' );
```

### The `subscrFunction.thread()` Method

The `.thread()` method is the *reactivity* API in Subscript functions that lets us send *thread events* into the *reactivity runtime*. It constitues one clear interaction point and enables a one-liner approach to reactivity.

It takes a list of the outside variables or properties that have changed; each as an array path.

##### Syntax

```js
let returnValue = subscrFunction.thread( path1, ... pathN );
```

##### Parameters

##### `path1, ... pathN`

An array path representing each variable, or object property, that has changed. *See [Thread Events](../../concepts/thread-events) for concepts and usage.*

#### Return Value

The return value of this method depends on the return value of the *dependency thread* it initiates within the function body.

```js
// Global variables to use
a = 10;
b = 2;

// Create a function with two possible values
let sum = SubscriptFunction(`
    if ( a > 10 ) {
        return a + await b;
    }
    return a + b;
`);

// Run normally
console.log( sum() );
< 12

// Run a thread with a different return value
a = 20;
console.log( sum.thread( [ 'a' ] ) );
< Promise { 22 }
```

## SubscriptClass

`SubscriptClass` is a *convenience* base class *Mixin* that automatically transforms regular class methods as Subscript methods.

### Syntax

```js
class MyClass extends SubscriptClass( [ BaseClass = null ] ) {

    static get subscriptMethods() {
        return [ methodName, ... methodNameN ];
    }

    method() {
    }
}
```

### Parameters

#### `BaseClass`

An optional base class that should be extended.

#### `methodName, ... methodNameN`

Names of the methods that should be transformed to Subscript methods.

### Return Value

A *class* object.

*See [here](../../usage/subscript-element) for usage examples*
