Anyone played with some of these ideas in real life?

I come with some good engagement with the usecase and I can say that what the warfront is dictating is a **HTML-primary**, **JS-secodnary** type of a module system. It seems to me that the JS approach is all being induced for some reason I can't figure out! It seems to me that important comments here emphasizing a HTML-oriented approach aren't being honoured at all. But truth is, these comments are simply the usecase talking. Even with the passing of time, the usecase today is still all about just being able to reuse HTML all by itself.

Unfortunately, JavaScript keeps hunting down HTML everywhere. **It's a feeling we don't want!** And if we end up shipping one more thing like this, we would naturally seek *peace* with some other means to the same end, and "HTML Modules" would sit all by itself!

All I have ever wanted, is being able to reuse HTML content; and without JavaScript! I already have ES6 modules for anything JS! Let me explain properly...

1. **Should HTML modules be JavaScript oriented (using ES6's module infrastructure) or HTML oriented (using HTML's own infrasture)?**
    
    The answer should be obvious when we understand that we are talking about two different domains that each lends itself to be treated differently, with each having its own concept of reusability.
    
    + When we think of HTML modules, what we are really thinking of is *reusable HTML contents - not reusable JavaScript*, as this is what ES6 modules are designed for. And when we look, it is for this purpose of reusability in HTML that we have the `<template>` element. And with the `template.content` API, JavaScript code is already able to *import* these reusable HTML elements for use.
    
        So, is there anything new about reusing HTML contents that we want to drop HTML's perfect infrastructure for the job in favour of ES6 modules? Is it just about that HTML now being in a remote file? We could simply do something that gets these remote contents to the same end - the `<template>` element!

        ```html
        <template src="/bundle.html"></template>
        ```
        
        The template element above is simply loading itself from a remote file. This is even how HTML thinks.

        ```html
        <script>
            // Code
        </script>

        or 

        <script src="/script.js"></script>
        ```
    
        ```html
        <style>
            /* Rules */
        </style>

        or 

        <link href="/styles.css" />
        ```
    
        ```html
        <svg>
            <!-- Contents -->
        </svg>

        or

        <img src="/image.svg" />
        ```

        So, HTML already gives us a way to either define things in-place or load them from a file. I am only wondering how come the `<template>` element shipped without an equivalent feature in the first place.
        
        If *reusable HTML* is the question anywhere, it seems pretty straight forward to just ask the `<template>` element. There shouldn't be one system for consuming HTML defined statcally and another separate system for consuming the same HTML defined in a remote file. The word "load" should simply be a means to get the supposed contents to the same end. Othereise, we would be introducing a new sort of engineering for an existing concept without any additional benefit.
        
2. **How about we rather talk about spicing up reusability in HTML with the `<template>` element, this time, using the *module*, *import* and *export* paradigm, while maintaining all the benefits of doing HTML with HTML?**

    I've engaged with this concept extensively using a polyfill I made. And after a million iterations building a real-word app with it, here are my conclusions.
    
    1. The `<template>` element is just perfect as **one interface for anything reusable**, whether defined statcally or defined remotely. *And this is the HTML module! Its contents should simply be taken as exports!*

        In this sense of a module:

        1. The `<template>` element would have a `name` that's used as the *module ID*.
            
            ```html
            <template name="module1">
                <!-- Contents -->
            </template>

            or 

            <template name="module1" src="/bundle.html"></template>
            ```

        2. The *export* terminology of a standard module system would go to an `<export>` element that properly puts contents up for consumption using some *export ID*.
        
            ```html
            <template name="module1">

                <export name="export1">
                    <div>Part of export1</div>
                    <div>Part of export1</div>
                </export>

            </template>
            ```

            Contents may also be tagged to an export ID using something like an `exportgroup` attribute.

            ```html
            <template name="module1">

                <div exportgroup="export1">Part of export1</div>
                <div exportgroup="export1">Part of export1</div>

            </template>
            ```

        3. The *import* terminology of a standard module system would go to an `<import>` element that let's us declaratively place any of a module's *export* on any location in the main document.
        
            ```html
            <body>
                <import name="export1" template="module1"></import>
            </body>
            ```

            > Conincidentally, this *import* (or *include*) feature is something we've all asked for under different proposals. What's new here is that instead of being all about including server-side contents, the `<import>` element just maintains a relationship with the `<template>` element - the module. So, whether a `<template>` has its *content* statically defined or has it loaded, the `<import>` element's job would be just to *import* from the `<template>`.
    
    2. Many new things become possible with this *HTML-oriented* HTML module system, all of which would be lost otherwise.
        
        1. Modules would now be nestable, to let us organize them more meaningfully.
        
            ```html
            <template name="module1">

                <div exportgroup="export1">Part of export1</div>
                <div exportgroup="export1">Part of export1</div>

                <template name="module_nested_remote" src="/bundle.html"></template>

            </template>
            ```

            So, a module can have other modules, which themselves can have other modules, as long as they each have a module ID.
            
            The full module ID for a nested module becomes a path like `module1/module_nested_remote`.
        
        2. Loading modules from a remote file can go without any *render-blocking* or *defer* semantics. They would simply announce a successful load event whenever loading is successful - just the way the `<img>` element works. Then, `<import>` elements in the UI that depend on these remote contents are simply resolved as exports become available - just as the `<img>` element is rendered at whatever time loading is successful.
        
            ```html
            <body>
                <!-- resolves when module1/module_nested_remote loads -->
                <import name="export1" template="module1/module_nested_remote"></import>
            </body>
            ```

        3. With the event system of HTML modules, the main document/UI is able to maintain a **dynamic relationship** with its modules.
        
        Then, an HTML modules API!

        1. With something like a `document.templates` property, we could simply access modules without having to query the document for `<template>` elements using CSS selectors.

            ```js
            let module1 = document.templates.module1;
            ```

            And for nested modules, something like a `template.templates` property would be used.

            ```js
            let module_nested_remote = module1.templates.module_nested_remote;
            ```
        
        2. With something like a `template.exports` property, we could access a module's exports without having to query `<template>` elements using CSS selectors.
            
            ```js
            let import1 = module1.exports.export1;
            ```

        3. And the `document.addEventListener()` method could always be used to observe the state of a document's modules - especially where modules are loading remote content or where modules are being programmatically added to the document.

        Then some extended usecases where some exports have some JS?

        ```html
        <template name="module1">

            <export name="export1">
                <div>Part of export1</div>
            </export>

            <export name="export1">
                <div>
                    Part of export2
                    <script>
                        // Some JS?
                    </script>
                </div>
            </export>


        </template>
        ```

        Ususally, this kind of JS is solely for the purpose of **scoped functionality**, not for the purpose of being imported into another script. If I really wanted to import a script from another script, I would do so directly:

        ```js
        import something from './script.js';
        ```

        It doesn't make sense to me that I would first have taken the script into some HTML, then begin debating *how to import the script*!

        **Scoped JavaScript** is an interesting possibility that should really be explored for its peculiar usecases. This, I certainly have! And here's what I've settled for:

        ```html
        <template name="module1">

            <export name="export1">
                <div>Part of export1</div>
            </export>

            <export name="export2">
                <div id="some-div">
                    Part of export2
                    <script type="subscript">
                        // The this variable is a reference to the immediate host element
                        console.log(this.id); // some-div
                    </script>
                </div>
            </export>

        </template>
        ```

        And the script remains inert until the export is imported into the main document. It ever runs in the context of its immediate host element. Variables defined within aren't available outside, but variables in the global scope are available inside.

        On being imported, our final document becomes:

        ```html
        <body>
            <!-- <import name="export2" template="module1"></import> -->
            <div id="some-div">
                Part of export2
                <script type="subscript">
                    // The this variable is a reference to the immediate host element
                    console.log(this.id); // some-div
                </script>
            </div>
        </body>
        ```
        
        And the rest of the world of scoped functionality can go on:

        ```html
        <body>
            <!-- <import name="export2" template="module1"></import> -->
            <div id="some-div">
                Part of export2
                <script type="subscript">
                    console.log(this.closest('body')); // <body>
                    console.log(document.title); // ...
                    this.addEventListener('click', () => {
                        this.remove();
                    });
                </script>
            </div>
        </body>
        ```

I can say convincingly that once you begin working with `<template>`s, `<import`s, and `<script type="subscript">`, everything becomes simple. We've particularly taken an app to production at WebQit with this approach, using the polyfill linked below.

You'll find out however that all of the above features is only a part of what we need together to be able to author modular, reactive UI with just native HTML. Answering this challenge has been my project at WebQit which I have summed up as OOHTML (formally CHTML). OOHTML (Object-Oriented HTML) is **a proposed suite** of UI features that let's us build modular, reactive UIs natively.

+ Please [see the proposal at the WICG](https://discourse.wicg.io/t/proposal-chtml/4716). (Discussion mainly at the WICG.)
+ And [here is the project - the polyfill - on Github](https://github.com/webqit/oohtml). (The polyfill has full support for all OOHTML's features and its already being tested in production.)
+ And [here is the documentation](https://webqit.io/tooling/oohtml) (progressively being improved on.)

I am very excited about OOHTML as it seeks to provide one answer to the many questions that go together, much of which different proposals have tried to address as standalone ideas.

OOHTML was designed on the job and being iterated on on the job. And this has furnished us answers to many design questions. 



## [Major Updates to CHTML]
CHTML today has received the following updates:

### CHTML is now OOHTML - Object-Oriented HTML
+ The modern UI is really all about objects - conceptual objects in the UI that translate to real objects in JavaScript, that are styled as objects in CSS.
+ Reusable pieces of HTML are objects.

The name Component-Oriented HTML had also earlier misconstrued CHTML as an alternative to Web Components.

### CHTML has moved to a WebQit repository

+ This project is now at [WebQit/oohtml](https://github.com/webqit/oohtml) from [Web-Native/chtml](https://github.com/web-native/chtml)
+ The documentations is now at [WebQit.io/tooling/oohtml](https://webqit.io/tooling/oohtml)

### Some features have changed for the better

Here is a highlight of what changed. Details afterward.

+ **Scoped HTML is now Namespaced HTML** - just a name change.
+ **Scoped CSS is no more - or maybe later**. But this is currently less of a priority for OOHTML.
+ **Scoped JS is now Subscript** - major change:
    + This "reactive scripts" feature is now its own script type - `<script type="subscript"></script>` - just as we have classic scripts (`type="text/javascript"`) and module scripts (`type="module"`). This is apt as reactive scripts are drastically different in behaviour from other script types.
    + This updates the earlier convention of `<script scoped></script>`.

        ```html
        <div id="alert">
            <script type="subscript">
              console.log(this.id); // alert
            </script>
        </div>
        ```

    + Scoped JS's `document.bindings` and `element.bindings` properties have been dropped in favour of an equivalent new API in OOHTML - the State API (more on this next).
+ **We introduce the State API**. This API gives us a way to maintain state at the document level (by offering a `document.state` property) and at individual element levels (by offering an `element.state` (that's `Element.prototype.state`)) property, and supports observability. This is finally how it becomes possible to implement state and reactivity with native elements and custom elements alike.
+ **HTML Partials has evolved into two separate features: HTML Modules and HTML Imports**. These features come with everything about *reusability in HTML* and *an API* for it in JavaScript. This has been one of the most talked-about topic of all time. And OOHTML's approach to the question turns out to be very delightfully different from what we could find anywhere else. This is because we've let the usecase dictate its direction.

Summary of changes:

+ CHTML - Scoped HTML, Scoped CSS, Scoped JS, HTML Partials
+ OOHTML - Namespaced HTML, Subscript, The State API, HTML Modules, HTML Imports

## [Introducing OOHTML]
OOHTML (Object-Oriented HTML) is a suite of new DOM features that particularly facilitates writing modular HTML, CSS, and JavaScript natively and more conveniently. It addresses a number of limitions inherent to existing conventions, and welcomes much of the paradigms associated with modern UI development - reusability, reactivity, modularity.

This is the successor to the of the CHTML proposal; with pretty the same goals, but a better direction.

The quickest run-down of its features is right at its [project README](https://github.com/webqit/oohtml). A little more detailed run-down, followed by full documentation, is at its docs - https://webqit.io/tooling/oohtml.

And what's even more exciting? It comes with a working polyfill that lets everything work today. Extra efforts have also been put to make it possible to customize the polyfill's syntax of each feature; this is to let everyone explore new possibilities with the entire idea and bring any new findings to the table.

And what's even, yes, more exciting? Our usecase for OOHTML at WebQit is now in production. This took OOHTML through a million iterations over the past months. It just brings us closer to reaching our goal - being able to author modular, reusable, and reactive HTML at HTML level!

### An Example Scenerio
Below is how OOHTML's features could apply progressively on a simple scenerio. 

#### The idea
Some application has a name-card block in the UI that displays a user's name, and this time, along with an email:

```html
<body>

    <div id="name-card">
        Hello,
        my name is: <span id="name"></span>
        and my email is: <span id="email"></span>.
    </div>

</body>
```

#### Challenge #1 - reusability
First challenge is: this block has to appear in mutiple places in the UI - a repeating modular block.

+ Approach #1 - This snippet is quite small, it wouldn't hurt too much repeating it manually across the UI.
+ Approach #2 - Having some include feature like this:

    ```html
    <body>

        <include src="./name-card.html"></include>

        <div id="elsewhere">
            <include src="./name-card.html"></include>
        </div>

    </body>
    ```

    *Bad feeling: a file for every little reusable thing.*

+ Approach #3 - Creating some custom element:

    ```html
    <body>

        <name-card></name-card>

        <div id="elsewhere">
            <name-card></name-card>
        </div>

    </body>
    ```

    *Bad feeling: a JavaScript class for every little reusable thing. (`customElements.define('name-card', class extends HTMLElement {});`)*

+ Approach #4 - Define once in a `<template>` element, then clone programmatically, each time:

    ```html
    <body>

        <template id="reusables">

            <div id="name-card">
                Hello,
                my name is: <span id="name"></span>
                and my email is: <span id="email"></span>.
            </div>

        </template>

        <div id="elsewhere">
        </div>

        <script>
            let nameCard = document.querySelector('#reusables').querySelector('#name-card');
            document.body.prepend(nameCard.cloneNode(true));
            document.body.querySelector('#elsewhere').prepend(nameCard.cloneNode(true));
        </script>

    </body>
    ```

    *Bad feeling: this JavaScript.*

+ Approach #5 - HTML Modules + HTML Imports (OOHTML):

    ```html
    <body>

        <!-- This is a module -->
        <template name="module1">

            <!-- This is an export -->
            <div exportgroup="name-card">
                Hello,
                my name is: <span id="name"></span>
                and my email is: <span id="email"></span>.
            </div>

        </template>

        <!-- This is an import -->
        <import name="name-card" template="module1"></import>

        <div id="elsewhere">
            <!-- This is another import -->
            <import name="name-card" template="module1"></import>
        </div>

    </body>
    ```

    And where the markup to reuse really fits better in a file, the `<template>` would simply load itself from the file and the convention for imports would still remain intact.

    ```html
    <template name="module1" src="./content.html"></html>
    ...
    <import name="name-card" template="module1"></import>
    ```

    > This time, imports are rendered as their corresponding exports in the referenced module becomes available. (Imports maintain a live relationship with modules.)

    *Good feeling: `<template src=""></template>`. HTML has always allowed us to either define things in-place (`<script>code</script>`) or load them from a file (`<script src=""></script>`)*

    *Good feeling: Live imports. Network-based elements in HTML automatically work on load (`<img src="" />`).*

#### Challenge #2 - name conflicts
A side effect to repeating modular blocks in the UI is name conflicts. Remember: IDs must be unique throughout an HTML document. But our code now looks like this:

```html
<body>

    <template name="module1">...</template>

    <div exportgroup="name-card">
        Hello,
        my name is: <span id="name"></span>
        and my email is: <span id="email"></span>.
    </div>

    <div id="elsewhere">
        <div exportgroup="name-card">
            Hello,
            my name is: <span id="name"></span>
            and my email is: <span id="email"></span>.
        </div>
    </div>

</body>
```

+ Approach #1 - Convert all IDs to classes:

    This is the way usually, *but beyond this trivial example, we hit terrible specificity problems*. This is beyond the scope of this example.
    
+ Approach #2 - Namespaced HTML (OOHTML):

    Here each modular block simply establishes its own naming context for its descendants. (And the API benefits later on.)

    ```html
    <template name="module1">

        <!-- This is an import -->
        <div exportgroup="name-card" namespace>
            Hello,
            my name is: <span id="name"></span>
            and my email is: <span id="email"></span>.
        </div>

    </template>
    ```

#### Challenge #3 - application data
Our application layer is some JavaScript code. It makes the user data available globally so that all name-card elements can access.

```js
let globalData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
};
```

How does this get to the UI?

+ Approach #1 - Manually apply to all elements:

    ```js
    const allNameCards = document.querySelectorAll('#name-card');
    const render = data => {
        Array.prototype.call(allNameCards).forEach(el => {
            allNameCards.querySelector('#name').innerHTML = data.name;
            allNameCards.querySelector('#email').innerHTML = data.email;
        });
    };
    render(globalData);
    ```

    *Bad feeling: far from scalable!*

+ Approach #2 - Use the Custom Element approach:

    ```js
    customElements.define('name-card', class extends HTMLElement {
        render(data) {
            this.shadowRoot.querySelector('#name').innerHTML = data.name;
            this.shadowRoot.querySelector('#email').innerHTML = data.email;
        }
        connectedCallback() {
            this.render(globalData);
        }
    });
    ```

    ```html
    <body>

        <name-card id="name-card"></name-card>

        <div id="elsewhere">
            <name-card id="name-card"></name-card>
        </div>

    </body>
    ```
    
    *Bad feeling: a custom element **just** to render data, and no extra benefits?*

+ Approach #3 - Use Subscript + Namespaced HTML (OOHTML):

    ```html
    <template name="module1">
    
        <!-- This is an import -->
        <div exportgroup="name-card" namespace>

            Hello,
            my name is: <span id="name"></span>
            and my email is: <span id="email"></span>.

            <script type="subscript">
                let ns = this.namespace;
                ns.name.innerHTML = globalData.name;
                ns.email.innerHTML = globalData.email;
            </script>

        </div>

    </template>
    ```

    *Good feeling: rendering at HTML level.*

    *Good feeling: two advantages of opening a script tag as compared to using some `{ templateVars }` - (1) we have **enough room** to do some little rendering logic **with a familiar syntax**. E.g `ns.name.innerHTML = data.name.toUpperCase()`.* (2) Everything logic is located together, and HTML is clean.

#### Challenge #4 - reactivity
What happens if the data in the application layer will change? How do the approaches above fair?

+ Approaches #1 and #2 - Invent some event system:

    The rendering logic listens to some event with a view to re-rendering.

    ```js
    // Approach #1 above
    render(globalData);
    document.addEventListener('namechange', () => {
        render(globalData);
    });
    ```
    
    ```js
    // Approach #2 above
    connectedCallback() {
        this.render(globalData);
        document.addEventListener('namechange', () => {
            this.render(globalData);
        });
    }
    ```

    The code that changes the data fires the event.
        
    ```js
    data.name = 'John Doe Junior';
    document.dispatchEvent(new window.CustomEvent('namechange'));
    ```

    *Not feasible: We'd be ending up rolling a new (bad) framework!*

+ Approaches #1 and #2 - The State API (OOHTML):

    Global data now in `document.state`.

    ```js
    document.setState({
        name: 'John Doe',
        email: 'john.doe@example.com',
    });
    ```

    The rendering logic works with `document.state`.

    ```js
    // Approach #1 above
    render(document.state);
    Observer.observe(document.state, 'data', e => {
        render(e.value);
    });
    ```
    
    ```js
    // Approach #2 above
    connectedCallback() {
        this.render(document.state);
        Observer.observe(document.state, 'data', e => {
            this.render(e.value);
        });
    }
    ```

    The code that changes the data ends up firing observers.
        
    ```js
    document.setState({
        name: 'John Doe Junior',
        email: 'john.doe@example.com',
    });
    ```

    *Good feeling: State and Observability natively!*

    *Good feeling: Depth-based observability in more advanced cases!*

+ Approach #3 - Use Subscript + Namespaced HTML (OOHTML):

    Here we take no extra step as Subscript is already an event-based JavaScript runtime. (Statements that depend on updated properties in its scope are re-run automatically.)

    ```html
    <template name="module1">
    
        <!-- This is an import -->
        <div exportgroup="name-card" namespace>

            Hello,
            my name is: <span id="name"></span>
            and my email is: <span id="email"></span>.

            <script type="subscript">
                let ns = this.namespace;
                let data = document.state;
                ns.name.innerHTML = data.name;
                ns.email.innerHTML = data.email;
            </script>

        </div>

    </template>
    ```

    *Good feeling: rendering at HTML level + reactivity with no extra step.*

### Other Scenerios
The example scenerio above is really contrived, but it should furnish us a good starting point for painting usecases. You should please share you opinions. I'll stand by now to repond to usecase questions.
















<br />

## Learn More

### Magical, Yet Traditional - the WebQit Advantage!
Since the modern web, every new magic has had something to change in our conventional way of thinking and doing things. For every feature X, "modern tooling" has had to alter something in how we authour and ship HTML, CSS and JavaScript, and overall, in how we build and maintian modern applications. For some reasons, we haven't had the benefit of *both* "modern" and "traditional". How we miss the latter!

Come to a new way to think about tooling where everything suprisingly becomes possible with *little or zero engineering*; where the magic happens in the conventions of the traditional web. This is the possibility we explore with WebQit tooling. It comes on a clean slate bringing the benefits of *both* the *modern magic* and a *traditional developer experience*. This is the WebQit advantage!

### The Web-Native Future - Our Subject of Advocacy!
In the era of startling advancements with ES6+ and CSS, there's now a native approach to 4 out of every 5 problems. And sooner than anyone thinks, the fifth will be here! Thus comes the web of the future leaning back on its standard conventions and tooling for building web apps! We call this the *web-native future*! If there's anything we want to be known for, it will be having a part to play in this!

Through proposals and associated polyfills, we are indeed participating in web standardization. And with the launch of the [Web-Native (W3C) Community Group](https://www.w3.org/community/web-native/), we're set to join in driving community uptake of Web-Native tooling. [Join](https://www.w3.org/community/web-native/join) us in *facilitating* and *embracing* the Web-Native future where everyone is banking more on the platform and less on abstractions.
