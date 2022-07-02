---
desc: Automatically bundle static HTML files from the filesystem into HTML Modules.
---
# `$ playui bundle`

The **`playui bundle`** command is used to automatically bundle static HTML files from the filesystem into *[HTML Modules](/tooling/oohtml/docs/getting-started/overview#html-modules)*.

## Overview

Here, each directory will represent a *module* element and the files within it will be the module's exports. We will take the following directory structure as an example:

```html
project-root
  ├-- views
    ├-- about
    │ ├-- index.html <div class="page-container">About Page</div>
    ├-- home
      ├-- index.html <div class="page-container">Home Page</div>
```

The goal is to translate the above layout into the following *module* structure and get it written to a single file that can be linked to:

```html
<template name="views">

    <template name="home">
       <div exportgroup="index" class="page-container">Home Page</div>
    </template>

    <template name="about">
       <div exportgroup="index" class="page-container">About Page</div>
    </template>

</template>
```

*file: `./bundle.html`*

You can find a working example of [a typical module structure](/tooling/oohtml/docs/learn/examples/spa) right at OOHTML's documentation.

Now, on getting the files into a single bundle, we would next link to it as a remote content for a `<template>` element - the actual module element - in the main document.

```html
<html>

  <!--
  Here, we link to the remote content
  -->
  <head>
    <template name="main" src="./bundle.html"></template>
  </head>

  <!--
  Here our application router would be dynamically pointing to either "home" or "about"
  -->
  <body template="main/views/about">
    <import name="index"></import>
  </body>

</html>
```

That said, lets go on to bundle.

## Usage

> Syntax: **`playui bundle`**

Navigate to `project-root` and run **`playui bundle`**. Two files should be reported bundled. 

<html-import name="playui-bundle-1" template="page/tooling/play-ui/docs/cli/bundle"></html-import>

Remote content is now ready at `./bundle.html`!

Now, beyond this point are so many other things we can do! And here is where a few configurations come in!

Run **`playui config bundler`** to walk down the options.

> On completing the options below, the **[`playui config`](../config)** command will save the configurations to a JSON file at `./.webqit/playui-cli/config/bundler.json`. Subsequent calls to **`playui bundle`** will be based on the saved configurations. And subsequent calls to **`playui config bundler`** will pull up the saved configurations for update.

### Options

#### `[ENTRY_DIR]`

This specifies the entry point into the filesystem - the *source directory*. The default value is `./`, which resolves to the current working directory (CWD) on the terminal.

This is good for pointing the bundler to the actual *views (or equivalent)* folder in the project directory. E.g. `./views`. (An absolute path may also be used.)

To specify multiple entry directories, slot in the exact string `[name]` as a placeholder on a segment in the path. Bundler will loop through all folders at that level in the directory to resolve the placeholder and obtain a final path. Specifying `./views/[name]` as the entry directory, for example, will equate to running **`playui bundle`** on both `./views/about` and `./views/home`.

#### `[OUTPUT_FILE]`

This specifies the file name of the output bundle. The default value is `./bundle.html`, which is resolved relative to [`[ENTRY_DIR]`](#entry_dir).

This is good for directing the output bundle to the actual *public (or equivalent)* folder of the application. E.g. `./public/bundle.html`. (An absolute path may also be used.)

Where multiple source directories are specified in the [`[ENTRY_DIR]`](#entry_dir) option above, this option will require a `[name]` placeholder, this time, to specify a unique output file each for the source directories. Specifying `./public/[name].bundle.html` as the output file, for example, will equate to saving the output bundle of `./views/about` to `./public/about.bundle.html`, and the output bundle of `./views/home` to `./public/home.bundle.html`.

#### `[ASSETS_STORAGE_BASE]`

This specifies the output directory for images or other assets bundled from the source directory. (See [Bundling Assets](#bundling-assets) below.) The default value is `./`, which is resolved relative to [`[ENTRY_DIR]`](#entry_dir), and which means assets will not be copied to any new location. If set to *empty*, the same directory as [`[OUTPUT_FILE]`](#output_file)'s is used.

This is good for directing assets like images to the actual place in the *public (or equivalent)* folder of the application. E.g. `./public/assets`. (An absolute path may also be used.)

This option supports the same `[name]` placeholder as used in the [`[ENTRY_DIR]`](#entry_dir) option, this time, to specify a unique *assets storage* directory each for the source directories. Specifying `./public/assets/[name]` as the *assets storage* path, for example, will equate to saving the assets bundled at `./views/about` to `./public/assets/about`, and the assets bundled at `./views/home` to `./public/assets/home`.

#### `[ASSETS_PUBLIC_BASE]`

This specifies the HTTP path that maps to [`[ASSETS_STORAGE_BASE]`](#assets_storage_base) in the filesystem. The default value is `/`, which is assumed to map to the *public (or equivalent)* folder of the application. The *`src` (or equivalent)* attribute of every asset bundled will be prefixed with this path.

This is good for aligning the public path for assets with the internal [`[ASSETS_STORAGE_BASE]`](#assets_storage_base) path. E.g. `/assets`, where `[ASSETS_STORAGE_BASE]` had been set to `./public/assets`.

#### `[MAX_DATA_URL_SIZE]`

This specifies the upper limit of the file size under which to inline the contents of an image file or other asset as *[data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)*. (See [Bundling Assets](#bundling-assets) below.) The default value is `1024`, in bytes. Assets smaller than this size will be bundled with *data URLs*.

This is good for having small image files embed their own content instead of having them create additional HTTP requests on the page.

#### `[LOADERS]`

This specifies an optional list of loaders for the bundling operation. (See [Loaders](loaders).) The default value is an empty object `{}`.

This is good for extending the capabilities of the bundler to custom-load certain file formats that are not natively provided for.

Skip where not apply. Or follow the prompt to interactively specify loaders, optionally along with their arguments or flags. The following options are presented recursively:

+ **`[name]`** - The path to a function, or the name of an installed npm package, that is a [Play UI loader](loaders). (The bundler imports loaders using the ES6 `import()` syntax.)

  To refer to the bundler's [built-in loaders](loaders#built-ins), like the markdown-to-HTML loader ([`md-loader`](loaders#md-loader)), simply add the prefix `default:` to the loader's bare name. E.g. `default:md-loader`.

+ **`[args]`** - Optional list of parameters (arguments/flags) for a loader - each in name/value pair.

  Skip where not apply. Or follow the prompt to interactively specify parameters. The following options are presented recursively:

  + **`[name]`** - The name of the parameter as required by a loader. E.g. `flavor` - in the default [`md-loader`](loaders#md-loader).
  + **`[value]`** - The value of the parameter. E.g. `github` - for the `flavor` parameter above.

### Advanced Options

#### `[IGNORE_FOLDERS_BY_PREFIX]`

This specifies a comma-separated list of prefixes for certain types of folders to ignore. Folders with a name that begins with any of the listed prefixes are ingnored. The default value is an array of one prefix: dot `.`.

This is good for excluding certain system folders or *dot directories* like `.git`. *Dot directories* are automatically excluded by the default value.

#### `[CREATE_OUTLINE_FILE]`

This specifies whether or not to generate a JSON outline of the bundle. The default value is `create`. The generated file is named after [`[OUTPUT_FILE]`](#output_file); e.g. `./bundle.html.json`. Set to `create_merge` to merge the generated JSON outline with any previously generated one. Set to *empty* to disable outline generation.

This is good for programmatically traversing the module tree. Simply `JSON.parse()` the contents of `./bundle.html.json`.

### OOHTML-Related Options

#### `[MODULE_EXT]`

This specifies an extended tag name for the module element. This value will be set to the `is` attribute of the `<template>` elements generated by the bundler. The is empty by default.

This is good for automatically extending generated `<template>` elements. A value like `special-module` will generate `<template is="special-module"></template>` elements. Be sure to take into account the `element.template` setting in the [OOHTML meta tag](/tooling/oohtml/docs/spec/html-modules#polyfill-support) of the page where the bundle will be used.

#### `[MODULE_ID_ATTR]`

This specifies the attribute name for designating the *module ID*. The default value is `name` which conforms to [the default module ID attribute](/tooling/oohtml/docs/spec/html-modules#convention) in the OOHTML spec.

This should generally only be changed to align with the `attr.moduleid` setting in the [OOHTML meta tag](/tooling/oohtml/docs/spec/html-modules#polyfill-support) of the page where the bundle will be used.

#### `[EXPORT_MODE]`

This specifies the syntax for designating the *module exports* within the generated `<template>` elements. The default value is `attribute` which translates to using the `exportgroup` attribute (or [`[EXPORT_GROUP_ATTR]`](#export_group_attr)) to designate *module exports*. Set to `element` to use the `<export>` element (or [`[EXPORT_ELEMENT]`](#export_element)) instead.  (See [the two standard convetions](/tooling/oohtml/docs/spec/html-modules#convention).)

#### `[EXPORT_GROUP_ATTR]`

This specifies the attribute name for designating the *export ID* in [attribute mode](#export_mode). The default value is `exportgroup` which conforms to [the default syntax](/tooling/oohtml/docs/spec/html-modules#convention) in the OOHTML spec. E.g. `<div exportgroup="export-id"></div>`.

This should generally only be changed to align with the `attr.exportgroup` setting in the [OOHTML meta tag](/tooling/oohtml/docs/spec/html-modules#polyfill-support) of the page where the bundle will be used.

> This option is only shown when the [export mode](#export_mode) option is set to `attribute`.

#### `[EXPORT_ELEMENT]`

This specifies the tag name for designating *module exports* in [element mode](#export_mode). The default value is `export` which conforms to [the default syntax](/tooling/oohtml/docs/spec/html-modules#convention) in the OOHTML spec. E.g. `<export> <div></div> </export>`

This should generally only be changed to align with the `element.export` setting in the [OOHTML meta tag](/tooling/oohtml/docs/spec/html-modules#polyfill-support) of the page where the bundle will be used.

> This option is only shown when the [export mode](#export_mode) option is set to `element`.

#### `[EXPORT_ID_ATTR]`

This specifies the attribute name for designating the *export ID* in [element mode](#export_mode). The default value is `name` which conforms to [the default syntax](/tooling/oohtml/docs/spec/html-modules#convention) in the OOHTML spec. E.g. `<export name="export-id"> <div></div> </export>`

This should generally only be changed to align with the `element.export` setting in the [OOHTML meta tag](/tooling/oohtml/docs/spec/html-modules#polyfill-support) of the page where the bundle will be used.

> This option is only shown when the [export mode](#export_mode) option is set to `element`.

## Bundling Assets

While HTML modules are created by reading the file's contents, assets, like images, are handled differently. These files are copied from their location into the [`[ASSETS_STORAGE_BASE]`](#assets_storage_base) directory to make them accessible to HTTP requests. An appropriate HTML element that points to this new location is automatically generated as the *module export* in the bundle. This is illustrated below.

We have an image file at `project-root/assets/img` and we have set the [`[ASSETS_STORAGE_BASE]`](#assets_storage_base) to `./public`, and the [`[OUTPUT_FILE]`](#output_file) option to `./public`.

```html
project-root
  │
  ├-- assets
  │ ├-- img
  │   ├-- image1.png
  │
  ├-- views
    ├-- about
    │ ├-- index.html <div class="page-container">About Page</div>
    ├-- home
      ├-- index.html <div class="page-container">Home Page</div>
```

On running the **`playui bundle`** command, our final directory structure will be...


```html
project-root
  │
  ├-- assets
  │ ├-- img
  │   ├-- image1.png
  │
  ├-- public
  │ ├-- assets
  │ │ ├-- img
  │ │   ├-- image1.png
  │ │
  │ ├-- bundle.html
  │
  ├-- views
    ├-- about
    │ ├-- index.html <div class="page-container">About Page</div>
    ├-- home
      ├-- index.html <div class="page-container">Home Page</div>
```

...and an `<img>` element pointing to the *public* location of `image1.png` is added as a *module export* to the bundle.


```html
<template name="assets">

    <template name="img">
       <img exportgroup="image1" src="/assets/img/image1.png" />
    </template>

</template>

<template name="views">

    <template name="home">
       <div exportgroup="index" class="page-container">Home Page</div>
    </template>

    <template name="about">
       <div exportgroup="index" class="page-container">About Page</div>
    </template>

</template>
```

Taking things further, it is possible to bundle small images \(or other assets\) with inline [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs). This way, the browser won't have to load them via HTTP request. Cutting down on the number of assets to load should greatly speed up the site's load time.

The Bundler just needs to know under what file size to use the *data-URL* format. Set the [`[MAX_DATA_URL_SIZE]`](#max_data_url_size) option to a size measured in bytes. E.g. `2048`. Assets below this size will now be bundled in *data-URL* format.

In the case of `image1.png` above, the generated *module export* would look like:

```html
<img exportgroup="image1" src="data:image/png,%89PNG%0D%0A=" />
```

## Further Reading