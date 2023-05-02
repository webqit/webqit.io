# An SPA In OOHTML

This example makes a Single Page Application (SPA) out of [HTML Modules](../../../spec/html-modules) and [HTML Imports](../../../spec/imports).

Below, we're using the two `<template>` elements to each represent a route - a page. Then we point the `<body>`'s template attribute to either of the `<template>`s, depending on the current URL.

```html
<html>

    <head>

        <title>An SPA In OOHTML</title>
        <meta name="oohtml" content="element.import=import" />
        
        <script src="https://unpkg.com/@webqit/oohtml@1.8.19/dist/main.js"></script>

        <template exportid="pages">

            <!-- "home" page module -->
            <template exportid="home">
                <h1 exportid="#headline">
                    Welcome Home!
                </h1>
                <p exportid="#content">
                    <a href="#/about">About Me</a>
                </p>
            </template>

            <!-- "about" page module -->
            <template exportid="about">
                <h1 exportid="#headline">
                    About Me!
                </h1>
                <p exportid="#content">
                    <a href="#/home">Back to Home</a>
                </p>
            </template>

        </template>

    </head>

    <body template="pages/home">

        <header></header>

        <main>
            <div>
                <import name="headline">404</import>
            </div>
            <div>
                <import name="content">Page not Found!</import>
            </div>
        </main>
 
        <footer></footer>

        <script>
            window.addEventListener('popstate', e => {
                let path = document.location.hash.substr(1);
                document.body.setAttribute('template', 'pages' + path);
            });
        </script>
    </body>

</html>
```

Navigate to a route that does not begin with `#/home` or `#/about`, you should see the default content showing *404*.

<a href="/html/tooling/oohtml/docs/learn/examples/spa.html" target="_blank">Check the live demo here</a> or copy and paste the code in a blank HTML page and view in your browser.
