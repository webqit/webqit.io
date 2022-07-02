---
desc: Store and manage arbitrary data with a data store internally associated with an element.
---
# .data\(\)

This method is used to store and manage arbitrary data with a data store internally associated with an element.

+ [Set Data](#a-set-data)
+ [Get Data](#b-get-data)
+ [Unset Data](#c-unset-data)

## a. Set Data

### Syntax

```js
// Set a single value
$(el).data(key, value);

// Set multiple values
$(el).data({
    [key]: value,
});
```

**Parameters**

+ **`key`**: **`String`** - The key to set.
+ **`value`**: **`Any`** - The data value to set. When `undefined`, the data key is unset from the data store; [see below](#c-unset-data).

**Return**

+ **`this`** - The Play UI instance.

### Usage

Set several distinct values for all elements matched by `$()`.

```js
$(el).data('key1', 'value 1').data({
    key2: 'value 2',
    key3: 'value 3'
});
```

## b. Get Data

### Syntax

```js
// Retrieve single value
let value = $(el).data(key);

// Retrieve multiples values
let values = $(el).data([...key]);

// Retrieve all values
let values = $(el).data();
```

**Parameters**

+ **`key`**: **`String`** - The data key to read.

**Return**

+ **`value`**: **`Any`** - The data value as initially stored, or `undefined`.
+ **`values`**: **`Object`** - A hash of key/value pairs for each key in the list or in the entire data store, as in the last syntax.

### Usage

Retrieve values for the first element matched by `$()`.

```js
let value = $(el).data('key1');
// value-1
```

## c. Unset Data

### Syntax

```js
// Unset single property
.data(key, undefined);

// Unset multiples values
$(el).data({
    [key]: undefined,
});
```

**Parameters**

+ **`key`**: **`String`** - The data key to unset.

**Return**

+ **`this`** - The Play UI instance.

### Usage

Unset values for all elements matched by `$()`.

```js
$(el).data('key1', undefined).data({
    key2: undefined,
    key3: undefined,
});
```

------

## Static Usage

The `.data()` instance method is internally based on the standalone `misc/data()` function which may be used statically.

### Import

```js
const { data } = $.misc;
```
```js
import { data } from '@webqit/playui-js/src/misc/index.js';
```

### Syntax

See [the general way to use Play UI's standalone functions](../../../getting-started/overview#use-as-descrete-utilities)