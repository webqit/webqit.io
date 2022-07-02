> components

I might need direct pointers to the areas of comparison you have in mind. But OOHTML and Web Components aren't competing for the same problems. OOHTML is seeking to address aspects that (we think) do not necessarily fall in the domain of Web Components. Yet, it bases itself off Web Components to offer a higher-level feature set. And in turn, these feature set comes with a simpler way to make Web Components. (Lest the name "OOHTML" sounds like a big thing to ask, think of it as simply a codename for a set of features that solve common HTML-related difficulties.)

For example:

1. Web Components gives us the `<template>` element for keeping reusable markup. Using standard APIs like the `.querySelector()` method, we are able to find these contents and put them to use. But in-between lies additional questions that OOHTML seeks to answer:

    + Since every piece of HTML has be identified by a CSS selector in order to be accessible by `.querySelector()`, why don't we have a common naming convention for `<template>` elements or their contents? You'll realise that this is a component system without a proper naming system and it has all been half the feature. OOHTML introduces this missing naming convention: `<template name="module1"></template>` and builds on it to come off with something that works like [a module system for HTML](http://webqit.io/tooling/oohtml/docs/getting-started/overview#html-modules). For example it introduces nesting of these modules to make for structuring markup bundles: 

        ```html
        <template name="module1">

            <div>A reusable DIV</div>

            <template name="nested_module1">
                <div>A reusable DIV</div>
            </template>

        </template>
        ```

        It goes further to introduce identifiers for the reusable contents in a `<template>` element and calls them module exports:

        ```html
        <template name="module1">

            <div exportgroup="export1">A reusable DIV</div>

            <!-- Or to put it another way: -->
            <export name="export1">
                <div>A reusable DIV</div>
            </export>

            <template name="nested_module1">
                <!-- And an identifier may not always be necessary too. We'll call the contents without an identifier as collectively the "default export" -->
                <div>A reusable DIV</div>
            </template>

        </template>
        ```

        And lastly, OOHTML introduces an `src` attribute for referencing remote content for a `<template>` element. Why deal with an imperative API - `fetch()` - for this when we can simply do what we already do for remote stuffs: `<script src=""></script>`, `<img src=""></img>`, etc.!

        ```html
        <template name="module1" src="/bundle.html"></template><!-- a "load" event is fired on load -->
       <!-- -->
        ```
       
        We might not realise it, but these are questions each developer would have to answer for himself; and well, for no extra benefit.

    + How do we take this JavaScript - `.querySelector('template[name="module1"] > [div[exportgroup="export1"]')` - out of the picture in cases where we simply want to place a piece of markup from a `<template>` element into document body? OOHTML introduces [the `<import>` element](http://webqit.io/tooling/oohtml/docs/getting-started/overview#html-imports)!
    
        ```html
        <body>

            <!-- Named imports -->
            <import template="module1" name="export1"></import>
            
            <!-- Default exports: exports without an identifier will all be imported below -->
            <import template="module1/nested_module1"></import>

        </body>
        ```

    + How do we take the CSS selectors - `.querySelector('template[name="module1"] > [div[exportgroup="export1"]')` - completely out of JavaScript code where we need to programmatically reuse *exports*? OOHTML offers modules and their exports as objects and properties:

        ```js
        let module1 = document.templates.module1;
        let export1 = module1.exports.export1;
        let deepdefaultExport = module1.templates.nested_module1.exports.default;
        ```

    + How does this enhance Web Components development? One scenario is when we need to use web components (or even regular elements) from remote sources (or even third-party vendors). A proper --naming-- module system makes this seamless and collision-free:

        We would simply include the vendor's HTML bundles and import their elements.

        ```html
        <head>
            <template name="officialModule" src="/bundle.html"></template>
            <template name="vendor1Module" src="https://vendor1.com/bundle.html"></template>
            <template name="vendor2Module" src="https://vendor2.com/bundle.html"></template>
        </head>
        <body>
            <import template="vendor1Module" name="header-component"></import>
            <import template="vendor2Module/layout" name="hero-component"></import>
        </body>
        ```

        And we can seamlessly use these elements within other elements.

        ```js
        customElements.define('extended-header', class ExtendedHeader extends HTMLElement {
            constructor() {
                super();
                // Get the referenced template element
                let moduleDependency = document.templates.officialModule; // Or document.templates.vendor1Module
                // Clone its "export1" export
                let shadowContent = moduleDependency.exports['header-component'].map(el => el.cloneNode(true));
                // Create Shadow DOM and send in the content
                let shadow =  this.attachShadow({mode: 'open'});
                shadow.append(...shadowContent);
            }
        });
        ```

        Also, OOHTML introduces a `template` attribute that any element can use to declare its dependency on *module exports*. 

        ```html
        <extended-header template="officialModule"></extended-header>
        ```

        ```html
        <extended-header template="vendor1Module/nested_module1"></extended-header>
        ```

        The `ExtendedHeader` JavaScript would simply work with whatever this declaration resolves to.

        ```js
        customElements.define('extended-header', class ExtendedHeader extends HTMLElement {
            constructor() {
                super();
                // Get the referenced template element
                let moduleDependency = this.template;
                ...
            }
        });
        ```

2. Web Components lets us define custom elements. And where we need to add some reactivity, we could follow a number of approaches; e.g.:

    *Property setters/getters*

    ```js
    customElements.define('extended-header', class ExtendedHeader extends HTMLElement {
        
        // Make this header fixed
        set fixed(trueOrFalse) {}
        // Get the fixed state
        get fixed() {}

    });
    ```

    *Attribute-change callbacks*

    ```js
    customElements.define('extended-header', class ExtendedHeader extends HTMLElement {
        
        attributeChangedCallback() {}

    });
    ```

    Well, these cover only half of the case for reactivity. The community therefore teams with different Web Component libraries rolling out their own change-detection mechanism / reactivity system. OOHTML introduces the [State API](http://webqit.io/tooling/oohtml/docs/getting-started/overview#the-state-api) and the [Observer API](http://webqit.io/tooling/observer) that just make this easier! These APIs even bring the concept of state reactivity home to every other element (not just web components), and to the document object itself.
  
    ```js
    Observer.observe(document.state, 'titleBar', mutation => {
        document.title = mutation.value;
    });
    ```
 
    ```js
    var counter = 0;
    setInterval(() => {
        document.state.titleBar = 'Document Title Update #' + (++ counter);
    }, 1000);
    ```
    
   Elements are also able to keep state to a dedicated, reactive State Object:

    ```js
    customElements.define('extended-header', class ExtendedHeader extends HTMLElement {
        
        constructor() {
            super();
            Observer.observe(document.state, 'menuItems', mutation => {
                this.renderMenuItem(mutation.value);
            });
            Observer.observe(this.state, 'fixed', mutation => {
                if (mutation.value) {
                    $(this).addClass('fixed');
                } else {
                    $(this).removeClass('fixed');
                }
            });
        }

    });
    ```

    Other code can observe element states.

    ```js
    let extendedHeader = document.querySelector('extended-header');
    Observer.observe(extendedHeader.state, 'fixed', mutation => {
        // Do something
    });
    ```
        
    > A dedicated State Object exposed as `.state` should also save us from inadvertently overriding an element native property or method; e.g.: 

        ```js
        customElements.define('extended-header', class ExtendedHeader extends HTMLElement {
            set style(value) {
            }
            get style() {
            }
        });
        ```

        With the state API, that could simply belong in `.state.style`.
 
    Deep mutations can be made and observed. And all of this works even at the plain object level:

    ```js
    Observer.set(extendedHeader.state, 'dataTree', { root: { deep: {} } });
    ```

    ```js
    Observer.observe(extendedHeader.state, mutations => {
        mutations.forEach(mutation => {
            console.log(mutation.path);
        });
    }, { subtree: true });
    ```

    ```js
    Observer.set(extendedHeader.state.dataTree.root.deep, 'prop', 'value');
    // console: [ 'dataTree', 'root', 'deep',  'prop' ]
    ```

3. There are also the *[Namespaced HTML](http://webqit.io/tooling/oohtml/docs/getting-started/overview#namespaced-html)* and *[Subscript](http://webqit.io/tooling/oohtml/docs/getting-started/overview#subscript)* features of OOHTML. These are also trying to address common problems that do not necessarily fall in the domain of Web Components but at the same time are able to simplify how we author Web Components.

Overall, "OOHTML" is simply  an umbrella name for a feature-set that saves us of unnecessary JavaScript, help us write better HTML and simplify how we author web components.