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
    jeuMario: 'oui',
    jeuPepper: 'non',
    profil: 'Testing',
    metier: '_Chef_de_projet_testing',
    contact: 'oui',
    jour: '10',
    id_salon: 'DevFest2017-10-102017-10-10' 
    
};

function callback(data)
{
    return(data);
}

visiteurPersistence.save(visiteur, callback);
console.log(visiteur.id_salon);

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
            assert.equal(doc.jeuMario, visiteur.jeuMario);
            assert.equal(doc.jeuPepper, visiteur.jeu);
            assert.equal(doc.profil, visiteur.profil);
            assert.equal(doc.metier, visiteur.metier);
            assert.equal(doc.contact, visiteur.contact);
            assert.equal(doc.jour, visiteur.jour);
            assert.equal(doc.id_salon, 'gefsyf');
            
        })  
    });
});
