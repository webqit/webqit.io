---
desc: Webflo installation guide.
_index: last
---
# Installation

Every Webflo project starts on an empty directory that you can create on your machine. The command below will make a new directory `webflo-app` from the terminal and navigate into it.

```bash
mkdir webflo-app
cd webflo-app
```

With [npm available on your terminal](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), the following command will install Webflo to your project:

> System Requirements: Node.js 12.0 or later

```text
$ npm i @webqit/webflo
```

The installation automatically creates a `package.json` file at project root, containing `@webqit/webflo` as a project dependency.

```json
{
  "dependencies": {
    "@webqit/webflo": <webflo version>
  }
}
```

Other important definitions like project name, package type, and aliases for common Webflo commands will also belong in this file.

```json
{
  "name": "webflo-app",
  "type": "module",
  "scripts": {
    "start:dev": "webflo start --dev",
    "build": "webflo build"
  },
  "dependencies": {
    "@webqit/webflo": <webflo version>
  }
}
```

All is now set! The commands [`npm run start:dev`](../../cli/start) and [`npm run build`](../../cli/build) will be coming in often during the development process.

Other Webflo commands will also be used at some point. For these, we will be prefixing the command to run with `npx`; e.g. `npx webflo help`.

> A global installation of Webflo wouldn't require aliases in `package.json` or the `npx` prefix to run. To install Webflo globally, run `npm install` with the `-g` (or `--global`) flag: `npm i -g @webqit/webflo`.

To be sure Webflo is listening, run [`npx webflo help`](../../cli/help); an overview of available commands will be shown.

## "Hello Webflo!"

The start page of our sample app could be a simple `index.html` file served statically. This would go into the `/public` directory of the app. (More about project layout in [Routing](../../fundamentals/routing).)

+ `/public`
    + `/index.html` - `<html><head></head><body>Hello Webflo!</body></html>`

Now, when you start the Webflo server and navigate to `http://localhost:3000/` (or `http://localhost:3000/index.html`) on your browser, the start page is shown.

```bash
$ npm run start:dev
```

> Be sure to give Webflo a better "Hello!" with a more beautiful start page.

## Common Setup

As with every project that might be heading out of its local development environment, certain files, folders or parameters for Webflo applications may need to be excluded from upstream repositories. And it is good to remember these *environmental factors*  early.

### The `.env` File

An `.env` file is commonly used to maintain environment-specific varaiables for an application. Consider using this file to keep any sensitive values that your application might need, e.g. database credentials. This file would be kept local using the `.gitignore` file below. The *ignore rule* would be: `.env`.

Consider paring the `.env` file with an `.env.example` file - written with no actual values, and for simply providing an example of what might be in the `.env` file. This file would be what goes to other deployment environments.

To edit the `.env` file from the command line, run [`$ webflo config variables`](../../cli/config#variables). Add the flag `--env=example` to explicitly edit the `.env.example` file.

When creating the `.env` file for the first time, Webflo will try to guide you using the variable names and available example values in the `.env.example` file, where exists.

### The `.webqit` Directory

All WebQit command-line interfaces maintain certain command-line edits in the WebQit-specific folder: `.webqit`. Webflo's own edits go into the `./.webqit/webflo` directory; and these files are to be kept local using the `.gitignore` file below. The *ignore rule* would be: `.webqit`.

The `--env=example` flag may be used to create *example copies* of these configurations - written with no actual values, and for simply providing an example of what might be in the actual configuration. Edits made with `$ webflo config variables --env=example`, for example, will be written to the file: `./.webqit/webflo/variables.example.json`. These *example copies* are what goes to other deployment environments. The *allow rule* would be: `!.webqit/**.example.json`.

### The `.gitignore`File

This file should now be part of your project. And an important folder to ignore is the `node_modules` folder. Together with the environment-specific files above, your `.gitignore` file could be looking similar to the below:

```text
node_modules
.env
.webqit
!.webqit/**.example.json
```

*Feel free to add more rules as needed.*

<!--
Config Layout
-->
## Next Steps

Continue to [learning the fundamentals](../../fundamentals).