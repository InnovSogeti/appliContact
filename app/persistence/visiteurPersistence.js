module.exports = class VisteurPersistence {

    constructor(db) {
        this.db = db;
    }
    /**
     * Enregistrer le visiteur
     */
    save(visiteur, callback) {
        // creation ou recup de la collection
        var collection = this.db.get('visiteurs');

        // envoie à la bdd
        collection.insert({
            "prenom": visiteur.prenom,
            "nom": visiteur.nom,
            "email": visiteur.email,
            "telephone": visiteur.telephone,
            "linkedin": visiteur.linkedin,
            "viadeo": visiteur.viadeo,
            "jeuMario": visiteur.jeuMario,
            "jeuPepper": visiteur.jeuPepper,
            "jeuPhoto": visiteur.jeuPhoto,
            "profil": visiteur.profil,
            "metier": visiteur.metier,
            "Contact": visiteur.contact,
            "Jour": visiteur.date
        },
            function (err, doc) {
                if (err) {
                    // error
                    res.send("There was a problem adding the information to the database.");
                }
                else {
                    console.log('=> Inscription de ' + visiteur.prenom + ' ' + visiteur.nom);
                }
            });
            callback("ok");
    }
}