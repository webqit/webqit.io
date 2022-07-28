---
desc: Create and play an animation.
---
# `.play()`

This method is used to create and play an animation. This method is promise-based.

## Syntax

```js
await $(el).play(effect[, timing = {}]);
```

**Parameters**

+ **`effect`**: **`Array|Object|String`** - The effect to play. See [Animation](../classes/Animation#parameters).
+ **`timing`**: **`Object`** - Options for the animation. See [Animation](../classes/Animation#parameters).

**Return**

+ **`this`** - The Play UI instance.

### Usage

**Play from Standard Keyframes.** Below, we fade out an element using an array of keyframes.

```js
let el = document.querySelector('#el');
$(el).play([{opacity:1}, {opacity:0}], {duration:600}).then($el => {
    console.log('The end!');
});
```

**Play a CSS Transition.** Below, we fade out an element by simply specifying a *end-state* keyframe. The starting keyframe for the animation is automatically derived from the element's current state.

```js
$(el).play({opacity:0}, {duration:600}).then($el => {
    console.log('The end!');
});
```

**Play a CSS Animation Name.** Below, we fade out an element using an animation defined in the document's stylesheet.

```html
<style>

@keyframes fadeout {
  0% { opacity: 1;}
  100% { opacity: 0;}
}

</style>
```

```js
$(el).play('fadeout', {duration:600}).then($el => {
    console.log('The end!');
});
```

------

## Static Usage

The `.play()` instance method is internally based on the standalone `ui/play()` function which may be used statically.

### Import

```js
const { play } = $.ui;
```
```js
import { play } from '@webqit/playui-js/src/ui/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)
