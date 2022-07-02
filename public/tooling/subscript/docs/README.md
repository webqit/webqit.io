---
_subtreeType: category
---
# An Overview

Subscript is a reactivity runtime for JavaScript. It takes any valid JavaScript code, reads its dependency graph, and offers a mechanism to run it both in whole and in *reactive* selections, called *dependency threads*.

## What's A Dependency Thread?

Think of it as the dependency chain involving two or more JavaScript expressions. 👇

```js
let count = 10, doubleCount = count * 2, quadCount = doubleCount * 2;
```

We just expressed that `doubleCount` should be two times the value of `count`, and that `quadCount` should be two times the value of `doubleCount`; each subsequent expression being a *dependent* of the previous.

```js
console.log( count, doubleCount, quadCount );
< 10, 20, 40
```

😉 Can you spot that same dependency chain in the following hypothetical UI render function…?

```js
let count = 10;
```

```js
let render = function() {
    let countElement = document.querySelector( '#count' );
    countElement.innerHTML = count;
    
    let doubleCount = count * 2;
    let doubleCountElement = document.querySelector( '#double-count' );
    doubleCountElement.innerHTML = doubleCount;
    
    let quadCount = doubleCount * 2;
    let quadCountElement = document.querySelector( '#quad-count' );
    quadCountElement.innerHTML = quadCount;
}
```

You'll also notice one additional *dependent* at each level of the chain. That brings the *dependency thread* for `count` to being the following sequence: `statement 2` -> `statement 3` -> `statement 5` -> `statement 6` -> `statement 8`; excluding statements `1`, `4`, `7`.

🤝 Good analysis! But what's the deal?

Programs are generally expected to run **in whole**, **not in dependency threads**! It would take some magic to have the latter. But... well, that's what's for dinner with Subscript! 😁

Problem is: the mathematical relationship above only holds for as long as nothing changes. Should the value of `count` change, then its dependents are sure out of sync.

```js
count ++;
```

```js
console.log( count, doubleCount, quadCount );
< 11, 20, 40
```

This is that reminder that expressions in JavaScript aren't automatically bound to their dependencies. (Something we'd expect of any programming language.) The `render()` function must be called again each time the value of `count` changes.

An important worry is that we end up running overheads on sebsequent calls to `render()`, as those `document.querySelector()` calls traverse the DOM again, just to return the same elements as in previous runs. (In real life, there could be even more expensive operations up there.)

Enter dependency threads; suddenly, we can get statements to run in isolation in response to a change! **Here comes a new way to think about reactivity and performance in JavaScript**! 👇

\> Obtain `SubscriptFunction` and use as a drop-in replacement for `Function`! 👇

```js
let render = new SubscriptFunction(`
    let countElement = document.querySelector( '#count' );
    countElement.innerHTML = count;
    
    let doubleCount = count * 2;
    let doubleCountElement = document.querySelector( '#double-count' );
    doubleCountElement.innerHTML = doubleCount;
    
    let quadCount = doubleCount * 2;
    let quadCountElement = document.querySelector( '#quad-count' );
    quadCountElement.innerHTML = quadCount;`
);
```

> More about the syntatic rhyme between `SubscriptFunction` and `Function` [ahead](#api).

\> Use `render` as a normal function…

```js
render();
```

*The above executes the function body in whole as we'd expect. Elements are selected and assigned content. And we can see the counters in the console.*

```js
console.log( count, doubleCount, quadCount );
< 10, 20, 40
```

\> Run just the `count` dependency thread…

```js
count ++;
render.thread( [ 'count' ] );
```

*This time, only statements `2` -> `3` -> `5` -> `6` -> `8` are run - *the "count" dependency thread*; and the previously selected UI elements in those local variables are only now updated.*

```js
console.log( count, doubleCount, quadCount );
< 11, 22, 44
```

\> Use `SubscriptFunction` as a building block.

*A Custom Element Example [here](usage/subscript-element)*

*And here is a live demo of a "count" dependency thread.*

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@WebQit/Dependency-Thread-Demo-3-Counts-Button?embed=true"></iframe>

## What Is Subscript?

A general-purpose reactivity runtime for JavaScript, with an overarching philosophy of *reactivity that is based on the dependency graph of your own code, and nothing of its own syntax*!

It takes any piece of code and compiles it into an ordinary JavaScript function that can also run expressions in *dependency threads* via a `.thread()` method!

Being function-based let's us have all of Subscript as a building block… to fit anywhere!

## Explore the Docs

*If you have questions about anything related to the Subscript, you're always welcome to ask on our [GitHub Discussions](https://github.com/webqit/subscript/discussions).*
