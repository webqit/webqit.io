---
title: Requests and Responses
desc: HTTP Requests and Responses.
_index: 1
---
# HTTP Requests and Responses

Routes in Webflo can be designed for different types of requests and responses.

## API Calls and Page Requests

HTTP requests are capable of specifying (using the `Accept` header) in which format a response should be returned by the server. Webflo makes it possible to use this medium to access the *data component* of a route differently from its *HTML component*. Routes in Webflo are therefore designed to treat data as a standalone component from HTML, enabling reusability for both.

A route handler would simply concern itself with data.

```js
webflo-app
  ├⏤server
     ├⏤index.js
        export default function(event, app, next) {
            if (next.stepname) {
                return next();
            }
            return { title: 'Home | Co' };
        }
```

The data returned would be returned as-is - a JSON response - where the `Accept` header of the request  does not match `text/html` but matches `application/json`. This would be taken as an *API call*. The response header is automatically given `Content-Type: 'application/json'`.

For API endpoints, the above would be everything for the request and response flow. For routes that will deliver a rendered HTML response, the HTML to render would be a standalone file in the `/public` directory.

```html
webflo-app
  ├⏤public
    ├⏤index.html <html><head></head><body>...</body></html>
```

Webflo knows to find a `/public/index.html` file for [rendering](../rendering) the data returned by `/server/index.js`. Nested routes are given the choice to either have their own `index.html` file at the corresponding location in the `/public` directory or inherit the closest one up in their ancestrial line.

A rendered HTML page is therefore returned where the `Accept` header of the request matches `text/html` (as a web browser would normally have it for page navigation). This would be taken as a *page request*. The response header is automatically given `Content-Type: 'text/html'`.

The general rule for this content negotiation therefore becomes: a rendered HTML response for *page requests* (`Accept` header matching `text/html`), and a JSON response for API calls (`Accept` header not matching `text/html` but matching `application/json`).

> An automatic `Accept: application/json` header - [just ahead](#automatic-headers) - can always be used on API-only endpoints to tell Webflo to always return a JSON response.

As for the static `index.html` file in the `/public` directory, being in the `/public` directory means that a direct access would still be possible, as it is with all the files in this directory. But route handlers will have a chance to intercept this direct access, where actually necessary.

```js
webflo-app
  ├⏤server
  │  ├⏤index.js
  │     export default function(event, app, next) {
  │         if (next.stepname && next.stepname !== 'index.html') {
  │             return next();
  │         }
  │         // Both URLs "/" and "/index.html" will lead here 
  │         return { title: 'Home | Co' };
  │     }
  ├⏤public
    │  // No more direct access to this file
    ├⏤index.html <html><head></head><body>...</body></html>
```

Overall, this approach lets us *reuse more* and *repeat less*. A route handler alone gives us data; an `index.html` file alone gives us static HTML; a combination gives us the choice of either data, static HTML or rendered HTML - in just simple *content negotiation*.

Now, where a route handler returns a value other than an array or an object, no content negotiation takes place (and no automatic `Content-Type` header). Webflo will try to make a string response of the returned value.

## Other Types of Responses

Route handlers may return an instance of the [`event.Response`](../../api/event_Response) class as a response. And Webflo's automatic content negotiation can still take place.

```js
export default async function(event, app, next) {
    if (next.stepname) {
        return next();
    }
    return new event.Response({
        body: { title: 'Home | Co' },
    });
}
```

The response data will be available in the `.body` property of the instance. Parent handlers may test for this type of response object to obtain the actual reponse data.

```js
export default async function(event, app, next) {
    if (next.stepname) {
        let childResponse = await next();
        if (childResponse instanceof event.Response) {
            childResponse = childResponse.body;
            return { ... };
        }
    }
    return { ... };
}
```

HTTP status codes and headers may be returned with the instance via the `status` and `headers` fields respectively.

```js
return new event.Response({
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { title: 'Home | Co' },
});
```

The `Content-Type` header is a special header that will mark the response as final; no automatic content negotiation will take place. This is also the case with the `Location` header, used to initiate a redirect.

[Header Shortcuts](../../api/event_Response#header-shortcuts) may also be used to more conveniently set and access common headers.

```js
let response = new event.Response({
    headers: { 'X-Custom-Header': 'some value' },
    body: true, // JSON Boolean value
});
response.contentType = 'application/json';
response.cacheControl = 'no-store';
```

```js
console.log(response.headers);
// { 'X-Custom-Header': 'some value', 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
console.log(response.contentType);
// 'application/json'
console.log(response.cacheControl);
// 'no-store'
```

And the `.setHeader()` and `.getHeader()` methods can always be used to set and access headers in a case-insensitive manner.

```js
console.log(response.getHeader('x-custom-Header'));
// 'some value'
```

Put together, any type of response can be conveniently returned this way.

Now, where a route handler returns nothing, Webflo will know to return a `404` HTTP response.

## The Request and Response Cycle

HTTP request and response cycles are generally controlled by headers. Webflo offers the easiest way to work with headers.

### Automatic Headers

Request headers can always be sent by a HTTP client or browser, and [response headers](../../api/event_Response) can always be returned by route handlers. But in Webflo, it is possible to get certain headers automatically added to these requests and responses. These *automatic headers* are defined on the command line using [`$ webflo config headers`](../../cli/config#headers).

The underlying JSON config file `.webqit/webflo/config/headers.json` may be directly edited. Entries go into the `entries` array field as shown below.

```json
{
    "entries": [
        {
            "type": "request", // Or "response"
            "url": "/api/v1", // Or a glob pattern
            "name": "Accept", // Or any other header
            "value": "application/json"
        }
    ]
}
```

**Fields**

+ **`type: String`** - The header type. This can be one of two values: `request` for request headers, `response` for response headers.
+ **`url: String`** - The URL on which the header takes effect. This can be a glob pattern. For example, the value `*` would mean *any URL*, and the value `*.js` would mean *any URL ending as `.js`*, and so on. *(See the [Micromatch](https://www.npmjs.com/package/micromatch) documentation for a detailed glob syntax.)*
+ **`name: String`** - The header name. This can take a convention that gets the header either appended or prepended to any existing declaration in the target headers list: the prefix `+` to append; the suffix `+` to prepend.

    In the example above, the name `Accept` would set the value `application/json` as the `Accept` header of the incoming request; but `+Accept` would get it rather appended to any existing `Accept` header, and `Accept+` would get it prepended.

+ **`value: String`** - The header value.

### Automatic Redirects

A *[redirect response header](../../api/event_Response#redirect)* can always be returned by route handlers. But in Webflo, it is possible to get certain URLs automatically redirected as the requests enter the application. *Automatic redirects* are defined on the command line using [`$ webflo config redirects`](../../cli/config#redirects).

The underlying JSON config file `.webqit/webflo/config/redirects.json` may be directly edited. Entries go into the `entries` array field as shown below.

```json
{
    "entries": [
        {
            "from": "/old-url", // Or a glob pattern
            "to": "/api/v1",
            "reuseQuery": true, // false by default
            "code": "302" // 301 by default
        }
    ]
}
```

**Fields**

+ **`from: String`** - The URL on which the redirect takes effect. This can be a glob pattern. For example, the value `*` would mean *any URL*, and the value `*.js` would mean *any URL ending as `.js`*, and so on. *(See the [Micromatch](https://www.npmjs.com/package/micromatch) documentation for a detailed glob syntax.)*

+ **`to: String`** - The destination URL. Where the `from` URL is a glob pattern that matches only the begining part of an incoming request URL, the final destination URL will be the `to` URL plus the rest of the incoming request URL.

    For example, if the `from` URL is `/old-url*` and the `to` URL is `/new-url`, and the incoming request URL is `/old-url/page`, the final destination URL will be `/new-url/page`.

+ **`reuseQuery: Boolean`** - A flag that specifies whether to reuse the query parameters from the incoming request URL in the destination URL. Default is false.

    For example, if the incoming request URL is `/old-url/page?q=search-word`, the final destination URL will be `/new-url/page?q=search-word`.

+ **`code: Number`** - The redirect code. This can be one of two values: `301` for a permanent redirect - the default, `302` for a temporary redirect.

> Webflo also supports HTTPS redirects and `www` subdomain redirect. See [`$ webflo config server`](../../cli/config#server) for details.
