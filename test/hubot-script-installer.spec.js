
var expect    = require('chai').expect,
    installer = require('../index'),
    fixture   = __dirname + '/fixtures.json';


describe("Hubot Script Installer", function(){

  
  it("Read external-scripts.json if it exists",function(done){
    installer.read(fixture, function(err,manifest){
      expect(manifest).to.be.an('array');
      expect(manifest).to.have.length(1);
      expect(manifest).to.have.deep.property('[0]','existing-script');
      done();
    });

  });
  
  it("Error if external-scripts.json doesn't exist",function(done){
    installer.read('non-existant-file.json', function(err,manifest){
      expect(err).to.be.ok;
      expect(manifest).to.not.be.ok;
      done();
    });

  });

  it("Add script to external-scripts.json",function(done){
    // Open file and see that both the odl and new scripts are present

  });
  
  it("Remove script from external-scripts.json",function(done){
    // Open file and see that only existing scripts remain

  });
  

});