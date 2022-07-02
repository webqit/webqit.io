---
title: Download
desc: Follow the download options to add the Observer API to your project.
_index: last
---
# Download Options

Observer can be used either from a CDN or as an npm package.

## Option 1: From a CDN

Add the following script tag to your page to include the all-in-one Observer module:

```html
<script src="https://unpkg.com/@webqit/observer/dist/main.js"></script>
```

The above tag loads Observer into a global "WebQit" object.

```html
<script>
    const Observer = window.WebQit.Observer;
</script>
```

## Option 2: As an npm Package

With [npm available on your terminal](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), run the following command to install Observer:

```text
$ npm i @webqit/observer
```

Import the installed package:

```js
// Import the initializer
import Observer from '@webqit/observer';
```

## Next Steps

Continue to [learning the API](../../api).