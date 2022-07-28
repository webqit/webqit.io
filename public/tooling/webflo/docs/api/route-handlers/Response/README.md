---
title: Response
desc: <code>class Response {}</code>
_index: 3
---
# `class Response {}`

This class is used for returning responses from route handlers. It is available to route handlers on their `event.Response` parameter.

Returning responses with this class allows a handler to include an HTTP status code and some HTTP headers.

```js
export default async function(event, app, next) {
    if (next.stepname) {
        return next();
    }
    return new event.Response({
        status: 200,
        headers: { 'Content-Type': 'application/json', },
        body: { prop1: value1, }
    });
}
```

But in many cases, creating an `event.Response` instance will not be necessary as Webflo will dynamically figure out an appropriate HTTP status code along with a `Content-Type` header for the response as detailed in: [API Calls and Page Requests](../../../fundamentals/requests-and-responses#api-calls-and-page-requests). Here, returning the plain data object will just suffice.

```js
export default async function(event, app, next) {
    if (next.stepname) {
        return next();
    }
    return { prop1: value1, };
}
```

> With the first handler above returning a `Content-Type` header, no automatic content negotiation will be made by Webflo.

## Constructor

```js
let response = new event.Response(params);
```

**Parameters**

+ **`params: Object`** - The response parameters.

    - **Fundamental parameters**

    + **`status: Number`** - An HTTP response code.
    + **`headers: Object`** - HTTP header definitions, in the format: `{ <Header-Name>: <header-value> }`. (For the `Set-Cookie` header, `<header-value>` must be an object - [as shown below](#cookies).)
    + **`body: Any`** - The respone payload.

    - **Occasional parameters**

    + **`filename: String`** - Required where `body` is a `File` object read from the filesystem.

## Properties

*The constructor 's `params` automatically become instance properties. See [Header Shortcuts](#header-shortcuts) below for predefined properties.*

## Methods

### `setHeader(name, value)`

This method sets an HTTP header.

**Parameters**

+ **`name: String`** - The header name - case-insensitive.
+ **`value: Any`** - The header value. (For the `Set-Cookie` header, this must be an object - [as shown below](#cookies).)

**Return Value**

+ **`this`** - The `response` instance.

### `getHeader(name)`

This method retrieves an HTTP header.

**Parameters**

+ **`name: String`** - The header name - case-insensitive.

**Return Value**

+ **`Any`** - The header's value.

## Header Shortcuts

This class exposes certain properties that make it easier to set and access common HTTP headers. Values assigned to these properties are automatically translated to the corresponding headers under the hood; values obtained from these properties are automatically taken from those same headers.

### Content-Type

The [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) header may be set and accessed using the `contentType` property of the response object, and may be provided as the `contentType` field of the constructor's input.

```js
let response = new event.Response({
    body: 'Hello Webflo!',
    contentType: 'text/plain'
});

console.log(response.headers);
// { 'Content-Type': 'text/plain' }
console.log(response.contentType);
// text/plain
```

### Redirect

The [`Location`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location) header may be set and accessed using the `redirect` property of the response object, and may be provided as the `redirect` field of the constructor's input.

```js
let response = new event.Response({
    redirect: '/new-location',
    status: 301,
});

console.log(response.headers);
// { Location: '/new-location' }
console.log(response.redirect);
// /new-location
```

Where no `status` code is given, the `302` (temporary redirect) is used.

### Download

The [`Content-Disposition`](Content-Disposition) header may be set and accessed using the `download` property of the response object, and may be provided as the `download` field of the constructor's input.

```js
let response = new event.Response({
    body: blob,
    download: true,
});

console.log(response.headers);
// { 'Content-Disposition': 'attachment' }
console.log(response.download);
// true
```

A filename may be added to the download directive.

```js
response.download = 'filename.jpg';

console.log(response.headers);
// { 'Content-Disposition': 'attachment; filename="filename.jpg"' }
console.log(response.download);
// filename.jpg
```

Where `download` is set to `false`, the default value `inline` for the header is used.

```js
response.download = false;

console.log(response.headers);
// { 'Content-Disposition': 'inline' }
console.log(response.download);
// false
```

### Cache-Control

The [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) header may be set and accessed using the `cacheControl` property of the response object, and may be provided as the `cacheControl` field of the constructor's input.

```js
let response = new event.Response({
    body: 'John Doe.',
    cacheControl: 'no-store',
});

console.log(response.headers);
// { 'Cache-Control': 'no-store' }
console.log(response.cacheControl);
// no-store
```

### Cross-Origin Requests (CORs)

The [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) header may be set and accessed using the `cors` property of the response object, and may be provided as the `cors` field of the constructor's input.

```js
let response = new event.Response({
    body: 'John Doe.',
    cors: '*',
});

console.log(response.headers);
// { 'Access-Control-Allow-Origin': '*' }
console.log(response.cors);
// *
```

Where `cors` is set to `true`, the wildcard `*` is used. Where `false`, an empty string `''` is used.

### Cookies

The [`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) header may be set and accessed using the `cookies` property of the response object, and may be provided as the `cookies` field of the constructor's input.

```js
let response = new event.Response({
    body: 'John Doe.',
    cookies: {
        cookie1: 'value1',
        cookie2: { value: 'value12' },
    },
});

console.log(response.headers);
// { 'Set-Cookie': { cookie1: 'value1', cookie2: { value: 'value12' } } }
console.log(response.cookies);
// { cookie1: 'value1', cookie2: { value: 'value12' } }
```

Cookie attributes may be set - in camel-case names.

```js
response.cookies.cookie2.secure = true;
response.cookies.cookie2.sameSite = 'Strict';
response.cookies.cookie2.maxAge = 2592000;
```

Where `value` is set to `false` and no `maxAge` attribute is set, a `maxAge` of `0` is implied, effectively expiring the cookie immediately.
