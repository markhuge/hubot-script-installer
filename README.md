hubot-script-installer ![BuilD Status](https://travis-ci.org/markhuge/hubot-script-installer.svg) [![Code Climate](https://codeclimate.com/github/markhuge/hubot-script-installer.png)](https://codeclimate.com/github/markhuge/hubot-script-installer) [![Coverage Status](https://img.shields.io/coveralls/markhuge/hubot-script-installer.svg)](https://coveralls.io/r/markhuge/hubot-script-installer?branch=master)
======================

>Install external hubot scripts via package.json

Hubot scripts can installed as package.json dependencies, but require an extra step of being added to the 'external-scripts.json' file. This module is a helper that will allow your hubot script to self-install/uninstall when being included as a dependency. 


## Usage

`projects/myscript $ npm install hubot-script-installer --save`

In your project's package.json:


```
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

### Methods

#### installer.read()
Takes filepath amd callback as arguments.

Reads from json file, and executes callback with returned data

```
installer.read(filepath, function (err, data) {
	console.log(data) // -> {name: "package-name"}
})
```

#### installer.install()
Takes filepath to external-scripts.json and a callback.

Nothing is passed into callback, unless there is an error.

```
installer.install(pathToExternalScripts, callback(err) {
	if (err) {
	//err handling
	}
	// add stuff here to execute after file is updated.
})
```
#### installer.uninstall()

Takes filepath to external-scripts.json and a callback.

```
installer.uninstall(pathToExternalScripts, callback(err) {
	if (err) {
	//err handling
	}
	// add stuff here to execute after file is updated.
})
```
