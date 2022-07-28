---
title: URL
desc: <code>class URL {}</code>
_index: 1
---
# `class URL {}`

This is an interface that is additionally implemented by the request URL objects that route handlers receive on their `event.url` parameter. (Both client-side and server-side `event.url` objects are instances of the standard [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) interface.)

## Properties

+ **`query: Object`** - An object model of the URL query parameters. This maintains a live, two-way relationship between itself and the `.search` string property of its base URL object. Changes made on one end are automatically reflected on the other.

    **Case:**

    > *`event.url.href`: `https://example.com/path?q1=value1&q2=value2`*

    *Modify the query string:*

    ```js
    event.url.search += '&q3=value3';
    console.log(event.url.query);
    // { q1: 'value1', q2: 'value2', q3: 'value3' }
    ```

    *Replace the query object:*

    ```js
    event.url.query += { q4: 'value4', q5: 'value5', };
    console.log(event.url.search);
    // ?q4=value4&q5=value5
    ```

    *Modify the query object in-place:*

    ```js
    event.url.query.q6 = 'value6';
    delete event.url.query.q4;
    console.log(event.url.search);
    // ?q5=value5&q6=value6
    ```

    Additionally, query parameter names in path notation are written to their equivalent path in the object model.

    **Case:**

    > *`event.url.href`: `https://example.com/path`*

    *Set an path parameter that resolves to an object:*

    ```js
    event.url.search = 'q7[sublevel1][sublevel2]=deepvalue';
    console.log(event.url.query);
    // { q7: { sublevel1: { sublevel2: 'deepvalue' } } }
    ```

    *Set an path parameter that resolves to an array:*

    ```js
    event.url.search = 'q7[sublevel1][sublevel2][]=deepvalue';
    console.log(event.url.query);
    // { q7: { sublevel1: { sublevel2: [ 'deepvalue' ] } } }
    ```

## Inheritance

+ *See the standard [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) interface.*
