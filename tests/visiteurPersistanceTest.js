var sinon = require('sinon');
var visiteurPersistance = require('./../../src/persistance/visiteurPersistance.js');
var express = require('express');
var router = express.Router();

it('should pass object with correct values to inscrireVisiteur only once', function(){
 
  var visiteur = {
    userfName : 'Jean',
    userEmail : 'jean.dupont@gmail.com',
    userlName : 'Dupont',
    userNum : '000000000',
    userPro : '11111111111',
    userLinkedin : 'req.body.userlinkedin',
    userViadeo : 'req.body.userViadeo'
  };

  var visiteurAttendu = {
    userfName: visiteur.userfName,
    userEmail : visiteur.userEmail,
    userlName : visiteur.userlName,
    userNum : visiteur.userNum,
    userPro : visiteur.userPro,
    userLinkedin : visiteur.userLinkedin,
    userViadeo : visiteur.userViadeo
  };

  var mock = sinon.mock(dao)
  mock.expects('inscrireVisiteur').once().withArgs(visiteurAttendu);

  dao.inscrireVisiteur(visiteur,req,res);

  mock.verify;
  mock.restore;
  
});