---
title: Loaders
desc: Packages that extend the capabilities of the OOHTML Bundler.
---
# Loaders

Play UI loaders are packages that extend the capabilities of the OOHTML Bundler. Play UI comes with certain loaders built-in and also makes it possible to provide custom loaders.

## Overview

Loaders are functions that are called with each file during the bundling process. Multiple loaders are made cascaded and a loader will be expected to call the next. This makes for an awesome processing pipeline for each file being bundled. But it also requires thoughtfulness in the order in which these loaders are specified.

By default, the main Play UI bundler only handles `.html` files and images (`.ico`, `.png`, `.jpg`, `.jpeg`, `.svg`). Then it features built-in loaders that extend the list.

## Built-Ins

### `md-loader`

The `md-loader` loader is used to load `.md` (markdown) files into HTML exports just the way regular HTML files are. It takes an initial step of converting the markdown content into HTML using the [Showdown](https://github.com/showdownjs/showdown) library, then goes ahead to add it to the bundle as a *module export*. Markdown links are automatically resolved to better work as HTML links. A few other transformations are supported through arguments/flags. (Learn more about specifying arguments/flags for a loader [here](../#loaders).)

#### Arguments/Flags

 All parameters are optional.

+ **`base_url`** - Set this to a value that will be used as the base URL for relative links. This is similar to how the [`[ASSETS_PUBLIC_BASE]`](../#assets_public_base) option works.
+ **`outline_generation`** - Set this to a *non-empty* value to generate a JSON outline of the page's content. The generated outline will show up in the meta data for the file in the bundle's overall [JSON outline](../#create_outline_file).
+ **`code_highlighting`** - Set this to a *non-empty* value to transform code blocks into stylable markup using the [Showdown-Highlight](https://github.com/Bloggify/showdown-highlight) utility. The transformed code blocks are highlighted in the UI on adding any of the [Highlight.js](https://highlightjs.org/) CSS to the page.
+ **`flavor`** - This equates to any of [Showdown's three flavours](https://github.com/showdownjs/showdown#flavors): `original`, `vanilla`, `github`.

#### Other

+ **Markdown Metadata** - By default, `md-loader` automatically parses any found markdown metadata (defined at the top of the document between ««« and »»» or between --- and ---) into JSON and this will show up in the meta data for the file in the bundle's overall [JSON outline](../#create_outline_file). Below is an example metadata:

  ```md
  ---
  description: Page description.
  ---
  # Page Title
  ```
+ **Markdown Tables** - The markdown table syntax is supported by default. Below is an example table:

  ```md
  | h1    |    h2   |      h3 |
  |:------|:-------:|--------:|
  | 100   | [a][1]  | ![b][2] |
  | *foo* | **bar** | ~~baz~~ |
  ```

#### Usage

The `md-loader` loader is used by specifying `default:md-loader` in the [`[LOADERS]`](../#loaders) config option.

## Custom Loaders

Custom Loaders are easy to develop. They are basic functions that recieve the current file being processed along with a few paramters, to return a fully-formed *module export* markup.

### Syntax

```js
export default function loadsCSS(resource, params, args, received, meta, next) {
  if (received || !resource.endsWith('.css')) {
      // Or let the flow continue
      return next(received);
  }
  // Return a module export format
  return '<style exportgroup="">...</style>';
}
```

**Parameters**

+ **`resource: String`** - The filename of the resource being processed - relative to the current working directory (CWD).
+ **`params: Object`** - The [`options` object](../#options) that the Bundler was initialized with. It also has an additional property `indentation` - a number which represents how deep in the source directory the given resource is. This number is `0` at the root of the source directory.
+ **`args: Object`** - The [`args` object](../#loaders) defined specifically for the loader.
+ **`received: String`** - The output forwarded (that is, `next()`ed) by the previous loader in the list, if any.
+ **`meta: Object`** - The *meta* object for the given resource. Properties can be added and they will show up in the meta data for the file in the bundle's overall [JSON outline](../#create_outline_file).
+ **`next: Function`** - A function that forwards control to the next loader in the list, if any, and if none, to the default internal loader. It accpets only one parameter, which is received by the next loader on its `received` parameter. (When any value passed this way reaches the internal loader, it is added to the bundle as-is without any further processing of the resource.)

**Return Value**

Loaders are expected to return a valid markup string as the *module export* for the resource.

### Error Handling

Loaders may throw exceptions, they will be gracefully handled, that is, formatted and printed to the console.

### Usage

Custom loaders are used by specifying their filename in the [`[LOADERS]`](../#loaders) config option. Loaders installed as an npm package are used by specifying their package name.