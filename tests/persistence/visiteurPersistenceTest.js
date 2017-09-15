const monk = require('monk');
const db = monk('localhost:27017/appliContact');
const VisiteurPersistence = require('./../../app/persistence/visiteurPersistence');
const visiteurPersistence = new VisiteurPersistence(db);

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


//console.log('toto' + result);
var assert = require('assert');
describe('save', function () {
    it('should work', function () {
        collection.find({},{}, function(err, doc) {
            assert.equal(doc.username, "Jean");
            assert.equal(doc.email, "jean.dupont@gmail.com");
            assert.equal(doc.lname, "Dupont");
            assert.equal(doc.num,"0241414141");
        })
        
        
    });
});