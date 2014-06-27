
var expect    = require('chai').expect,
    installer = require('../index'),
    fs        = require('fs'),
    externalScripts               = __dirname + '/fixtures/external-scripts.json',
    externalScriptsWithMultiple   = __dirname + '/fixtures/external-scripts-with-multiple.json',
    packageJson                   = __dirname + '/fixtures/package.json',
    wrongPackageJson              = __dirname + '/fixtures/wrong-package.json';
    existingPackageJson           = __dirname + '/fixtures/existing-package.json';


describe("Hubot Script Installer", function(){
  describe("#read()", function() {
    
    before(function(done) {
      fs.writeFile(externalScripts, '["existing-script"]', function(err) {
        if(err) {
            console.log(err);
        }
        done();
      });
    })

    it("Reads external-scripts.json if it exists",function(done){
      installer.read(externalScripts, function(err, manifest){
        expect(manifest).to.be.an('array');
        expect(manifest).to.have.length(1);
        expect(manifest).to.have.deep.property('[0]','existing-script');
        done();
      });
    });

    it("Errors if external-scripts.json doesn't exist",function(done){
      installer.read('non-existant-file.json', function(err,manifest){
        expect(err).to.be.ok;
        expect(manifest).to.not.be.ok;
        done();
      });
    });
  });

  describe("#install()", function() {

    before(function(done) {
      fs.writeFile(externalScripts, '["existing-script"]', function(err) {
        if(err) {
            console.log(err);
        }
        done();
      });
    })

    after(function(done) {
      fs.writeFile(externalScripts, '["existing-script"]', function(err) {
        if(err) {
            console.log(err);
        }
        done();
      });
    })

    it("Should not add to external-scripts if already there",function(done){
      installer.install(externalScripts, existingPackageJson, function(err) {
        if (err) {
          console.log(err);
        }
        fs.readFile(externalScripts, {encoding: 'utf8'}, function(err, results) {
          results = JSON.parse(results);
          expect(results).to.be.an('array');
          expect(results).to.have.length(1);
          expect(results).to.have.deep.property('[0]','existing-script');
          expect(results[1]).to.not.ok;
          done();
        });
      });
    });

    it("Adds script to external-scripts.json",function(done){
      installer.install(externalScripts, packageJson, function(err) {
        if (err) {
          console.log(err);
        }
        fs.readFile(externalScripts, {encoding: 'utf8'}, function(err, results) {
          results = JSON.parse(results);
          expect(results).to.be.an('array');
          expect(results).to.have.length(2);
          expect(results).to.have.deep.property('[0]','existing-script');
          expect(results).to.have.deep.property('[1]', 'new-script');
          done();
        });
      });
    });
  })

  describe("#uninstall()", function() {
    before(function(done) {
      fs.writeFile(externalScriptsWithMultiple, '["existing-script","new-script","other-script"]', function(err) {
        if(err) {
            console.log(err);
        }
        done();
      });
    })

    after(function(done) {
      fs.writeFile(externalScriptsWithMultiple, '["existing-script","new-script","other-script"]', function(err) {
          if(err) {
              console.log(err);
          }
          done();
      });
    })

    it("Should not edit file if script to uninstall is not there", function(done){
      installer.uninstall(externalScriptsWithMultiple, wrongPackageJson, function(err) {
        if (err) {
          console.log(err);
        }
        fs.readFile(externalScriptsWithMultiple, {encoding: 'utf8'}, function(err, results) {
          results = JSON.parse(results);
          expect(results).to.be.an('array');
          expect(results).to.have.length(3);
          expect(results).to.have.deep.property('[0]','existing-script');
          expect(results).to.have.deep.property('[1]','new-script');
          expect(results).to.have.deep.property('[2]','other-script');
          done();
        });
      });
    });

    it("Removes script from external-scripts.json", function(done){
      installer.uninstall(externalScriptsWithMultiple, packageJson, function(err) {
        if (err) {
          console.log(err);
        }
        fs.readFile(externalScriptsWithMultiple, {encoding: 'utf8'}, function(err, results) {
          results = JSON.parse(results);
          expect(results).to.be.an('array');
          expect(results).to.have.length(2);
          expect(results).to.have.deep.property('[0]','existing-script');
          expect(results).to.have.deep.property('[1]','other-script');
          done();
        });
      });
    });
  });

});
