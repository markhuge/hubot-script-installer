/*jslint node: true */
'use strict';
var fs = require('fs');

// read from json file, and pass it into callback function as 2nd argument
// read(err, function (err, manifest) {
//   manifest.name = 'packageName'
// })

var read = exports.read = require('read-json');


// should take path to external-scripts, path to package.json, optional callback
// it directly edits external scripts file with package.json["name"]
var update = exports.update = function(externalScriptsFile, fileWithName, callback) {
  read(externalScriptsFile, function(err, data) {

    var externalScripts = data;
    read(fileWithName, function(err, data) {

      var packageJSON = data;
      externalScripts.push(packageJSON.name);
      externalScripts = JSON.stringify(externalScripts);

      fs.writeFile(externalScriptsFile, externalScripts, function(err) {
        if(err) {
            console.log(err);
        }
        if(callback && typeof callback === "function") {
          callback();
        }
      });
    });
  });
};
