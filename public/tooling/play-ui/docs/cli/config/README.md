---
desc: Configure an Play UI command or feature.
_index: 1001
---
# `$ playui config`

The **`playui config`** command is used to configure other Play UI commands or a feature.

## Overview

The **`playui config`** command is part of thoughtful strategies to make the developer experience on the command line great. Its sole purpose is to provide an interactive way to configure flags for other commands and to persist such configurations. It is indeed painstaking and error-prone to write commands with a long list of flags each time. The **`playui config`** command will eliminate this for you.

## Usage

> Syntax: **`playui config <command>`** - where `<command>` is any of the other [Play UI commands](..), or the ellipsis `...`, which lets you pick from a list.

*Config* will walk you through the configuration options for the specified command and save your configurations for repeat use. (Configurations are generally saved to a JSON file in the project-relative directory: `./.webqit/playui-cli/config/`, except as otherwise stated in the documentation for a specific command.) Now, subsequent calls to **`playui config <command>`** will pull up the saved configurations for update. But, config files may also be updated, or even created, by hand.

To try, run **`playui config ...`**, pick a command from the list and follow the prompt. Be sure to consult the documentation for a command to achieve good configurations.