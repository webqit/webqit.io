---
desc: Customizing the OOHTML runtime.
_index: first
---
# The OOHTML Meta Tag

OOHTML provides a meta tag for customizing its syntax or behaviour. It generally looks like this:

```html
<meta name="oohtml" content="prop1=val1; prop2=val2;">
```

*The actual configurable properties are documented alongside the various OOHTML features.*

It is recommended (but not required) that you configure your usage of OOHTML using this meta tag. As an example, below is how the default OOHTML syntax looks like for the *HTML module, import and export* feature. What we want to do is [use a custom *import* element](../../spec/html-imports#polyfill) instead of the default *import* element.

```html
<head>

    <template name="module1">
        <div exportgroup="export1">Hello World!</div>
    <template>

</head>
<body>

    <import name="export1" template="module1"><import>

</body>
```

On the meta tag, we would set the `element.import` directive to a custom element name.

```html
<head>

    <meta name="oohtml" content="element.import=html-import;">
    <template name="module1">
        <div exportgroup="export1">Hello World!</div>
    <template>

</head>
<body>

    <html-import name="export1" template="module1"><html-import>

</body>
```

As another example, below is how the default OOHTML syntax looks like for the *scoped IDs* feature. What we want to do is [use a custom attribute name](../../spec/namespaced-html#polyfill) instead of the default *id* attribute.


```html
<body>

    <div namespace>
        <div id="scoped-id">
    <div>
    <div namespace>
        <div id="scoped-id">
    <div>

</body>
```

On the meta tag, we would set the `attr.id` directive to a custom attribute name.

```html
<head>

    <meta name="oohtml" content="attr.id=data-id;">

</head>
<body>

    <div namespace>
        <div data-id="scoped-id">
    <div>
    <div namespace>
        <div data-id="scoped-id">
    <div>

</body>
```

This way, even if the default syntax for these features should change on a future update (as should be expected of a new and fast-evolving technology like OOHTML), your configurations will keep your pages wokring.

Customization also lets you explore around the whole new idea. Feel free to bring your findings to OOHTML's [GitHub Discussions](https://github.com/webqit/oohtml/discussions).