---
desc: The <i>State API</i> specification.
_index: 3
---
# The State API

The State API is a DOM API that lets us maintain application state at the document level and at individual element levels. It brings application state closer to the UI and makes it easy to keep the UI in sync with all the changes taking place.

> OOHTML is [being proposed as a native browser technology](https://discourse.wicg.io/t/proposal-chtml/4716) while currently available through a polyfill. Be sure to check the [Polyfill Support](#polyfill-support) section below for the features on this page.

## API

This API exposes a document-level *state object* on a `document.state` property, and an element-level *state object* on an `element.state` property. Arbitrary values can be set and retrieved on *state objects* the same way we would with regular objects.

### Document-Level State

Document-level state represents the global state of an application.

+ **document.state: Object** - This *readonly* property exposes a *state object* whose properties can be written to and read from - from any part of the page.

    ```js
    // Assign properties
    document.state.pageTitle = 'Hello World!';
    // Access properties
    let pageTitle = document.state.pageTitle; // Hello World!
    ```

+ **document.setState(state[, params]): Void** - This method provides a programmatic way to set data on the `document.state` property. It lets us set multiple properties in a call, and gives us control over state mutation.

    **Parameters:**
    
    + `state: Object` - The object to set as state or whose properties to update existing state with.
    + `params: Object` - (Optional) Parameters for controlling state mutation:
        + `update: Boolean` - Specifies whether to simply update properties of existing state or to establish the given object as new state. Default: `false` - establish object as new state.

    ```js
    // Set object as state
    document.setState({
        pageTitle: 'Hello World!',
    });
    // Access properties
    let pageTitle = document.state.pageTitle; // Hello World!

    // ----------

    // Update existing state object
    document.setState({
        pageContent: {
            main: 'Thanks for visiting.',
            aside: '',
        },
    }, {update: true});
    // Access properties
    let pageTitle = document.state.pageTitle; // Hello World!
    let pageContent = document.state.pageContent; // {main, aside}
    
    // ----------

    // Set new state object
    document.setState({
        pageTitle: 'Bonjour le Monde!',
    });
    // Access properties
    let pageTitle = document.state.pageTitle; // Bonjour le Monde!
    let pageContent = document.state.pageContent; // undefined
    ```

+ **document.clearState(): Void** - This method provides a programmatic way to clear existing data from the document's state object.

    ```js
    // Clear existing data
    document.clearState();
    ```

### Element-Level State

Element-level state represents the local state of an element.

+ **Element.prototype.state: Object** - This *readonly* property exposes a *state object* for the element whose properties can written to and read as-is.

    ```js
    // Assign properties
    myCollapsible.state.collapsed = true;
    // Access properties
    let isCollapsed = myCollapsible.state.collapsed; // true

    // -------

    // Example usage - a simple toggle
    myCollapsible.onclick = () => {
        if (myCollapsible.state.collapsed) {
            myCollapsible.style.height = 'auto';
        } else {
            myCollapsible.style.height = '0px';
        }
        myCollapsible.state.collapsed = !myCollapsible.state.collapsed;
    };
    ```

+ **Element.prototype.setState(state[, params]): Void** - This method provides a programmatic way to set data on an element's `.state` property. It lets us set multiple properties in a call, and gives us control over state mutation.

    **Parameters:**

    + `state: Object` - The object to set as state or whose properties to update existing state with.
    + `params: Object` - (Optional) Parameters for controlling state mutation:
        + `update: Boolean` - Specifies whether to simply update properties of existing state or to establish the given object as new state. Default: `false` - establish object as new state.

    ```js
    // Set object as state
    myCollapsible.setState({
        collapsed: false,
    });
    // Access properties
    let isCollapsed = myCollapsible.state.collapsed; // false

    // ----------

    // Update existing state object
    myCollapsible.setState({
        inView: true,
    }, {update: true});
    // Access properties
    let isCollapsed = myCollapsible.state.collapsed; // false
    let inView = myCollapsible.state.inView; // false
    
    // ----------

    // Set new state object
    myCollapsible.setState({
        collapsed: true,
    });
    // Access properties
    let isCollapsed = myCollapsible.state.collapsed; // true
    let inView = myCollapsible.state.inView; // undefined
    ```

+ **Element.prototype.clearState(): Void** - This method provides a programmatic way to clear existing data from an element's state object.

    ```js
    // Clear existing data
    myCollapsible.clearState();
    ```

## State Observability

State objects are a special kind of objects in that they support *observability*. The `document.state` property and the `Element.prototype.state` property are implemented as *live objects* that can be observed for property changes using the [Observer API](../../spec/the-observer-api).

```js
// Obtain the Observer API and use the Observer.observe() method
Observer.observe(document.state, events => {
    events.forEach(e => {
        console.log(e.type, e.name, e.path, e.value);
    });
});
```

We could as well specify just the path to observe on the function's second parameter.

```js
Observer.observe(document.state, 'pageTitle', e => {
    console.log(e.type, e.name, e.path, e.value);
});
```

With the code above, adding or updating the `pageTitle` property on the document's state object would be reported in the console.

```js
document.state.pageTitle = 'Bonjour!';
```

Deleting this property would trigger our observer in the same way.

```js
delete document.state.pageTitle;
```

To observe changes down the state tree, we would set the observer's `params.subtree` to `true`.

```js
Observer.observe(document.state, events => {
    events.forEach(e => {
        console.log(e.type, e.name, e.path/*watch this*/, e.value);
    });
}, {subtree: true});
```

We could as well specify just the path to observe.

```js
Observer.observe(document.state, ['pageContent', 'aside'], e => {
    console.log(e.type, e.name, e.path, e.value);
});
```

With the code above, mutating a nested property would trigger the observer.

```js
// State object
let data = {
    pageTitle: 'Hello World!',
    pageContent: {
        main: 'Thanks for visiting.',
        aside: '',
    },
};
document.setState(data);

// Mutate pageContent afterwards...
Observer.set(data.pageContent, 'aside', 'Related content...');
```

### A Custom Element Example

The following example demonstrates state observability in a custom element. Our logic below helps keep the UI and application state in sync. Noteworthy is that we are reflecting the `collapsed` state in the `data-collapsed` attribute and keeping a part of that state - `content` - *bound* to a descendant element.

```js
customElements.define('my-collapsible', class extends HTMLElement {

    /**
     * Creates the Shadow DOM
     */
    constructor() {
        super();
        let contentElement = this.querySelector('.content');

        // Observe state and get the UI synced
        Observer.observe(this.state, events => {
            events.forEach(event => {
                switch(event.name) {
                    case 'collapsed':
                        this.style.height = event.value ? '0px' : 'auto';
                        this.setAttribute('data-active', event.value ? 'true' : 'false');
                    break;
                    case 'inView':
                        this.style.animation = event.value ? 'fadein 440ms' : 'fadeout 440ms';
                    break;
                    case 'content':
                        contentElement.setState(event.value);
                    break;
                }
            });
        });

        // Implement the logic for toggling collapsion
        this.addEventListener('click', function(event) {
            this.state.collapsed = !this.state.collapsed;
        });

        // Implement the logic for detecting when in view
        let io = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                this.state.inView = entries[0].intersectionRatio;
            }
        });
        io.observe(this);
    }

});
```

External code gets a standard way to infer the state of the `<my-collapsible>` element.

```js
let myCollapsible = document.querySelector('my-collapsible');
let isCollapsed = myCollapsible.state.collapsed;
let inView = myCollapsible.state.inView;
```

External code gets a standard way to control state.

```js
myCollapsible.state.collapsed = true;
```

## Polyfill Support

The current [OOHTML polyfill implementation](../../getting-started/polyfill) has full support for The State API. The polyfill additionally makes it possible to customise following areas of its implementation of the API using the [OOHTML META tag](../../resources/meta-tag):

+ **[api.state](#api)** - The property name for exposing the *state object* on DOM elements and the document object. The standard property name is `state`, but you may use a custom property name, where necessary.
        
    ```html
    <head>
        <meta name="oohtml" content="api.state=stateObject;" />
    </head>
    ```
        
    ```js
    myCollapsible.stateObject.collapsed = true;
    ```

+ **[api.setState](#api)** - The *method name* for setting data on *state objects*. The standard *method name* is `setState`, but you may use a custom method name, where necessary.
        
    ```html
    <head>
        <meta name="oohtml" content="api.setState=setStateObject;" />
    </head>
    ```
    
    ```js
    document.setStateObject(data);
    ```

+ **[api.clearState](#api)** - The *method name* for clearing data from *state objects*. The standard *method name* is `clearState`, but you may use a custom method name, where necessary.
        
    ```html
    <head>
        <meta name="oohtml" content="api.clearState=clearStateObject;" />
    </head>
    ```
    
    ```js
    document.clearStateObject();
    ```

Learn more about customization and the OOHTML meta tag [here](../../resources/meta-tag).
