# Tooling In OOHTML

This example shows how we could use a DOM abstraction library, like jQuery, from within Subscript code.

Turns out that this is naturally possible!

```html
<html>

    <head>
        <title>Tooling In OOHTML</title>
        <meta name="oohtml" content="attr.id=data-id" />
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://unpkg.com/@webqit/oohtml@1.8.19/dist/main.js"></script>
    </head>
        
    <body>

        <div id="alert" namespace>
            <div data-id="message"></div>
            <script type="subscript">
                $(this.namespace.message).html(this.state.message || 'Task pending...');
            </script>
        </div>

        <script>
            // The alert
            setTimeout(() => {
                document.querySelector('#alert').setState({
                    message: 'This task is now complete!',
                });
            }, 3000);
        </script>

    </body>

</html>
```

Tooling can also help us acheive more efficient DOM manipulation. Generally, surgically updating the DOM may have performance implications on the UI, as arising from layout thrashing (see [this article](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing) on Web Fundamentals). But we also don't need as much as a *Virtual DOM* for this. A technique like that of [fast DOM](https://github.com/wilsonpage/fastdom) could just suffice.

This technique is natively implemented by the [Play UI](/tooling/play-ui) library which has a jQuery-like API. We will now use Play UI as a drop-in replacement for jQuery in the code above.
 
```html
<html>
    
    <head>
        <title>Tooling In OOHTML</title>
        <meta name="oohtml" content="attr.id=data-id" />
        
        <script src="https://unpkg.com/@webqit/playui-js@0.3.15/dist/main.js"></script>
        <script src="https://unpkg.com/@webqit/oohtml@1.8.19/dist/main.js"></script>
    </head>
            
    <body>

        <div id="alert" namespace>
            <div data-id="message"></div>
            <script type="subscript">
                // The .html() method is asynchronous
                if (!this.state.message) return;
                $(this.namespace.message).htmlAsync(this.state.message).then(() => {
                    // Do something sync
                });
            </script>
        </div>

        <script>
            // Make Play UI available globally
            window.$ = window.WebQit.$;

            // The alert
            setTimeout(() => {
                document.querySelector('#alert').setState({
                    message: 'This task is now complete!',
                });
            }, 3000);
        </script>

    </body>

</html>
```

<a href="/html/tooling/oohtml/docs/learn/examples/tooling.html" target="_blank">Check the live demo here</a> or copy and paste the code in a blank HTML page and view in your browser.
