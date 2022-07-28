---
desc: About Loops.
_index: 4
---
# Loops

When the parameters of a loop ("For" loops, "While" and "Do … While" loops) contain references, the loop is bound to those references. This lets us have reactive loops.

## A `for` Loop, `while` And `do … while` Loop

A "For" loop is bound to references in its 3-part definition.

```js
let start = 0;
let items = [ 'one', 'two', 'three', 'four', 'five' ];
let targetItems = [];
```

```js
for ( let index = start; index < items.length; index ++ ) {
    targetItems[ index ] = items[ index ];
}
```

*The loop above is bound to the references `start`, `items`, and `items.length`. A thread event for any of these gets the loop to run again.*

```js
// Say, "start" were a global variable
start = 2;
fn.thread( [ 'start' ] );
```

```js
// Say, "items" were a global variable
items.unshift( 'zero' );
fn.thread( [ 'items', 'length' ] );
```

As with a "For" loop, a "While" and "Do ... While" loop are bound to references in their "test" expression.

```js
let index = 0;
let items = [ 'one', 'two', 'three', 'four', 'five' ];
let targetItems = [];
```

```js
while ( index < items.length ) {
    targetItems[ index ] = items[ index ];
    index ++;
}
```

*The loop above is bound to the references `items` and `items.length`. A thread event for any of these gets the loop to run again.*

```js
// Say, items were global variables
items.unshift( 'zero' );
fn.thread( [ 'items', 'length' ] );
```

## A `for … of` Loop

A "For ... Of" loop is bound to references in its *iteratee*.

```js
let  entries = [ 'one', 'two', 'three', 'four', 'five' ];
let targetEntries = [];
```

```js
for ( let entry of entries ) {
    let index = entries.indexOf( entry );
    console.log( `Current iteration index is: ${ index }, and entry is: '${ entry }'` );
    targetEntries[ index ] = entries[ index ];
}
```

*The loop above is bound to the reference `entries`. A thread event for `entries` gets the loop to run again.*

```js
// Say, entries were a global variable
entries = [ 'six', 'seven', 'eight', 'nine', 'ten' ];
fn.thread( [ 'entries' ] );
```

As an added advantage of this form of loop, updating a specific entry in `entries` moves the loop's pointer to the specific iteration involving that entry, and the body of that iteration is run again.

```js
entries[ 7 ] = 'This is new eight';
fn.thread( [ 'entries', 7 ] );
```

Now, the console reports…

```js
Current iteration index is: 7, and entry is: 'This is new eight'
```

…and index `7` of `targetEntries` is updated.

## A `for … in` Loop

A "For ... In" loop is bound to references in its *iteratee*.

```js
let  entries = { one: 'one', two: 'two', three: 'three', four: 'four', five: 'five' };
let targetEntries = {};
```

```js
for ( let propertyName in entries ) {
    console.log( `Current property name is: ${ propertyName }, and associated value is: '${ entries[ propertyName ] }'` );
    targetEntries[ propertyName ] = entries[ propertyName ];
}
```

*The loop above is bound to the reference `entries`. A thread event for `entries` gets the loop to run again.*

```js
// Say, entries were a global variable
entries = { six: 'six', seven: 'seven', eight: 'eight', nine: 'nine', ten: 'ten' };
fn.thread( [ 'entries' ] );
```

As an added advantage of this form of loop, updating a specific property in `entries` moves the loop's pointer to the specific iteration involving that property, and the body of that iteration is run again.

```js
entries[ 'eight' ] = 'This is new eight';
fn.thread( [ 'entries', 'eight' ] );
```

Now, the console reports…

```js
Current property name is: eight, and property value is: 'This is new eight'
```

…and the property `eight` of `targetEntries` is updated.

## Iteration States

Conceptually, each round of iteration in a loop is an instance that Subscript can access directly when running a thread. A round of iteration is thus updatable in isolation, in response to a directed event. This is what happens when the *iteratee* of a "For ... Of" and "For ... In" loop has any of its properties updated, as seen above.

Below is a similar case.

```js
let  entries = { one: { name: 'one' }, two: { name: 'two' } };
let targetEntries = {};
```

```js
for ( let propertyName in entries ) {
    console.log( `Current property name is: ${ propertyName }, and its alias name is: '${ entries[ propertyName ].name }'` );
    targetEntries[ propertyName ] = entries[ propertyName ];
}
```

On updating the first entry, only the first round of iteration is executed again.

```js
entries[ 'one' ] = { name: 'New one' };
fn.thread( [ 'entries', 'one' ] );
```

For even more granularity, individual expressions inside a round of iteration are also responsive to thread events of their own. So, if we updated just `entries.one.name`…

```js
entries.one.name = 'New one';
fn.thread( [ 'entries', 'one', 'name' ] );
```

…we would have skipped the iteration instance itself, to target just the first statement within it.

This granular reactivity makes it often pointless to trigger a full rerun of a loop, offering multiple opportunities to deliver unmatched performance.

## Breakouts

Subscript observes `break` and `continue` statements even when running a thread. And any of these statements may employ *labels*.

```js
let  entries = { one: { name: 'one' }, two: { name: 'two' } };
```

```js
parentLoop: for ( let propertyName in entries ) {
    childLoop: for ( let subPropertyName in entries[ propertyName ] ) {
        If ( propertyName === 'one' ) {
            break parentLoop;
        }
        console.log( propertyName, subPropertyName );
    }
}
```
