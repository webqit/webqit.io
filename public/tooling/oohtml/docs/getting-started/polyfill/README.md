---
title: The Polyfill
desc: The OOHTML Polyfill.
_index: last
---
# The OOHTML Polyfill

This library is the official polyfill for OOHTML. It can be used either from a CDN or as an npm package.

## Option 1: From a CDN

Add the following script tag to your page to include the all-in-one OOHTML build:

> With the script below, OOHTML will take effect on the page automatically. Two other APIs - [The Observer API](../../resources/the-observer-api) and [Subscript](/tooling/subscript) - will also be exposed as `window.WebQit.Observer` and `window.WebQit.Subscript` respectively.

```html
<script src="https://unpkg.com/@webqit/oohtml/dist/main.js"></script>
```

Or embed individual OOHTML features via their respective build:

  + **[HTML Modules](../../spec/html-modules)** - `<script src="https://unpkg.com/@webqit/oohtml/dist/html-modules.js"></script>`
  + **[HTML Imports](../../spec/html-imports)** - `<script src="https://unpkg.com/@webqit/oohtml/dist/html-imports.js"></script>`
  + **[Namespaced HTML](../../spec/namespaced-html)** - `<script src="https://unpkg.com/@webqit/oohtml/dist/namespaced-html.js"></script>`
  + **[The State API](../../spec/the-state-api)** - `<script src="https://unpkg.com/@webqit/oohtml/dist/state-api.js"></script>`
  + **[Subscript](../../spec/subscript)** - `<script src="https://unpkg.com/@webqit/oohtml/dist/subscript.js"></script>`

## Option 2: As an npm Package

With [npm available on your terminal](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), run the following command to install OOHTML:

```text
$ npm i -g npm
$ npm i --save @webqit/oohtml
```

Import and initialize the installed package with a *window* object in the current browser or server evironment.

You may initialize the all-in-one OOHTML module:

```js
// Import
import OOHTML from '@webqit/oohtml';
// Initialize
OOHTML.call(window);
```

Or a specific feature module:

```js
// Import
import State from '@webqit/oohtml/src/state/index.js';
// Initialize
State.call(window);
```

### Server-Side Initialization

To use OOHTML for server-side rendering, a library like [jsdom](https://github.com/jsdom/jsdom) would be used to create a DOM instance. Now, the instance's `window` object would be used to initialize OOHTML.

```js
// Import OOHTML
import OOHTML from '@webqit/oohtml';
// Import jsDom
import jsdom from 'jsdom';
// Utilities we'll need
import fs from 'fs';
import path from 'path';

// Read the HTML document file from the server
const documentFile = fs.readFileSync(path.resolve('./index.html'));
// Instantiate jsdom so we can obtain the "window" for OOHTML
// Detailed instruction on setting up jsdom is available in the jsdom docs
const JSDOM = new jsdom.JSDOM(documentFile.toString());

// Initialize OOHTML...
OOHTML.call(JSDOM.window);

// And we can use OOHTML as normal
const document = JSDOM.window.document;
// The document's templates object...
let template1 = document.templates.template1;
// etc
```

## Next Steps

You want to visit each of [OOHTML's features](../../spec).



