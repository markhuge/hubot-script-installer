
var expect    = require('chai').expect,
    installer = require('../index'),
    fs        = require('fs'),
    externalScripts   = __dirname + '/fixtures/external-scripts.json',
    packageJson = __dirname + '/fixtures/package.json';


describe("Hubot Script Installer", function(){
  describe("#read()", function() {
    before(function(done) {
      fs.writeFile(externalScripts, "[\"existing-script\"]", function(err) {
          if(err) {
              console.log(err);
          }
          done();
      });
    })

    it("Reads external-scripts.json if it exists",function(done){
      installer.read(externalScripts, function(err,manifest){
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

  describe("#update()", function() {
    before(function(done) {
      fs.writeFile(externalScripts, "[\"existing-script\"]", function(err) {
          if(err) {
              console.log(err);
          }
          done();
      });
    })
    after(function(done) {
      fs.writeFile(externalScripts, "[\"existing-script\"]", function(err) {
          if(err) {
              console.log(err);
          }
          done();
      });
    })
    it("Adds script to external-scripts.json",function(done){
      // Open file and see that both the old and new scripts are present
      installer.update(externalScripts, packageJson, function() {
        var verify = require(externalScripts);
        expect(verify).to.be.an('array');
        expect(verify).to.have.length(2);
        expect(verify).to.have.deep.property('[0]','existing-script');
        expect(verify).to.have.deep.property('[1]', 'new-script');
        done();
      });
    });
  })

});
