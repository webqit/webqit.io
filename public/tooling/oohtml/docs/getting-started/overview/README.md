---
title: Overview
desc: An overview of OOHTML.
_index: first
---
# Overview

OOHTML offers a set of five features that make common UI development paradigms possible as native web platform features. These features may be used individually or together for some great UI-authoring capabilites. Here is an overview:

+ [HTML Modules](#html-modules)
+ [HTML Imports](#html-imports)
+ [Namespaced HTML](#namespaced-html)
+ [The State API](#the-state-api)
+ [Subscript](#subscript)

## HTML Modules

*HTML Modules* is a templating feature that lets us write reusable HTML markup using the *module*, *export* and  *import* paradigm. This feature establishes the standard `<template>` element as the foundation of a module infrastructure for HTML and introduces new attributes, properties and events that together closes the loop.

A module is a regular `<template>` element with a `name` attribute - *the module ID* - and its contents are simply the *exports*.

```html
<head>

    <template name="module1">

        <label for="age">How old are you?</div>
        <input id="age" />

    </template>

</head>
```

Exports may be more properly wrapped within an `<export>` element of a designated name.

```html
<head>

    <template name="module1">

        <export name="question">
            <label for="age">How old are you?</label>
            <input id="age" />
        </export>

        <div>This is another export</div>

    </template>

</head>
```

Or they may be individually *tagged* to an export identifier using the `exportgroup` attribute.

```html
<head>

    <template name="module1">

        <label exportgroup="question" for="age">How old are you?</label>
        <input exportgroup="question" name="age" />
        
        <div>This is another export</div>

    </template>

</head>
```

Either way, they are accessed the same way using the *Modules API*.

```js
// Access module1 from document.templates
let module1 = document.templates.module1;

// Import module1's exports
let questionExport = module1.exports.question; // Array

// Clone the elements in the export
let questionExportClone = questionExport.map(el => el.cloneNode(true));
```

Taking things further, template elements may reference remote content using the `src` attribute.

```html
<head>

    <template name="module-remote" src="/bundle.html"></template>

</head>
```

The contents of the remote file automatically become the template's content on load.

**Details are in the [HTML Modules](../../spec/html-modules) specification. Learn more about the convention, API, events, and the polyfill support.**

## HTML Imports

*HTML Imports* is a declarative way to use the *exports* of an *HTML Module* from anywhere in the main document.

> Note that this is different from the HTML Imports that was spec'd with an early version of Web Components.

Here, an `<import>` element in the `<body>` area is used to *place* a corresponing *export* of an HTML module.

```html
<body>

    <!-- Import question here from module1 -->
    <import name="question" template="module1"></import>

</body>
```

Resolution takes place and the `<import>` element is replaced by all of the imported contents.

```html
<body>

    <!-- import element replaced -->
    <label for="age">How old are you?</label>
    <input id="age" />

</body>
```

Also, multiple `<import>` elements within a block can be scoped to just one *module ID* declaration.

```html
<body>

    <!-- Point to a module; one module ID for all imports within -->
    <div template="module1">

        <!-- Import question here from module1 -->
        <import name="question"></import>

        <div>
            <!-- Import another export here from module1 -->
            <import name="export-2"></import>
        </div>

    </div>

</body>
```

On resolution, an `<import>` element will stand by somewhere with a view to returning to its slot on any event that gets the slot empty. In fact, `<import>` elements maintain a *live* relationship with the modules they point to and with the contents that go into their slot.

So, if we dynamically changed the module ID declaration above to point to another module, *imports* will be resolved again, this time, from the new module.

```js
// Changing the module ID on the DIV container above will see all associated imports resolved again
document.querySelector('div[template="module1"]').setAttribute('template', 'module2');
```

This opens up new simple ways to create very dynamic applications.

**Details are in the [HTML Imports](../../spec/html-imports) specification. Learn more about the convention, dynamicity, Slot Inheritance, isomorphic rendering, and the polyfill support.**

## Namespaced HTML

Namespacing provides a way to let an element establish its own naming context for descendant elements. This makes it possible to keep IDs scoped to a context other than the document's global scope; thus the ability to write collision-free IDs across a page.

The following modular markup implements its IDs in namespaces:

```html
<article id="continents" namespace>
    <section id="europe" namespace>
        <div id="about">About Europe</b></div>
        <div id="countries">Countries in Europe</div>
    </section>
    <section id="asia" namespace>
        <div id="about">About Asia</b></div>
        <div id="countries">Countries in Asia</div>
    </section>
</article>
```

The above gives us a conceptual model of repeating objects; each encapsulating its IDs:

```html
continents
 ├⏤europe
 │   ├⏤about
 │   ├⏤countries
 ├⏤asia
     ├⏤about
     ├⏤countries
```

And beyond the point of giving us collision-free IDs, *Namespaced HTML* features an API that translates namespace models into real object trees:

```js
// Get the "continents" article
let continents = document.namespace.continents;

// Access scoped IDs with the new "namespace" DOM property
let europe = continents.namespace.europe;
let asia = continents.namespace.asia;

// And for deeply-nested IDs...
let aboutAsia = continents.namespace.asia.namespace.about;
```

We get a document structure that translates to a bankable API for building great functionalities.

> Much of our code in the examples below will now use the `namespace` attribute in markup and the `.namespace` property in JavaScript.

**Details are in the [Namespaced HTML](../../spec/namespaced-html) specification. Learn more about the convention, Namespaced Selectors, API, observability, and the polyfill support.**

## The State API

The State API is a DOM API that lets us maintain application state at the document level and at individual element levels. It brings application state closer to the UI and makes it easy to keep the UI in sync with all the changes taking place.

This API exposes a document-level *state object* on a `document.state` property, and an element-level *state object* on an `element.state` property. Arbitrary values can be set and retrieved on *state objects* the same way we would with regular objects.

```js
// At the document level
document.state.pageTitle = 'Hello World!';
console.log(document.state.pageTitle); // Hello World!

// At the element level
element.state.collapsed = true;
console.log(element.state.collapsed); // true
```

But state objects are unique in that they support *observability*. They are *live objects* that can be observed for changes using the [Observer API](../../spec/the-observer-api).

```js
Observer.observe(document.state, 'pageTitle', e => {
    console.log('New Page Title: ' + e.value);
    // Or we could reflect this state on the document title element
    document.querySelector('title').innerHTML = e.value;
});
```

This lets us build very reactive applications natively.

Using an element's state API, here's how we could make a *collapsible* component.

```html
<my-collapsible namespace>
    <div id="control">Toggle Me</div>
    <div id="content" style="height: 0px">
        Some content
    </div>
</my-collapsible>
```

```js
customElements.define('my-collapsible', class extends HTMLElement {

    /**
     * Creates the Shadow DOM
     */
    constructor() {
        super();
        // Observe state and get the UI synced
        Observer.observe(this.state, 'collapsed', e => {
            this.namespace.content.style.height = e.value ? '0px' : 'auto';
            this.setAttribute('data-collapsed', e.value ? 'true' : 'false');
        });

        // Implement the logic for toggling collapsion
        this.namespace.control.addEventListener('click', function() {
            this.state.collapsed = !this.state.collapsed;
        });
    }

});
```

Other parts of the application are also able to access the state of this element.

```js
let collapsible = document.querySelector('my-collapsible');
Observer.observe(collapsible.state, 'collapsed', e => {
    console.log(e.value ? 'element collapsed' : 'element expanded');
});
```

**Details are in the [State API](../../spec/the-state-api) specification. Learn more about the API, deep observability, and the polyfill support.**

## Subscript

[Subscript](/tooling/subscript) is a special language feature for JavaScript that lets us write *reactive* JavaScript code in plain JavaScript. *Subscript UI* is a <1KB extension of Subscript that further simplifies the concept of reactivity for UI development.

There are two approaches to using Subscript:

### (A): SubscriptElement

*SubscriptElement* is an extension of [`SubscriptClass`](/tooling/subscript/docs/spec/api#subscriptclass) - a base class *Mixin* for designating *reactive* class methods.

```js
class MyClass extends SubscriptElement( HTMLElement ) {

    static get subscriptMethods() {
        return [ 'render' ];
    }

    render() {
    }

}
```

**An *alert* element**:

```js
customElements.define( 'my-alert', class Alert extends SubscriptElement( HTMLElement ) {

    static get subscriptMethods() {
        // The list of methods to make reactive methods
        return [ 'render' ];
    }

    connectedCallback() {
        // Initial rendering
        // after which automatic selective rendering kicks in
        this.render();
    }

    render() {
        let messageElement = this.querySelector( '.message' );
        messageElement.innerHTML = globalMessage;
    }

} );
```

```js
var globalMessage = 'This site uses cookies!';
```

```html
<body>
    <my-alert>
        <div class="message"></div>
    </my-alert>
</body>
```

### (B): ScopedSubscript

*ScopedSubscript* is a `<script>`-based flavour of Subscript that lets us write *reactive* `<script>` elements right within an HTML document; each scoped to their host element instead of the global browser scope.

```html
<div id="alert">
    <script type="subscript">
        console.log( this.id ); // alert
    </script>
</div>
```

The `<script>` above is scoped to the `#alert` element - its host element; the `this` variable is a reference to the script's host element.

This lets us have reactive UI logic jsut where they are needed, without involving any JavaScript classes or files.

**An *alert* element**:

```js
var globalMessage = 'This site uses cookies!';
```

```html
<body>

    <div id="alert">

        <div class="message"></div>

        <!-- Scoped Subscript -->
        <script type="subscript">
            let messageElement = this.querySelector( '.message' );
            messageElement.innerHTML = globalMessage;
        </script>

    </div>
    
</body>
```

**Details are in the [Subscript](../../spec/subscript) specification. Learn more about the reactivity and observability concepts and the polyfill support.**

## Getting Started

You definitely want to visit the documentation for each of OOHTML's features and try everything out by pasting the code examples and running them right in your browser. Simply include the [OOHTML polyfill](../polyfill) on your page and get away with writing modular, reusable, reactive HTML without a tool! 

We're putting together a collection of examples in the [examples](../../learn/examples) section.
