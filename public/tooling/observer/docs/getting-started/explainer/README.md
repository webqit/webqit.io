---
title: Explainer
desc: The design and architectural concepts.
_index: 1
---
# Explainer [TODO]

<!--
The observable alternative to Reflect

Here is how the approach we took with the Observer API compares, or contrasts, with those of some existing alternatives.

## With JavaScript's Reflection APIs

The Observer API shares much in API surface with JavaScript's built-in [*Object*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) and [*Reflect*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) APIs. Compare:

+ [`Observer.set()`](../api/set) / [`Reflect.set()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set)
+ [`Observer.get()`](../api/get) / [`Reflect.get()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)
+ [`Observer.has()`](../api/has) / [`Reflect.has()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has)
+ [`Observer.ownKeys()`](../api/ownkeys) / [`Reflect.ownKeys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)
+ [`Observer.deleteProperty()`](../api/deleteproperty) / [`Reflect.deleteProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty) / [`Object.deleteProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/deleteProperty)
+ [`Observer.defineProperty()`](../api/defineproperty) / [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
+ [`Observer.keys()`](../api/defineproperty) / [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

What they don't share in common is Observer's *observability* and *interceptibility* of these operations. Where these features are needed, Observer's APIs will serve as a drop-in replacement.

Learn more about what's possible with the following methods:

+ [`Observer.observe()`](../api/observe)
+ [`Observer.intercept()`](../api/intercept)

## JavaScript's Property Accessors, and Proxies

Both the Observer API and JavaScript's existing interceptibilty APIs - property [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) and [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get), and [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) will let you intercept operations on JavaScript objects. But, the Observer API is designed for a pattern that is almost not possible with these existing approaches.

Problem is:

+ With property Accessors, there can be only one *intercepting code* over an object.

    ```js
    // The object
    let obj = {};

    // -------------------------

    // The intercepting code - logs operations
    Object.defineProperty(obj, 'someProperty', {
        get: () => {
            console.log('"get" operation');
            return 'some value';
        },
        set: (someValue) => {
            console.log('"set" operation');
            // Set someValue;
            return true;
        }
    });

    // -------------------------

    // Multiple actions
    let someValue = obj.someProperty; // "some value"; // from the "get" interceptor above
    obj.someProperty = 'some new value'; // triggers the "set" interceptor above
    obj.someProperty = 'some other new value'; // triggers the "set" interceptor above
    ```

+ With proxies, there can be only one *intercepting code* over an instance. In addition, the final object every other part of the code sees is a proxy, and not the object itself. And if they're not prepared for a proxy, the magic, or even the code, fails. **Obscuring object identity** thus becomes a big challenge.

    ```js
    // The object
    let obj = {};

    // -------------------------

    // The intercepting code - logs operations
    let wrapped = new Proxy(obj, {
        get: (target, propertyName) => {
            console.log('"get" operation');
            return 'some value';
        },
        set: (target, propertyName, propertyValue) => {
            console.log('"set" operation');
            // Set someValue;
            return true;
        }
    });

    // -------------------------

    // Multiple actions, but acting on a wrapper unknowingly
    let someValue = wrapped.someProperty; // "some value"; // from the "get" interceptor above
    // Or let someValue = Reflect.get(obj, 'someProperty');
    wrapped.someProperty = 'some new value'; // triggers the "set" interceptor above
    wrapped.someProperty = 'some other new value'; // triggers the "set" interceptor above

    // -------------------------

    // Try acting on the object itself
    let someValue = obj.someProperty; // undefined; // not intercepted
    // Or let someValue = Observer.get(obj, 'someProperty');
    obj.someProperty = 'some new value'; // not intercepted
    ```

But, with the Observer API:

+ An object's property setters and getters are not tied to a single *intercepting code*, nor are they - setters and getters - even used. We can thus have any number of *intercepting code* over an object - whether just *observing mutations* or actually *intercepting operations*. The object itself isn't wrapped or obscured in some way.

    ```js
    // The object
    let obj = {};

    // -------------------------

    // Any number of observers
    Observer.observe(obj, 'someProperty', event => {
        console.log('"' + event.type + '" operation');
    });
    Observer.observe(obj, 'someProperty', event => {
        console.log('same "' + event.type + '" operation');
    });

    // Any number of interceptors
    Observer.intercept(obj, 'get', (action, received, next) => {
        console.log('"get" operation', event.name);
        return next('some value');
    });
    Observer.intercept(obj, 'get', (action, received, next) => {
        console.log('"get" operation', event.name);
        return next(received/*from any preceding interceptor*/ || 'some different value');
    });

    // -------------------------

    // Multiple actions
    let someValue = Observer.get(obj, 'someProperty'); // "some value"; // from the interceptors above
    Observer.set(obj, 'someProperty', 'some new value'); // triggers both the interceptors and observers above
    Observer.set(obj, 'someProperty', 'some other new value'); // triggers both the interceptors and observers above
    ```

+ And interestingly, property setters and getters, and proxies, are still implementable with the Observer API, and this time, without their inherent limitations.

    ```js
    let someValue = obj.someProperty; // "some other new value"; // doesn't fire interceptors; so, obtained traditionally

    // -------------------------

    // With property setters and getters
    Observer.init(obj, 'someProperty');
    let someValue = obj.someProperty; // "some value"; // from the interceptors above
    obj.someProperty = 'some new value'; // triggers both the interceptors and observers above

    // On calling Observer.init() again with the same property name
    Observer.init(obj, 'someProperty'); // Has no additional effect
    // -------------------------

    // With proxies
    let wrapper = Observer.proxy(obj);
    let someValue = wrapper.someProperty; // "some value"; // from the interceptors above
    wrapper.someProperty = 'some new value'; // triggers both the interceptors and observers above
    // Obtain the real object from proxy wrapper
    let obj = Observer.unproxy(wrapper);

    // On calling Observer.proxy() again
    let wrapper2 = Observer.proxy(obj);
    let someValue = wrapper2.someProperty; // "some value"; // from the same interceptors above
    wrapper2.someProperty = 'some other new value'; // triggers both the same interceptors and same observers above
    // Obtain the real object from proxy wrapper
    let obj = Observer.unproxy(wrapper2);
    ```

Learn more about what's possible with the following methods:

+ [`Observer.observe()`](../api/observe)
+ [`Observer.intercept()`](../api/intercept)
+ [`Observer.set()`](../api/set)
+ [`Observer.get()`](../api/get)
+ [`Observer.init()`](../api/init)
+ [`Observer.proxy()`](../api/proxy)
+ [`Observer.unproxy()`](../api/unproxy)

## JavaScript's Depreciated Object.observe()

The Observer API shares much in common with the once-exciting [`Object.observe()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Object.observe) function, but disagrees with it on a major behaviour. `Object.observe()` was designed to deliver detected changes *asynchronously*, while `Observer.observe()` is designed to deliver those changes *synchronously*. The difference is in the timing of events, and timing is everything in most usecases.

+ With [`Object.observe()`, operations on an object are announced asynchronously. Notice the order in which the following reports are logged to the console.

    ```js
    let obj = {};
    Object.observe(obj, changes => {
        console.log('Change detected on ' + changes[0].name);
    });

    // -------

    console.log('Before "set" operation');
    obj.someProperty = 'some value';
    // Or Reflect.set(obj, 'someProperty', 'some value');
    console.log('After "set" operation');
    ```

    Console:

    ```shell
    > Before "set" operation
    > After "set" operation
    > Change detected on someProperty
    ```

+ But with `Observer.observe()`, operations on an object are announced in realtime. Notice the order in which the following reports are logged to the console.

    ```js
    let obj = {};
    Observer.observe(obj, changes => {
        console.log('Change detected on ' + changes[0].name);
    });

    // -------

    console.log('Before "set" operation');
    Observer.set(obj, 'someProperty', 'some value');
    console.log('After "set" operation');
    ```

    Console:

    ```shell
    > Before "set" operation
    > Change detected on someProperty
    > After "set" operation
    ```

+ The asynchronous nature of [`Object.observe()` means that operations on an object are announced in batches. The following two operations will most-probbably be batched.

    ```js
    let obj = {};
    Object.observe(obj, changes => {
        console.log('Number of changes made: ' + changes.length);
    });

    // -------

    console.log('Before "set" operations');
    obj.someProperty = 'some value';
    // Or Reflect.set(obj, 'someProperty', 'some value');
    obj.someOtherProperty = 'some other value';
    // Or Reflect.set(obj, 'someOtherProperty', 'some other value');
    console.log('After "set" operations');
    ```

    Console:

    ```shell
    > Before "set" operations
    > After "set" operations
    > Number of changes made: 2
    ```

+ But with `Observer.observe()`, individual operations on an object are announced in realtime. Notice the difference in the console.

    ```js
    let obj = {};
    Observer.observe(obj, changes => {
        console.log('Number of changes made: ' + changes.length);
    });

    // -------

    console.log('Before "set" operations');
    Observer.set(obj, 'someProperty', 'some value');
    Observer.set(obj, 'someOtherProperty', 'some other value');
    console.log('After "set" operations');
    ```

    Console:

    ```shell
    > Before "set" operations
    > Number of changes made: 1
    > Number of changes made: 1
    > After "set" operations
    ```

    To take things further, the Observer API also makes it possible to batch operations. It just doesn't impose this behaviour on every usecase.

    The `Observer.set()` and `Observer.deleteProperty()` methods let us do this where needed.
    
    ```js
    console.log('Before "set" operations');
    Observer.set(obj, {
        someProperty: 'some value',
        someOtherProperty: 'some other value',
    });
    // Or Observer.deleteProperty(obj, ['someProperty', 'someOtherProperty']);
    console.log('After "set" operations');
    ```

    Console:

    ```shell
    > Before "set" operations
    > Number of changes made: 2
    > After "set" operations
    ```

Learn more about what's possible with the following methods:

+ [`Observer.set()`](../api/set)
+ [`Observer.deleteProperty()`](../api/deleteproperty)
-->