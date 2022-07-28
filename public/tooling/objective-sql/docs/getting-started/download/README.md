---
title: Download
desc: Follow the download options to add Objective SQL to your project.
_index: last
---
# Download Options

Objective SQL can be used either from a CDN or as an npm package.

## Option 1: From a CDN

Add the following script tag to your page to include the all-in-one Objective SQL module:

```html
<script src="https://unpkg.com/@webqit/objective-sql/dist/main.js"></script>
```

The above tag loads Objective SQL into a global "WebQit" object.

```html
<script>
    const ObjSQL = window.WebQit.ObjectiveSQL;
</script>
```

## Option 2: As an npm Package

With [npm available on your terminal](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), run the following command to install Observer:

```text
$ npm i @webqit/objective-sql
```

Import the installed package:

```js
// Import the initializer
import ObjSQL from '@webqit/objective-sql';
```

## Next Steps

Continue to [learning the API](../../learn).