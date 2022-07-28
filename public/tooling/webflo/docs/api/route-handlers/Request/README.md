---
title: Request
desc: <code>interface Request {}</code>
_index: 2
---
# `interface Request {}`

This is an interface that is additionally implemented by the incoming request instances that route handlers receive on their `event.request` parameter. (Client-side `event.request` objects are an instance of the standard [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) interface. Server-side `event.request` objects are an instance of node.js's [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) class.)

## Properties

+ **`cookies: Object`** - An object representing the request *cookies*. This is an object model of the submitted cookies. Cookie names in path notation are written to their equivalent path in the object. For example, the cookie `q7[sublevel1]=deepvalue` will be accessed as `event.request.cookies.q7.sublevel1`;
+ **`accepts: Object`** - (Available only in server-side instances.) An *accepts* object for the request as returned by [Accepts](https://www.npmjs.com/package/accepts).

## Methods

+ **`parse(): <Promise>Object`** - This returns a promise that resolves to the request payload.

    **Syntax**

    ```js
    let submits = await event.request.parse();
    ```

    **Return Value**

    + **`submits: Object`** - The parsed request data. *(See [Submits](#submits) below.)*

## Inheritance

+ *For client-side `event.request` objects, see the standard [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) interface.*
+ *For server-side `event.request` objects, see node.js's [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) class.*

## Submits

This is the object returned by `await event.request.parse()`, containing the below details of the request payload.

+ **type: String** - The content type of the request payload, based on the `Content-Type` header of the request. This would be `form-data` for `Content-Type === 'application/x-www-form-urlencoded'` or `Content-Type === 'multipart/form-data'`, `json` for `Content-Type === 'application/json'`, `plain` for `Content-Type === 'text/plain'`, `other` for other `Content-Type` values.
+ **payload: Any** - The parsed contents of the request body. This would be [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) for `submits.type === 'form-data'`, JSON (object, array, or primitive) for `submits.type === 'json'`, plain text for `submits.type === 'text'`, [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) for `submits.type === 'other'`.
+ **inputs: Object** - An object representing the request *inputs*, as taken from `submits.payload`, where `submits.payload` is `FormData` or where `submits.payload` is a JSON object or array.
+ **files: Object** - An object representing the uploaded *files*, as taken from `submits.payload`, where `submits.payload` is `FormData`.

The `inputs` and `files` properties above are object models of the submitted fields. Field names in path notation are written to their equivalent path in the object.

The fields below...

```html
<input name="user[profile][visibility]" type="checkbox" value="public" />
<input name="user[profile][pics][]" type="file" multiple />
```

...will be accessed in the application as:

```js
lat payload = await event.request.parse();
let profileVisibility = submits.inputs.user.profile.visibility;
let profilePics = submits.files.user.profile.pics;
```
