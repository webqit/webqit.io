---
desc: Play UI's custom events system.
_index: last
---
# Custom Events

Play UI's event system can be hooked into to provide custom event implementations. For example, its *tripletap*, *doubletap*, and *singletap* gestures are custom implementations/variations of the *tap* gesture. But, a custom event can be as simple as an alias for another event. Play UI makes everything easy!

To create a custom event, import the `CustomEvents` object.

```js
const { CustomEvents } = $.ui;
```
```js
import { CustomEvents } from '@webqit/playui-js/src/ui/index.js';
```

To create an alias of an existing event:

```js
// Simply map the custom event name to an existing event name
CustomEvents.hit = 'tap';

// Now we can bind to the "hit" event instead of "tap"
$(document.body).on('hit', event => {
    console.log(event.type);
})
```

To create an advanced custom event implementation, provide a class with two methods: `setup()` and `teardown()`. The `setup()` method will be called the first time the event is being bound to on the given element. This function will receive certain useful parameters, e.g. the *emitter* (being the most important). The `teardown()` method will be called the last time the event is being unbound off the element.

```js
CustomEvents.tick = class {
    // When the fisrt listenr of this event
    // is attached to the element, we start ticking
    setup(el, type, emitter, hammertime) {
        this.el = el;
        this.type = type;
        this.hammertime = hammertime;
        this.interval_id = setInterval(() => {
            emitter.call();
        }, 100);
    }

    // When the last listener of this
    // event is removed, no need to keep ticking
    teardown() {
        clearInterval(this.interval_id);
    }
};

// Now we can bind to the "tick" event
$(document.body).on('tick', event => {
    console.log(event.type);
});
```

