---
desc: About Thread Events.
_index: first
---
# Thread Events

Subscript is not concerned with how changes happen or are detected on the outer scope of the function. It simply gives us a way to announce that something has changed. That announcement is called a *thread event*.

A Subscript function has a `thread()` method that lets us trigger a thread for the list of outside variables or properties that have changed.

```js
let a = 'Apple', b = 'Banana', c = { prop: 'Fruits' };
```

```js
let fn = new SubscriptFunction(`
    console.log( \`The value of 'a' is: \${ a }\` );
    console.log( \`The value of 'b' is: \${ b }\` );
    console.log( \`The value of 'c.prop' is: \${ c.prop }\` );
`);
```

```js
// Initial run
fn();
```

```js
// Updates and threads
b = 'Breadfruit';
fn.thread( [ 'b' ] );
```

The array syntax allows us to represent properties as paths.

```js
fn.thread( [ 'c', 'prop' ] );
```

And we can run one thread for multiple changes.

```js
fn.thread( [ 'a' ], [ 'b' ] );
```

Variable declarations within the function belong in their own scope and do not respond to outside events. But their containing expression may also maintain a binding to those variables from the outside scope.

```js
let fn = new SubscriptFunction(`
    let a = 'Apple', b = 'Banana' + ' ' + c.prop;
    console.log( \`The value of 'a' is: \${ a }\` );
    console.log( \`The value of 'b' is: \${ b }\` );
    console.log( \`The value of 'c.prop' is: \${ c.prop }\` );
`);
```

```js
// Initial run
fn();
```

```js
// The following events will have no effect since "a" and "b" are local variables.
fn.thread( [ 'a' ], [ 'b' ] );
```

```js
// The local variable "b" will be part of the dependency thread of "c.prop"
// (The console will therefore show the result of the last two statements in the function)
fn.thread( [ 'c', 'prop' ] );
```