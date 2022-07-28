---
title: Download
desc: Follow the download options to add Subscript to your project.
_index: first
---
# Download Options

Subscript can be used either from a CDN or as an npm package.

## Option 1: From a CDN

Add the following script tag to your page to include the all-in-one Subscript module:

```html
<script src="https://unpkg.com/@webqit/subscript/dist/main.js"></script>
```

The above tag loads Subscript into a global "WebQit" object.

```html
<script>
    const { SubscriptFunction, SubscriptClass } = window.WebQit.Subscript;
</script>
```

## Option 2: As an npm Package

With [npm available on your terminal](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), run the following command to install Subscript:

```text
$ npm i @webqit/subscript
```

Import the installed package:

```js
// Import the initializer
import { SubscriptFunction, SubscriptClass } from '@webqit/subscript';
```
