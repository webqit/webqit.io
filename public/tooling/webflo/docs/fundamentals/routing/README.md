---
desc: Routing concepts.
_index: first
---
# Routing

In Webflo, routing is filesystem-based. Here, we simply create a file on the filesystem and it automatically becomes available as an URL.

The application's root URL `/`, for example, would be implemented by creating an *index file* - `<indexFile>` - in a chosen *routing directory* - `<routingDirectory>`.

```text
<routingDirectory>
  ├⏤<indexFile>
```

Nested URLs like `/shop` would be implemented by creating the equivalent directory structure `/<routingDirectory>/shop/<indexFile>`.

```text
<routingDirectory>
  ├⏤shop
  │  ├⏤<indexFile>
  ├⏤<indexFile>
```

The actual name for `<routingDirectory>` and `<indexFile>` will depend on the URL-handling facilities for the URL.

### URL-Handling Facilities

Depending on the type of application, a given URL can be internally handled either statically or dynamically. Webflo lets us define an application's URL-handling facilities in dedicated directories.

+ **`/public`** - for static files serving
+ **`/server`** - for server-side routing
+ **`/client`** - for client-side routing
+ **`/worker`** - for worker-level routing

#### The `/public` Directory

This is where static files (like images or CSS files) are placed to be served automatically. *(Implement this directory for an application that serves static content.)*

The application's homepage `/index.html`, for example, can be served statically by simply placing an `index.html` file in the `/public` directory.

```html
public
  ├⏤index.html  -  <html><head></head><body>Home | Co</body></html>
```

> Webflo automatically finds the `index.html` file where a path URL `/` is given.

#### The `/server` Directory

This is where JavaScript files for server-side routing are placed. *(Implement this directory for a server-side application, or an isomorphic application, or an API backend.)*

The application's root URL `/`, for example, can be handled on the server by simply placing an `index.js` file in the `/server` directory.

```js
server
  ├⏤index.js  -  export default function() { return { title: 'Home | Co' } }
```

> The data returned by these handlers are either *rendered* into the correspnding `index.html` page from the `/public` directory - *[Server-Side Rendering](#rendering)*, or returned as a JSON response - *[API Responses](#rendering)*. The `Accept` header of the request is used to determine this. (Learn more in [Requests and Responses](../requests-and-responses).)

#### The `/client` Directory

This is where JavaScript files for client-side routing are placed. *(Implement this directory for an application that will deliver a rich client-side experience.)*

The application's root URL `/`, for example, can be handled on the client (the browser) by simply placing an `index.js` file in the `/client` directory.

```js
client
  ├⏤index.js  -  export default function() { return { title: 'Home | Co' } }
```

> The data returned by these handlers are *rendered* into the already running page in the browser - *[Client-Side Rendering](#rendering)*.

#### The `/worker` Directory

This is where JavaScript files for service-worker-level routing are placed. *(Implement this directory for an application that will have special offline capabilities.)*

The application's root URL `/`, for example, can be handled in the browser's service-worker layer by simply placing an `index.js` file in the `/worker` directory.

```js
worker
  ├⏤index.js  -  export default function() { return { title: 'Home | Co' } }
```

> The data returned by these handlers are *rendered* into the already running page in the browser - *[Client-Side Rendering](#rendering)*. (These handlers will also be able to intercept certain other browser-generated requests that cannot be intercepted by client-level handlers.)

### URL-Handling Patterns

URL-handling in Webflo is like an assembly line. Route handlers that are related by a given URL are able to communicate to fullfil a request with a dynamically composed response.

Route handlers recieve a `next()` function that they can call to get a request moving in this assembly line.

#### Flow-Through

In real life, the equivalent directory structure for nested URLs creates a parent-child relationship. URL handlers are implicitly subject to this relationship.

```text
<routingDirectory>
  ├⏤shop
  │  ├⏤index.js
  ├⏤index.js
```

Webflo follows an approach that gets a request going from a parent handler to a child handler. This creates a *flow-through* effect that lets us take advantage of this relationship for new routing capabilities.

A request for the URL `/shop`, for example, would *flow through* two route handlers - the first two handlers below.

> *`file: /server/index.js`*

```js
export default async function(event, app, next) {
    if (next.stepname) {
        let shop = await next();
        return { ...shop, title: shop.title + ' | Co', };
    }
    return { title: 'Home | Co' };
}
```

> *`file: /server/shop/index.js`*

```js
export default async function(event, app, next) {
    if (next.stepname) {
        return next();
    }
    return { title: 'Shop', data: ... };
}
```

> *`file: /server/shop/products/index.js`*

```js
export default async function(event, app, next) {
    if (next.stepname) {
        return next();
    }
    return { title: 'Products', data: [
        ...
    ] };
}
```

In the first handler, we started by asking `next.stepname` if the URL has another step ahead. For an URL like `/shop`, the answer is yes, and the request is exchanged for the child's data. The parent handler thus intercepts both the request going into the child and the response coming back from the child.

In the second handler, we again started by asking `next.stepname` if the URL has another step ahead. This time, the answer is no, and reponse data is returned here for the request.

As the URL `/shop` terminates on the second handler, an outright call to `next()` does not get the request to the third handler. Rather, a *fall-through* effect happens.

#### Fall-Through

In real life, each of Webflo's routing directories above represents a point between the browser and the server across which a request flows. Put together, they give us the following URL-handling layers in the given order.

```text
/client     ⥮
```
```text
/worker     ⥮
```
```text
/server     ⥮
```
```text
/public     ⥮
```

Webflo makes it possible to intercept a request in one layer and forward it *down* to the next layer. For example, a navigation to the root URL `/` can be intercepted by the client-side handler `/client/index.js` and forwarded down - to be further intercepted by the server-side handler `/server/index.js`, where exists. This creates a *fall-through* effect that lets us combine powerful cross-stack routing capabilities on a single URL.

A request for the root URL `/`, for example, would *fall through* on a call to `next()`.

> *file: `/client/index.js`*

```js
export default async function(event, app, next) {
    let remoteContent = await next();
    return remoteContent ? remoteContent : { title: 'Offline Home | Co' };
}
```

> *file: `/server/index.js`*

```js
export default async function(event, app, next) {
    if (next.stepname) {
        let shop = await next();
        return { ...shop, title: shop.title + ' | Co', };
    }
    return { title: 'Home | Co' };
}
```

Put together, requests fall through layers in the following flow:

```text
-> enter `/client` if exists
    -> call `index.js`; return response here? or continue
```
```text
-> enter `/worker` if exists
    -> call `index.js`; return response here? or continue
```
```text
-> enter `/server` if exists
    -> call `index.js`; return response here? or continue
```
```text
-> enter `/public` if exists; find and return `index.html`
```

Now, with the `/public` directory being the last in the stack, a fall-through effect will be especially important for an application that will both implement dynamic routes and serve static content. Static file requests must be forwarded in order to reach the `/public` directory.

The handler below has been designed to ensure that the URL `/logo.png` and `/index.html`, and in fact, other URLs that are not exactly terminating on it, can *flow through* and *fall through*.

```js
webflo-app
  ├⏤server
  │  ├⏤index.js
  │     export default function(event, app, next) {
  │         if (next.stepname/* logo.png or index.html, or other */) {
  │             return next();
  │         }
  │         return { title: 'Home | Co' };
  │     }
  ├⏤public
    ├⏤index.html
    ├⏤logo.png
```

The above also demonstrates that the URLs `/` and `/index.html` would mean two different things where a route handler exists.

+ While the URL `/` would terminate on the handler, the URL `/index.html` would flow through and fall to the `/public` directory and a static file is served.
+ If the request to `/` was made with an `Accept` header that matches `text/html`, Webflo will know to *render* the handler's response into the `index.html` file of the URL and return a rendered HTML response. Otherwise, Webflo will know to return the handler's response as-is - a JSON response. This is detailed in [Requests and Responses](../requests-and-responses),

## Route Handlers

Route handlers are simple functions that are designed to handle incoming requests on an URL and return response data. The standard syntax for a route handler and their contextual parameters and return values are detailed in the [Route Handlers API](../../api/route-handlers) section; and it is all simple to reason about: route handlers use the `this.pathname` and `this.stepname` to know its place in the current URL, the `next.pathname` and `next.stepname` to ask about a forward flow, and the `next()` function to forward a request.

### Parameter Passing

While being used to forward a request, the `next()` function can help to pass on anything to the next handler.

> *file: `/server/index.js`*

```js
export default function(event, app, next) {
    if (next.stepname) {
        return next({ userId: 1 });
    }
    return { title: 'Home | Co' };
}
```

> *file: `/server/shop/index.js`*

```js
export default function(event, app, next) {
    if (next.stepname) {
        return next(app);
    }
    if (app.userId) {
        // Show recommended products
        return { title: 'Shop Plus Recomendations', };
    }
    return { title: 'Shop', };
}
```

In the first handler, we passed an object with the `next()` function. In the second handler, we received it on the `app` parameter. (The `app` parameter is always empty for root URL handlers as they have no parent handler.)

> Parameter passing is a great way to implement one source of truth for every handler on an URL. Think authentication states, certain database or external API tokens, etc, that would be needed at different levels in the handler hierarchy.

### Route Bending

While a call to `next()` automatically takes the request to the next handler in line for an URL, a redirect to an adjacent handler can be made. The `next()` function accepts a second parameter that specifies in which direction to go.

> *file: `/server/docs/index.js`*

```js
export default function(event, app, next) {
    // Serve the highest version of the docs for /latest
    if (next.stepname === 'latest') {
        return next(app, next.pathname.replace('latest', 'v2'));
    }
    return next(app);
}
```

> *file: `/server/docs/v2/index.js`*

```js
export default function(event, app, next) {
    return { title: 'Docs: V2', };
}
```

> *file: `/server/docs/v1/index.js`*

```js
export default function(event, app, next) {
    return { title: 'Docs: V1', };
}
```

### Wildcard Steps

A handler can be designed for a step that is dynamically resolved from the request URL. This generic point in the layout is called a *wildcard step*. Wildcard steps are always a hyphen `-`. (Notice the `-` hyphen in the directory below.)

```text
<routingDirectory>
  ├⏤docs
  │  ├⏤-
  │  │  ├⏤index.js
  │  ├⏤index.js
  ├⏤index.js
```

Above, the handler at `/server/docs/-/index.js` will be called for all matching URLs - like `/docs/v1`, `/docs/v2/getting-started/overview`, etc.

> *file: `/server/docs/-/index.js`*

```js
export default function(event, app, next) {
    // The resolved stepname from the request URL will be available as this.stepname
    console.log(this.stepname); // v2
    console.log(next.stepname); // getting-started
    console.log(next.pathname); // getting-started/overview
}
```

