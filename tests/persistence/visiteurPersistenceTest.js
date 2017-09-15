const monk = require('monk');
const db = monk('localhost:27017/appliContact');
const VisiteurPersistence = require('./../../app/persistence/visiteurPersistence');
const visiteurPersistence = new VisiteurPersistence(db);
const assert = require('assert');
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

visiteurPersistence.save(visiteur);

var collection = visiteurPersistence.db.get('visiteurs');
describe('save', function () {
    it('should work', function () {
        collection.find({},{}, function(err, doc) {
            assert.equal(doc.nom, visteur.prenom);
            assert.equal(doc.email, visiteur.email);
            assert.equal(doc.prenom, visiteur.prenom);
            assert.equal(doc.telephone,visiteur.telephone);
            assert.equal(doc.linkedin, visiteur.linkedin);
            assert.equal(doc.viadeo, visiteur.viadeo);
            assert.equal(doc.competenceInfra, visiteur.competenceInfra);
            assert.equal(doc.competenceDigital, visiteur.competenceDigital);
            assert.equal(doc.competenceTest, visiteur.competenceTest);
            assert.equal(doc.jeuMario, visiteur.jeuMario);
            assert.equal(doc.jeuPepper, visiteur.jeu);
            assert.equal(doc.jeuPhoto, visteur.jeuPhoto);
        })  
    });
});
