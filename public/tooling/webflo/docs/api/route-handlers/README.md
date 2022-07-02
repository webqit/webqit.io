---
desc: Route Handlers API
_index: first
---
# Route Handlers

Route handlers are simple *export* functions that are designed to intercept a request and return a response. Webflo sticks with one way to define route handlers across all routing layers.

**Syntax**

```js
export default async function(event, app, next) {
}
```

The syntax also supports naming a handler after a specific HTTP method, where that level of modularity is needed.

```js
export async function get(event, app, next) {
}
```

```js
export async function post(event, app, next) {
}
```

```js
export async function del(event, app, next) {
}
```

```js
export async function put(event, app, next) {
}
```

*The default handler will always be called where no method-specific handlers exist.*

**Parameters**

+ **`event: NavigationEvent`** - A [`NavigationEvent`](NavigationEvent) instance fired for the request.
+ **`app: Any`** - Any incoming value being passed by a parent handler. *(See [Parameter Passing](../../fundamentals/routing#parameter-passing).)*
+ **`next: Function`** - The function to call to forward a request.

    **Syntax**

    ```js
    var response = await next([app[, pathname]]);
    ```

    **Parameters**

    + **`app: Any`** - An optional value to pass to child handler. *(See [Parameter Passing](../../fundamentals/routing#parameter-passing).)*
    + **`pathname: String`** - An optional pathname specifying the direction of the flow. *(See [Route Bending](../../fundamentals/routing#route-bending).)*

    **Return Value**

    + **`response: Promise<Object|event.Response>`** - A promise that resolves to the return value from child handler. *(Handler return values just ahead.)*

**Contextual Parameters**

+ **`this.stepname: String`** - The exact name of the current step in the URL path.
+ **`this.pathname: String`** - The pathname to the current step in the URL path.
+ **`this.dirname: String`** - (Available only in server-side handlers.) The file name of the current handler.
+ **`this.env: Object`** - (Available only in server-side handlers.) Any environmental variables defined in an `.env` file at project root.
+ **`this.layout: Object`** - (Available only in server-side handlers.) An object that exposes the filesystem layout of the project as configured via `$ webflo config layout`.
+ **`next.stepname: String`** - The exact name of the next step in the URL path.
+ **`next.pathname: String`** - The pathname for the rest of the steps in the URL path.

**Return Value**

+ **`Any`** - A plain JavaScript object or array (JSON-stringifiable) may be returned and will translate to the *reponse data* (stringified JSON) where the request is an [API Call](../../fundamentals/requests-and-responses#api-calls-and-page-requests), or the *rendering data* where the request is a [Page Request](../../fundamentals/requests-and-responses#api-calls-and-page-requests). (For example: `return { title: 'Home | Co' }`). Any other value, e.g. `0`, may be returned, and Webflo will try to send it as-is.
+ **`undefined`** - An `undefined` will translate to a `404 - Not Found` HTTP response.
+ **`Response`** - An instance of [`event.Response`](Response) with a `.body` property being any of the above may be returned. (For example: `return new event.Response({ body: { title: 'Home | Co' }, headers: {...} })`).
+ **`Promise`** - A promise that resolves to any of the above may be returned. (Route handlers can thus be an `async` function.)

## Associated APIs
