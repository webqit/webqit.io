# A TODO List In OOHTML

Below is a TODO list application we made out of a plain JavaScript array bound to [`document.state`](../../../spec/the-state-api#document-level-state).

It features the ability to add items and toggle the active state of each item.
+ **For the *add* feature** - When the *add* button in the TODO container is clicked, an item is added to the array - effectively becoming a new item in the UI.
+ **For the *toggle* feature** - When the *toggle* button of an item in the UI is clicked, the corresponding entry in the array gets its `active` property toggled between `true` and `false`.

> Note that we're involving the *Observer API* to reactively mutate the todo list. Also, we're using the jQuery-like *Play UI* to manipulate the DOM.

```html
<html>

    <head>

        <title>A TODO List in OOHTML</title>
        <meta name="oohtml" content="attr.id=data-id" />

        <script src="https://unpkg.com/@webqit/playui-js@0.3.15/dist/main.js"></script>
        <script src="https://unpkg.com/@webqit/oohtml@1.8.19/dist/main.js"></script>
        <script>
            // Make PlayUI available globally
            window.$ = window.WebQit.$;
            window.Observer = window.WebQit.Observer;

            // Create the app
            const app = {
                title: 'My TODO',
                todo: [
                    {desc: 'Task-1', active: true},
                    {desc: 'Task-2', active: true},
                    {desc: 'Task-3', active: true},
                ],
            };
            document.setState(app);
        </script>

        <template name="items">
            
            <li namespace>
                <span data-id="desc"></span>
                <button data-id="toggle">Toggle Active</button>
                <script type="subscript">
                    $(this.namespace.desc).html(this.state.desc);
                    $(this.namespace.desc).css('opacity', this.state.active ? '1' : '0');
                    $(this.namespace.toggle).on('click', () => {
                        this.state.active = !this.state.active;
                    });
                </script>
            </li>

        </template>

    </head>

    <body>

        <div namespace>

            <h2 data-id="title"></h2>
            <ol data-id="items" template="items"></ol>
            <button data-id="add">Add</button>
            
            <br /><br />

            <div>
            You can also add items from the console directly.<br />
            Open your console and type: <code>Observer.proxy(document.state.todo).push({desc:"New Item", active: true})</code>
            </div>

            <script type="subscript">
                this.namespace.title.innerHTML = document.state.title;
                $(this.namespace.items).list(document.state.todo);
                this.namespace.add.addEventListener('click', () => {
                    Observer.proxy(document.state.todo).push({desc: prompt('Task description', , 'Task-' + (document.state.todo.length + 1)), active: true,});
                });
            </script>

        </div>
    </body>

</html>
```
 
<a href="/html/tooling/oohtml/docs/learn/examples/todo.html" target="_blank">Check the live demo here</a> or copy and paste the code in a blank HTML page and view in your browser.
