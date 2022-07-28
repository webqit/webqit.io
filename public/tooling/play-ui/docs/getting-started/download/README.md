---
title: Download
desc: Play UI's download options
_index: 1
---
# Download Options

In the Play UI family:

+ [Play UI JavaScript](#play-ui-javascript)
+ [Play UI Command Line](#play-ui-command-line)

## Play UI JavaScript

The Play UI JavaScript library can be used either from a CDN or as an npm package.

### Option 1: From a CDN

Add the following script tag to your page to include the all-in-one Play UI module:

```html
<script src="https://unpkg.com/@webqit/playui-js/dist/main.js"></script>
```

The above tag loads Play UI into a global "WebQit" object.

```html
<script>
    const $ = window.WebQit.$;
</script>
```

### Option 2: As an npm Package

With [npm available on your terminal](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), run the following command to install Play UI:

```text
$ npm i @webqit/playui-js
```

Import and initialize the installed package:

```js
// Import the initializer
import PlayUI from '@webqit/playui-js';
// Initialize
const $ = PlayUI();
```

And you can selectively import Play UI's descrete parts to streamline your imports to your needs. The [API reference](../../api) has the *import* syntax for each of Play UI's functions. For example:

```js
// Import a function...
import { htmlSync as html } from '@webqit/playui-js/src/dom/index.js';

// Supply an element as first argument...
html(selector, 'Play away!');
```

Details are in the [Quick Start](../overview#use-as-descrete-utilities) guide.

## Play UI Command Line

The Play UI Command Line Interface is installable as an npm package.

With [npm available on your terminal](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), run the following command to install Play UI CLI as a *dev dependency* to your project:

> System Requirements: Node.js 12.0 or later

```text
$ npm i -g @webqit/playui-cli --save-dev
```

The `-g` flag makes it a global installation. It makes the `playui` command available from any location on your terminal. Omit this flag to install Play UI CLI to just your project directory.

To test, run [`playui help`](../../cli/help); an overview of available commands will be shown.

## Next Steps

The [API Reference](../../api) or the [Command Line Reference](../../cli).