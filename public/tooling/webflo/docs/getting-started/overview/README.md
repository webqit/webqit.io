---
desc: Take a one-minute overview of the Observer API.
_index: first
---
# Overview

Webflo is the universal JavaScript framework for Web, Mobile, and API Backends, and the single tool that takes you from development, to deployment, to continous delivery. The Webflo experience is: *all of the possibilities* delivered in a *long-story-short approach*!

Take an overview!

## Starting

Every Webflo project starts on an empty directory that you can create on your machine. We are creating one below - named `webflo-app` - and navigating into it on the terminal.

```bash
mkdir webflo-app
cd webflo-app
```

Next is to have Webflo installed, following the [installation guide](../installation). This makes the `webflo` command available on the terminal. And that is all the setup required!

> Webflo is a command-line tool. So the installed files won't be showing up anywhere in your workspace.

## Project Layout

Any project will normally live in files and folders. Webflo lets us follow a layout that just defines the capabilities of the application.

The following directories are used as the application's URL-handling facilities.

+ **`/public`** - for static files serving
+ **`/server`** - for server-side routing
+ **`/client`** - for client-side routing
+ **`/worker`** - for worker-level routing

Any other directory (e.g. `/src`) may exist here at root level for other purposes.

## Routing

> **Main Topic:** [Routing](../../fundamentals/routing)

