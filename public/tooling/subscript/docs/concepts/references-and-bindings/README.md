---
desc: About References And Bindings.
_index: 2
---
# References And Bindings

Expressions and statements in Subscript maintain a binding to their references. And that's the basis for reactivity in Subscript.

For example, variable declarations, with `let` and `var`, and assignment expressions, are bound to any references that may be in their argument. (`const` declarations are an exception as they're always *const* in nature.)

```js
var tense = score > 50 ? 'passed' : 'failed';
```

*Above, the assignment expression is bound to the reference `score`; and thus responds to a thread event for `score`.*

The thread continues with any susequent bindings to the `tense` variable itself...

```js
let message = `Hi ${ candidate.firstName }, you ${ tense } this test!`;
```

*Above, the assignment expression is bound to the references `candidate`, `candidate.firstName`, and `tense`; and thus responds to a thread event for each.*

And the thread continues with any susequent bindings to the `message` variable itself... and any bindings of those bindings...

```js
let fullMessage = [ message, ' ', 'Thank you!' ].join( '' );
```

```js
let broadcast = { [ candidate.username ]: fullMessage };
```

```js
console.log( broadcast );
```

```js
let broadcastInstance = new BroadcastMessage( broadcast );
```

And ES6 syntax niceties can come in anywhere.

```js
let { username, profile: { avatar: avatarUrl } } = candidate;
```

*And that's essentially two variables declared up there: `username` and `avatarUrl`! And while `username` is bound to `candidate.username`, `avatarUrl` is bound to `candidate.profile.avatar`. Each gets updated independent of the other; in sync with their own binding. (But a thread event for their common root object - `candidate` - gets both variables updated.)*
