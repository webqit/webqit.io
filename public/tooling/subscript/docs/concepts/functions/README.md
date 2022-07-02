---
desc: About Functions.
_index: 5
---
# Functions

Functions are *static* definitions...

```js
function sum( a, b ) {
}
```

```js
let sum = function( a, b ) {
}
```

```js
let sum = ( a, b ) => {
}
```

...and nothing about their parameters is reactive!

They are really only significant at *call-time*; and call-time arguments are rightly *reactive*!

```js
let result = sum( score, 100 );
```

*The expression above is bound to the reference `score`. A thread event for `score` gets the `sum()` function called again with its current value.*

## Side Effects

When a function modifies anything outside of its scope, it is said to have *side effects*.

```js
let callCount = 0;
function sum( a, b ) {
    callCount ++;
    return a + b;
}
```

When it does not, it is said to be a *pure function*.

```js
function sum( a, b ) {
    return a + b;
}
```

Regardless, Subscript's dependency threads are fully able to pick up changes made via a side effect. (Side effects made by class methods are currently not being detected.)


```js
function sum( a, b ) {
    callCount ++;
    return a + b;
}
let callCount = 0;
let result = sum( score, 100 );
console.log( 'Number of times we\'ve summed:', callCount );
```

*Above, each time the thread event for `score` gets the `sum()` expression to run again, `callCount` is incremented as a side effect; and the dependent `console.log()` expression joins in the thread to pick that up!*

Since statements in a dependency thread are executed in normal program execution order, side effects only trigger dependent expressions that appear *after the point of call*, *not before*.


```js
function sum( a, b ) {
    callCount ++;
    return a + b;
}
let callCount = 0;
console.log( 'BEFORE POINT OF CALL: Number of times we\'ve summed:', callCount );
let result = sum( score, 100 );
console.log( 'AFTER POINT OF CALL: Number of times we\'ve summed:', callCount );
```

*Above, on the thread event for `score`, the first `console.log()` expression doesn't run because at that point `sum()` hasn't been called to make the side effect!*

Also, since Subscript does not change runtime expection in any way, side effects made by function calls outside of a running thread do not get to start a thread in a bid to engage its dependent expressions!

```js
function sum( a, b ) {
    callCount ++;
    return a + b;
}
let callCount = 0;
document.body.addEventListener( 'click', () => {
    let result = sum( score, 100 );
} );
console.log( 'Number of times we\'ve summed:', callCount );
```

*This time, `sum()` is triggerred from a click event handler, not via a dependency thread, and we do not expect the `console.log()` expression to run!*

## Subscript Function Syntax (`**`)

Subscript explores the possibility of defining functions outright as *reactive* functions using regular *Function Declaration* and *Function Expression* syntaxes!

```js
function** sum( a, b ) {
}
```

```js
let sum = function**( a, b ) {
}
```

*Notice the double star `**` symbol above; it's just one star extra to the standard syntax for [Generator Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) (`function* gen() {}`) - one more thing in the same classification of a special-purpose function in JavaScript! 😎*

Functions defined this way are compiled as `SubscriptFunction`, exposing a `.thread()` method for running dependency threads, and offering everything else as in when we use the `SubscriptFunction` constructor.

The following syntaxes produce a reactive function...

```js
function** sum( a, b ) {
    return a + b;
}
```

```js
let sum = function**( a, b ) {
    return a + b;
}
```

```js
let sum = new SubscriptFunction( `a`, `b`, `return a + b;` );
```

...but the first two (proposed syntaxes) are only currently supported within a Subscript Function itself!

```js
let score = 10;
let program = new SubscriptFunction(`
    function** sum( a, b ) {
        callCount ++;
        return a + b;
    }

    let callCount = 0;

    // The following call results in a side effect
    let result = sum( score, 100 );

    // and "callCount" is logged as "1" to the console 
    console.log( 'Number of times we\'ve summed:', callCount );

    // The following call runs a dependency thread that excludes the side effect
    // while return the sum of the previous values of "a" and "b"
    let result = sum.thread( [ 'a' ] );
    
    // and "callCount" is still logged as "1", not "2", to the console 
    console.log( 'Number of times we\'ve summed:', callCount );
`);
program();
```

Objects and classes have an equivalent syntax for a Subscript method...

```js
let myObject = {
    sum: function**( a, b ) {
        return a + b;
    }
}
```

```js
let myObject = {
    **sum( a, b ) {
        return a + b;
    }
}
```

```js
class MyClass {
    **sum( a, b ) {
        return a + b;
    }
}
```

...but these (proposed) syntaxes are only currently supported from within Subscript Function itself! (Also, class methods only currently support the double-star syntax at face value; they do not yet compile as Subscript methods.)

However, Subscript offers a *[Class Mixin](../../api#subscriptclass)* that automatically reredefines class methods as Subscript methods.

```js
class MyClass extends SubscriptClass() {

    static get subscriptMethods() {
        return [ 'sum' ];
    }

    sum( a, b ) {
        return a + b;
    }
}
```

```js
class MyClass extends SubscriptClass( HTMLElement ) {

    static get subscriptMethods() {
        return [ 'render' ];
    }

    render() {
    }
}
```
