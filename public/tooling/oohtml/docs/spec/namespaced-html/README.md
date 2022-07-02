---
desc: The <i>Namespaced HTML</i> specification.
_index: 2
---
# Namespaced HTML

Namespacing provides a way to let an element establish its own naming context for descendant elements. This makes it possible to keep IDs scoped to a context other than the document's global scope; thus the ability to write collision-free IDs across a page.

Namespaced HTML is a document that is structured as a hierarchy of *scopes* and *subscopes*.

> OOHTML is [being proposed as a native browser technology](https://discourse.wicg.io/t/proposal-chtml/4716) while currently available through a polyfill. Be sure to check the [Polyfill Support](#polyfill-support) section below for the features on this page.

## Convention

Namespaces are designated with the `namespace` *Boolean* attribute.

In the code below, the given ID is scoped to the element with the `namespace` attribute.

```html
<div namespace>
    <div>
        <div id="some-id"></div>
    </div>
</div>
```

And below is a **hierarchy of *namespaces* and *sub namespaces***.

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

The above gives us a conceptual model of repeating objects, each encapsulating its IDs:

```html
continents
 ├⏤europe
 │   ├⏤about
 │   ├⏤countries
 ├⏤asia
     ├⏤about
     ├⏤countries
```

## Namespaced Selectors

Being able to layout elements in namespaces makes it possible to write collision-free CSS selectors. OOHTML introduces the concept of *Namespaced Selectors* which are regular CSS expressions written with a path notation.

Namespaced Selectors use the forward slash `/` to denote a namespace boundary.

```html
<style>
#continents / #europe / #countries {
    color: darkblue;
}
#continents / #asia / div {
    color: orange;
}
</style>
```

And this convention can be used with existing DOM Selector APIs.

```js
let aboutAsia = document.querySelector('#continents / #asia / #about');
let divsAsia = document.querySelectorAll('#continents / #asia / div');
```

## API

*Namespaced HTML* offers an API for traversing namespaces as object trees. One advantage this gives us is that it minimizes selector-based queries.

+ **document.namespace: Object** - This *readonly* property gives the document's namespaced IDs - IDs scoped to the document - as an object.

    ```js
    let continents = document.namespace.continents; // Returns the "#continents" element in the markup above
    ```

+ **Element.prototype.namespace: Object** - This *readonly* property gives an element's namespaced IDs - IDs scoped to the element - as an object.

    ```js
    // Get the "continents" article
    let continents = document.namespace.continents;

    // Access scoped IDs with the new "namespace" DOM property
    let europe = continents.namespace.europe;
    let asia = continents.namespace.asia;

    // And for deeply-nested IDs...
    let aboutAsia = continents.namespace.asia.namespace.about;
    ```

## Namespace Observability

The `document.namespace` property and the `Element.prototype.namespace` property are implemented as *live objects* that can be observed for realtime changes in the namespace tree. Live objects are observed using the [Observer API](../../the-observer-api).

```js
// Obtain the Observer API and use the Observer.observe() method
Observer.observe(continents.namespace, events => {
    events.forEach(e => {
        console.log(e.type, e.name, e.path, e.value);
    });
});
```

We could as well specify just the path to observe on the function's second parameter.

```js
Observer.observe(continents.namespace, 'africa', e => {
    // We're now also logging the event's value, that is, the element
    console.log(e.type, e.value);
});
```

With the code above, adding a new ID - `africa` - to the `continents` namespace would be reported in the console.

```js
let section = document.createElement('section');
section.setAttribute('id', 'africa');
continents.append(section);
```

Removing this element would trigger our observer in the same way.

```js
continents.namespace.africa.remove();
```

To observe changes down the namespace hierarchy, we would set the observer's `params.subtree` to `true`.

```js
Observer.observe(continents.namespace, events => {
    events.forEach(e => {
        console.log(e.type, e.name, e.path/*watch this*/, e.value);
    });
}, {subtree: true});
```

We could as well specify just the path to observe.

```js
Observer.observe(continents.namespace, ['africa', 'namespace', 'countries'], e => {
    console.log(e.type, e.path, e.value));
});
```

Other possibilities can be found in the Observer API documentation.

## Polyfill Support

The current [OOHTML polyfill implementation](../../getting-started/polyfill) has good support for the Namespaced HTML Specification. With the exception of [Namespaced Selectors](#namespaced-selectors), all aspects of the specification are supported. The polyfill additionally makes it possible to customise the following areas of its implementation of the syntax using the [OOHTML META tag](../../resources/meta-tag):

+ **[attr.namespace](#convention)** - The *namespace keyword* attribute. The standard *namespace keyword* attribute is `namespace`, but you may use a custom attribute name, where necessary.
        
    ```html
    <head>
        <meta name="oohtml" content="attr.namespace=data-namespace;" />
        <div data-namespace>
            <div id="id01"></div>
            <div id="id02"></div>
        </div>
    </head>
    ```

+ **[attr.id](#convention)** - The *namespaced-ID* attribute. The standard *namespaced-ID* attribute is `id`, but you may use a custom attribute name, where necessary.
        
    ```html
    <head>
        <meta name="oohtml" content="attr.id=data-id;" />
        <div namespace>
            <div data-id="id01"></div>
            <div data-id="id02"></div>
        </div>
    </head>
    ```

+ **[api.namespace](#api)** - The *namespace* property exposed on the document object and on elements. The standard *namespace* property is `namespace`, but you may use a custom property name, where necessary.
        
    ```html
    <head>
        <meta name="oohtml" content="api.namespace=ns;" />
    </head>
    ```
    
    ```js
    // Get the "continents" article
    let continents = document.ns.continents;
    ```

Learn more about customization and the OOHTML meta tag [here](../meta-tag).