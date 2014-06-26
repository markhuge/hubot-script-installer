/*jslint node: true */
'use strict';
var fs = require('fs');

// read from json file, and pass it into callback function as 2nd argument
// read(filepath, function (err, manifest) {
//   manifest.name = 'packageName'
// })

var read = exports.read = require('read-json');

// Takes file path for external-scripts and package, and callback
// then calls callback with returned data in an obj
var getFileData = function(externalScriptsFile, packageJsonFile, callback) {
  var fileData = {};
  read(externalScriptsFile, function(err, data) {
    if (err) {
      callback(err);
    }
  fileData.externalScripts = data;
    read(packageJsonFile, function(err, data) {
      if (err) {
        callback(err);
      }
      fileData.packageJson = data;
      if(callback && typeof callback === "function") {
        callback(undefined, fileData);
      }
    });
  });
};

// should take path to external-scripts, path to package.json, optional callback
// it directly edits external scripts file with package.json["name"]
var install = exports.install = function(externalScriptsFile, packageJsonFile, callback) {
  getFileData(externalScriptsFile, packageJsonFile, function(err, fileData) {
    if (err) {
      return callback(err);
    }
    if (fileData.externalScripts.indexOf(fileData.packageJson.name) !== -1) {
      return callback(err);
    }
    fileData.externalScripts.push(fileData.packageJson.name);
    var externalScriptsStr = JSON.stringify(fileData.externalScripts);
    fs.writeFile(externalScriptsFile, externalScriptsStr, function(err) {
      if(err) {
          return callback(err);
      }
      if(callback && typeof callback === "function") {
        callback();
      }
    });
  })   
};

// should take path to external-scripts, path to package.json, optional callback
// it directly edit external scripts file with removal of name from package.json["name"]
var uninstall = exports.uninstall = function(externalScriptsFile, packageJsonFile, callback) {
  getFileData(externalScriptsFile, packageJsonFile, function(err, fileData) {
    if (err) {
      return callback(err);
    }
    var toSplice = fileData.externalScripts.indexOf(fileData.packageJson.name);
    if (toSplice === -1) {
        return callback(err);
    } 
    fileData.externalScripts.splice(toSplice, 1);
    var externalScriptsStr = JSON.stringify(fileData.externalScripts);

    fs.writeFile(externalScriptsFile, externalScriptsStr, function(err) {
      if(err) {
          return callback(err);
      }
      if(callback && typeof callback === "function") {
        callback();
      }
    });
  });
};
