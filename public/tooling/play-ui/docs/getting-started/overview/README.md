---
desc: An overview of Play UI.
_index: first
---
# Overview

Play UI is a family of tools that brings a *utility-based* approach and a wholistic experience to UI development. This means: full UI authoring capabilities in the liberty and combinational power of standalone functionalities! Take an overview.

+ [Play UI JavaScript](#play-ui-javascript)
+ [Play UI Command Line](#play-ui-command-line)

> Although they share a family name, these are really independent libraries.

## Play UI JavaScript

Play UI JavaScript is a resilient, jQuery-inspired, DOM and UI abstraction library. It offers simple, but powerful, JavaScript functions that do a good job at interacting with the DOM and UI, following the most-performant way. And it's a succint API surface you'll love! ([`.html()`](../../api/dom/html), [`.play()`](../../api/ui/play), [`.on()`](../../api/ui/on), [`.off()`](../../api/ui/off), etc.)

Play UI JavaScript is designed to meet a wide range of usage styles.

### Use as You Would [jQuery](https://jquery.com)

[Include Play UI](../download#play-ui-javascript) on any page and use as you would jQuery. Play UI looks and feels just like it!

Simply obtain the *constructable Play UI function* (`$`) as shown below.

*If Play UI was loaded via a script tag:*

```js
// The constructable function would be available in a global WebQit object
const $ = window.WebQit.$;
```

*If Play UI was installed as a package:*

```js
// We would first call the initializer to obtain the constructable function
import PlayUI from '@webqit/playui-js';
const $ = PlayUI();
```

Construct instances with the `new` operator or by calling the function statically.

*With the new operator:*

```js
(new $(selector)).html('Some fun!');
```

*Statically:*

```js
$(selector).html('Some fun!');
```

Now, while total parity with jQuery's design isn't the goal, there exists good similarity: [`.html()`](../../api/dom/html), [`.append()`](../../api/dom/append), [`.prepend()`](../../api/dom/prepend), [`.attr()`](../../api/dom/attr), [`.css()`](../../api/css/css), [`.data()`](../../api/app/data), [`.on()`](../../api/ui/on), [`.off()`](../../api/ui/off), [`.trigger()`](../../api/ui/trigger).

### Use With Server-Side DOM Instances

Use Play UI on the server with server-side *DOM* instances, such as the type provided by the [jsdom](https://github.com/jsdom/jsdom) library. (Think cases like server-side rendering, web crawling, or just server-side DOM manipulation.) Here is how that could look.

*Create a `window` object:*

```js
// Utilities we'll need
import fs from 'fs';
import path from 'path';
// Import jsdom
import jsdom from 'jsdom';

// Read the HTML document file from the server
const documentFile = fs.readFileSync(path.resolve('./index.html'));
// Instantiate jsdom so we can obtain the "window" for building Play UI
// Detailed instruction on setting up jsdom is available in the jsdom docs
const JSDOM = new jsdom.JSDOM(documentFile.toString());
const window = JSDOM.window;
```

*Initialize Play UI with the window object passed in as its `this` context. (Note the `PlayUI.call()` syntax.):*

```js
// Import Play UI
import PlayUI from '@webqit/playui-js';
// Initialize
const $ = PlayUI.call(window);
// Query...
$(selector).append('Ready!');
```

The per-window initialization approach makes it possible to have Play UI running in multiple *window* instances, if we need to, without getting weird behaviours.

*Tie Play UI to multiple window instances:*

```js
const $ = PlayUI.call(window_1);
$('.some-element-in-document-1').append('This is for you!');
```
```js
const $$ = PlayUI.call(window_2);
$$('.some-element-in-document-2').append('This is for you!');
```

### Use as Descrete Utilities

Play UI's instance methods are internally based on certain core standalone functions which may be imported and used individually. The [`.on()`](../../api/ui/on) instance method, for example, is based on the standalone [`$.ui.on()`](../../api/ui/on#static-usage) function.

```js
const ( on ) = $.ui;
```
```js
import ( on ) from '@webqit/playui-js/src/ui/index.js';
```

*Standalone functions have their import syntax documented alongside their instance counterpart.*

Generally, these standalone functions work the same way as their instance counterpart, except that they initially take an *element selector* as their first argument - where *element selector* is any of the input types accepted by the initializer `$()` function.

*Compare:*

```js
$(selector).on('swipeleft', e => {
    // Handle swipe gesture
});
```
```js
on(selector, 'swipeleft', e => {
    // Handle swipe gesture
});
```

If you were to run your code in a *window* context other than the global browser window, you could use the `<Function>.call()` syntax to pass in the *window* object as the `this` context for the function.

```js
on.call(window, selector, 'swipeleft', e => {
    // Handle swipe gesture
});
```

However, functions obtained from the already initialized Play UI object `$` automatically inherit the *window* of the Play UI object `$`.

```js
// Import Play UI
import PlayUI from '@webqit/playui-js';
// Initialize
const $ = PlayUI.call(window);

// Worry no more about a window object
$.ui.on(selector, 'swipeleft', e => {
    // Handle swipe gesture
});
```

*Note that functions that are normally chainable as instance methods are not chainable when used statically. But these functions will return whatever was the `this` context passed in using `<Function>.call()`.*

### Meet Async UI

Surgically updating the UI is generally a costly operation for browsers. It happens when we write to the DOM and read from it in quick succession in a rendering cycle - causing document reflows, or better put, forced synchronous layout. (But a common word is *layout thrashing*.) This is covered in detail in [this article on Web Fundamentals](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing).

Play UI meets this challenge with a simple timing strategy that keeps UI manipulation in sync with the browser's rendering cycle. To do this, DOM operations are internally held in read/write queues, then executed in read/write batches within each rendering cycle, eliminating the forced synchronous layout problem. This is what happens under the hood with all of the Play UI functions that have the *Async* suffix; e.g [`htmlAsync()`](../../api/dom/htmlAsync). The asynchronous nature of these functions bring them under the term *Async UI*.

The order of execution of the code below demonstrates the asynchronous nature of these functions.

```js
// Set content
$(document.body).htmlAsync('Hi').then(() => {
    console.log('Completed: write operation 1');
});

// Get content
$(document.body).htmlAsync().then(content => {
    console.log('Completed: read operation 1');
});

// Set content
$(document.body).htmlAsync('Hi again').then(() => {
    console.log('Completed: write operation 2');
});

// Get content
$(document.body).htmlAsync().then(content => {
    console.log('Completed: read operation 2');
});

// ------------
// console
// ------------
Completed: read operation 1
Completed: read operation 2
Completed: write operation 1
Completed: write operation 2
```

Notice that *read* operations are executed first, then *write* operations.

Where the order of execution matters, subsequent code could be moved into the `then()` block each of the *async* functions.

```js
// Set content
$(document.body).htmlAsync('Hi').then(() => {
    console.log('Completed: write operation 1');
    // Get content
    $(document.body).htmlAsync().then(content => {
        console.log('Completed: read operation 1');
    });
});

// ------------
// console
// ------------
Completed: write operation 1
Completed: read operation 1
```

Now, where immediate DOM manipulation is still a necessity, the *Sync* counterpart of the functions above will be just as good.

```js
// Set content
$(document.body).htmlSync('Hi');
console.log('Completed: write operation 1');
// Get content
$(document.body).htmlSync();
console.log('Completed: read operation 1');

// ------------
// console
// ------------
Completed: write operation 1
Completed: read operation 1
```

Note that the *Sync* option is what is implied where no suffix is explicitly used in the function name.

```js
$(document.body).html('Hi');
console.log('Completed: write operation 1');
```

## Play UI Command Line

Play UI Command Line is a utility that lets you move certain aspects of UI authoring to a *build process*. It offers the automation that allows you to hand-author your UI in absolute free-form mode and then have everything automatically come to shape. And it's an experience at the command line you'll love!

Follow the [installation guide](../download#play-ui-command-line) to install the Play UI CLI.

### HTML Modules Bundling

Supercharge your UI templating! Author your HTML templates as standalone HTML files and automatically bundle them from the filesystem into shippable [HTML modules](/tooling/oohtml/docs/getting-started/overview#html-modules).

Command: [`playui bundle`](../../cli/bundle).

### Subscript-to-WC Compilation

Taking the liberty with [Subscript](/tooling/oohtml/docs/getting-started/overview#subscript)? There's a way to have *Subscript* come off as Web Components - to give you the best of both worlds, without the difficulty of the latter!

Command: *comming soon.*

### HTML-to-CSS Aggregation

Take the process out of writing CSS! Instead of having to have every class already defined in CSS before using in HTML, try a process that automatically writes your CSS classes to file from looking in your HTML!

Command: *comming soon.*

## Next Steps

The [download options](../download).
