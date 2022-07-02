---
title: <code>$()</code>
desc: The Play UI Constructor.
_index: first
---
# The Play UI Constructor

The main Play UI *constructor* is used to derive elements from a number of input formats and return a Play UI instance for them. It is a *constructable function* that can be instantiated either with the `new` keyword (`new $()`) or via a static call (`$()`).

+ [Derive Elements By Query](#a-derive-elements-by-query)
+ [Derive Elements By Markup](#b-derive-elements-by-markup)
+ [Accept Actual Element Instances](#c-accept-actual-element-instances)

## a. Derive Elements By Query

### Syntax

```js
// Pass in a CSS selector, and an optional query context
$(selector[, queryContext]);
```

**Parameters**

+ **`selector`** - `String`: A CSS selector.
+ **`queryContext`** - `Element|Document`: A context within which to run the query. This defaults to the document in the current window.

### Usage

The document in context.

```html
<body>
  <div>
    <span></span>
  </div>
  <div>
    <span></span>
  </div>
  <p>
    <span></span>
  </p>
</body>
```

Select all `div` elements.

```js
let $divs = $('div').toArray(); // .length: 2
```

Select all `span` elements within a `div` element.

```js
let $spans = $('div', divs[0]).toArray(); // .length: 1
```

The above works as when the native [`Document.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) / [`Element.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll) method os used except that `$()` internally polyfills the CSS [`:is()`, \(`:matches()`, `:any()`\)](https://developer.mozilla.org/en-US/docs/Web/API/CSS/:is) pseudo-class functions.

```js
let $spans = $(':is(div, p) > span').toArray(); // .length: 3
```

## b. Derive Elements By Markup

### Syntax

```js
// Pass in an HTML markup
$(markup);
```

**Parameters**

+ **`markup`** - `String`: An HTML markup.

### Usage

Translate an HTML markup to actual elements.

```js
let $divs = $('<div></div><div></div>').toArray(); // .length: 2
```

## c. Accept Actual Element Instances

### Syntax

```js
// Accept an actual element instance
$(element);

// Accept a list of actual element instances
$([...element]);

// Accept an instance of NodeList
$(nodeList);
```

**Parameters**

+ **`element`** - `Element`: A DOM Element.
+ **`nodeList`** - `NodeList`: A DOM [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) object.

### Usage

Accept an actual element.

```js
let result = document.querySelector('div');
let $divs = $(result).toArray(); // .length: 1
```

Accept a *NodeList* result.

```js
let result = document.querySelectorAll('div');
let $divs = $(result).toArray(); // .length: 2
```
