---
title: NavigationEvent
desc: <code>class NavigationEvent {}</code>
_index: first
---
# `class NavigationEvent {}`

This is the `NavigationEvent` that is fired on every request which route handlers receive on their `event` parameter.

## Properties

+ **`url: URL`** - An object representing the request URL. *(See class [`URL`](../URL).)*
+ **`request: Request`** - The incoming request object. *(See interface [`Request`](../Request).)* On the client side, this would be an extended instance of the standard [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) interface. On the server side, this would be an extended instance of node.js's [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) class.
+ **`Response: Class`** - A *class* for instantiating a new reponse. *(See class [`event.Response`](../Response).)*