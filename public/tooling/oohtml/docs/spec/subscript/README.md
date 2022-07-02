---
desc: The <i>Subscript</i> specification.
_index: 4
---
# Subscript

[Subscript](/tooling/subscript) is a special language feature for JavaScript that lets us write *reactive* JavaScript code in plain JavaScript. *Subscript UI* is a <1KB extension of Subscript that further simplifies the concept of reactivity for UI development.

> OOHTML is [being proposed as a native browser technology](https://discourse.wicg.io/t/proposal-chtml/4716) while currently available through a polyfill. Be sure to check the [Polyfill Support](#polyfill-support) section below for the features on this page.

## Convention

### SubscriptElement

*SubscriptElement* is an extension of [`SubscriptClass`](/tooling/subscript/docs/spec/api#subscriptclass) - a base class *Mixin* for designating *reactive* class methods.

```js
// If loaded as a script tag...
const { SubscriptElement } = window.WebQit.OOHTML;
```

```js
// If installed as an NPM package...
import { SubscriptElement } from '@webqit/oohtml';
```

```js
class MyClass extends SubscriptElement( HTMLElement ) {

    static get subscriptMethods() {
        return [ 'render' ];
    }

    render() {
    }

}
```

#### Usage

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

### ScopedSubscript

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

#### Usage

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

### Class-Based Or Script-Based... Or Both!

One difference between *class*-based Subscript and `<script>`-based Subscript is that while you'd explicitly call the class methods initially in the case of the former, you'd have the code run automatically in the case of the latter.

And... it can be either *class*-based or `<script>`-based, or both! (For power users. 💪)

```html
<my-alert>

    <div class="message"></div> <!------------ managed at <my-alert>'s render() method -->
    <span class="icon"></span> <!------------ introducing an icon, managed below -->

    <!-- Scoped Subscript -->
    <script type="subscript">
        let iconElement = this.querySelector( '.icon' );
        iconElement.classList.add( 'icon-alert' );
    </script>
    
</my-alert>
```

Also, *class*-based Subscript is primarily imperative, whereas `<script>`-based Subscript is primarily declarative! But interestingly, an equivalent imperative API is offered in both cases via a `.subscripts` property.

*For the `#alert` element...*

```js
// Retreive the "alert" elements
let alertElement = document.querySelector( '#alert' );
// Obtain the first embedded script. (Indexes are zero-based.)
let scopedSubscript1 = alertElement.subscripts.get( 0 );
// Call for a full rerun
scopedSubscript1();
// Call for a reactive rerun. (Details ahead!)
scopedSubscript1.thread( [ 'globalMessage' ] );
```

*For the `my-alert` element...*

```js
// Retreive the "alert" elements
let myAlertElement = document.querySelector( 'my-alert' );
// Obtain the render method in either of two ways
let renderMethod = myAlertElement.subscripts.get( 'render' ); // Similar to: myAlertElement.render.bind( myAlertElement );
// Obtain the first embedded script. (Indexes are zero-based.)
let scopedSubscript1 = myAlertElement.subscripts.get( 0 );

// Call for a full rerun
renderMethod();
scopedSubscript1();

// Call for a reactive rerun. (Details ahead!)
renderMethod.thread( [ 'globalMessage' ] );
scopedSubscript1.thread( [ 'globalMessage' ] );
```

## Reactivity And Observability

Subscript offers a unique approach to reactivity that stands out for its simplicity and performance! Whether *class*-based or `<script>`-based, reactivity is implicit with Subscript; requiring nothing of a framework-specific syntax!

All we do when something changes is to fire up Subscript with the list of variables or properties that have changed, and Subscript will re-run just the statement (or a selection of statements, called a *dependency thread*) that has a *binding* to the variables; every other statement is skipped!

In the two-line JavaScript code that defines the *alert* elements above, only the second statement is re-run when we *run a thread for `globalMessage`*.

```js
globalMessage += ' Click the botton below to make your cookie choices.';
renderMethod.thread( [ 'globalMessage' ] );
```

The `.thread()` method is Subscript's unique one-liner approach to perfect, granular, performant reactivity; without concerning itself with how the supposed changes are made or how anything is observed!

Subscript UI takes this further to introduce *automatic observability* over the `document` object and over each element that implements Subscript - *class*-based or `<script>`-based. It uses the [Observer API](../../resources/the-observer-api) under the hood. 

Thus, property mutations on the `document` object or an element instance are reactive!

**An *alert* element**, this time, based on a custom `document.message` property:

```html
<div id="alert">

    <div class="message"></div>

    <!-- Scoped Subscript -->
    <script type="subscript">
        let messageElement = this.querySelector( '.message' );
        messageElement.innerHTML = document.message;
    </script>

</div>
```

```js
Observer.set( document, 'message', 'This site uses cookies!' );
```

```js
Observer.set( document, 'message', document.message + ' Click the botton below to make your cookie choices.' );
```

**A *counter* element**:

```html
<div id="counter">

    <div class="count"></div>

    <!-- Scoped Subscript -->
    <script type="subscript">
        let countElement = this.querySelector( '.count' );
        countElement.innerHTML = this.count;
    </script>

</div>
```

```js
let counterElement = document.querySelector( '#counter' );
Observer.set( counterElement, 'count', 0 );
setInterval( () => {
    Observer.set( counterElement, 'count', counterElement.count + 1 );
}, 1000 );
```

## Keeping It Neat With the State API and the Namespace API

So we don't litter the `document` object and element instances with custom properties everywhere, we're rewriting the above examples to leverage the [`.state` API](../the-state-api), which natively uses the Observer API under the hood.

And... to simplify our access to the DOM, we're also rewriting the `querySelector()` calls to leverage the [Namespace API](../namespaced-html).

**The *alert* element**:

```html
<div id="alert" namespace>

    <div id="message"></div>

    <!-- Scoped Subscript -->
    <script type="subscript">
        let messageElement = this.namespace.message;
        messageElement.innerHTML = document.state.message;
    </script>

</div>
```

```js
document.state.message = 'This site uses cookies!';
```

```js
document.state.message += ' Click the botton below to make your cookie choices.';
```

**The *counter* element**:

```html
<div id="counter" namespace>

    <div id="count"></div>

    <!-- Scoped Subscript -->
    <script type="subscript">
        let countElement = this.namespace.count;
        countElement.innerHTML = this.state.count;
    </script>

</div>
```

```js
let counterElement = document.querySelector( '#counter' );
counterElement.state.count = 0;
setInterval( () => {
    counterElement.state.count ++;
}, 1000 );
```

## Polyfill Support

The current [OOHTML polyfill implementation](../../getting-started/polyfill) has good support for Subscript. The polyfill additionally makes it possible to customise the follwoing areas of its implementation of the syntax using the [OOHTML META tag](../../resources/meta-tag):

+ **[selector.script](#convention)** - The CSS selector for matching the script element. The default selector is `script[type="subscript"]`. You may use a custom selector, like `script[is="my-script"][type="subscript"]`, where necessary.
        
    ```html
    <head>
        <meta name="oohtml" content="selector.script=script[is='my-script'][type='reflex'];" />
    </head>
    <body>
        <div>
            <script is="my-script" type="subscript"></script>
            <script is="my-script" type="subscript"></script>
        </div>
    </body>
    ```

Learn more about customization and the OOHTML meta tag [here](../../resources/meta-tag).
