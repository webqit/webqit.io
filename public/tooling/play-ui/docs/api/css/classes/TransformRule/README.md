---
title: TransformRule
desc: The TransformRule class.
---
# `class TransformRule {}`

This class is an object model of the CSS transform rule.

## Constructor

### Syntax

```js
let transformRuleObject = new TransformRule(transformRuleDefinition);
```

**Parameters**

+ **`transformRuleDefinition`**: **`Object|String`** - An object of the transform rule properties or the string `none`.

### Usage

Create a transfrom rule instance from an object.

```js
let transformRuleObject = new TransformRule({
    translate: [30, 40],
    sclae: 3,
});

// Convert to string
console.log(transformRuleObject.toString());
// translate(30, 40) scale(3)
```

Create a transfrom rule instance from the string `none`.

```js
let transformRuleObject = new TransformRule('none');

// Convert to string
console.log(transformRuleObject.toString());
// none
```

## static `parse()`

This function is used to parse an element's transform rule into an instance of `TransformRule`. If the input is a computed transform matrix, it automatically calls the `TransformRule.parseMatrix()` method.

### Syntax

```js
let transformRuleObject = TransformRule.parse(rule);
```

**Parameters**
+ **`rule`** - `String`: A CSS transform rule.

**Return**
+ **`TransformRule`** - An object model of the parsed transform rule.

## Usage

Parse *transform rule* declaration.

```js
// Parse
let transformRuleObject = TransformRule.parse('translate(30, 40) scale(3)');

// Show
console.log(transformRuleObject);
/**
{
    translate: [30, 40],
    sclae: 3,
}
*/

//Convert to string
console.log(transformRuleObject.toString());
// translate(30, 40) scale(3)
```

## static `parseMatrix()`

This function is used to parse an element's computed transform rule matrix into an instance of `TransformRule`.

### Syntax

```js
let transformRuleObject = TransformRule.parseMatrix(matrix);
```

**Parameters**
+ **`matrix`** - `String`: The computed CSS transform matrix.

**Return**
+ **`TransformRule`** - An object model of the parsed transform rule.

## Usage

Parse an element's *computed* transform rule.

```html
<style>
div {
    transform: translate(30, 40) scale(3);
}
</style>
<div id="el"></div>
```

```js
let transformRule = document.querySelector('#el').style.transform;

// Set attribute
let transformRuleObject = TransformRule.parse(transformRule);

// Show
console.log(transformRuleObject);
/**
{
    translate: [30, 40],
    sclae: 3,
}
*/

//Convert to string
console.log(transformRuleObject.toString());
// translate(30, 40) scale(3)
```
