hubot-script-installer
======================

>Install external hubot scripts via package.json

Hubot scripts can installed as package.json dependencies, but require an extra step of being added to the 'external-scripts.json' file. This module is a helper that will allow your hubot script to self-install/uninstall when being included as a dependency. 


## Usage

`projects/myscript $ npm install hubot-script-installer --save`

In your project's package.json:

```JSON
{
  "name": "myscript",
  "description": "my awesome hubot script",
  
  ...

  "scripts": {
    "postinstall" { "./node_modules/.bin/hubot-script-installer" },
    "uninstall" { "./node_modules/.bin/hubot-script-installer --uninstall" }
  }
}
```