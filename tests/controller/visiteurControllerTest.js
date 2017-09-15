const sinon = require('sinon');
const express = require('express');
const app = express()
const monk = require('monk');
const db = monk('localhost:27017/appliContactTest');
const VisiteurPersistence = require('./../../app/persistence/visiteurPersistence');
const visiteurPersistence = new VisiteurPersistence(db);

  it('should pass object with correct values to save only once', function () {
    var visiteur = {
      prenom: 'Jean',
      email: 'jean.dupont@gmail.com',
      nom: 'Dupont',
      telephone: '0241414141',
      linkedin: 'inutile',
      viadeo: 'inutile2',
      competenceInfra: 'non',
      competenceDigital: 'oui',
      competenceTest: 'non',
      jeuMario: 'oui',
      jeuPepper: 'non',
      jeuPhoto: 'non'
    };

    var visiteurAttendu = {
      prenom: visiteur.prenom,
      email: visiteur.email,
      nom: visiteur.nom,
      telephone: visiteur.telephone,
      linkedin: visiteur.linkedin,
      viadeo: visiteur.viadeo,
      competenceInfra: visiteur.competenceInfra,
      competenceDigital: visiteur.competenceDigital,
      competenceTest: visiteur.competenceTest,
      jeuMario: visiteur.jeuMario,
      jeuPepper: visiteur.jeuMPepper,
      jeuPhoto: visiteur.jeuPhoto
    };

    var mock = sinon.mock(visiteurPersistence);
    mock.expects('save').once().withArgs(visiteurAttendu);

    require('./../../app/controller/visiteurController')(app, visiteurPersistence);

    mock.verify;
    mock.restore;

  });




