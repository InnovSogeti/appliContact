module.exports = class VisteurPersistence {

    constructor(db) {
        this.db = db;
    }
    /**
     * Enregistrer le visiteur
     */
    save(visiteur) {
        // creation ou recup de la collection
        var collection = this.db.get('visiteurs');

        // envoie à la bdd
        collection.insert({
            "username": visiteur.prenom,
            "email": visiteur.email,
            "lname": visiteur.nom,
            "num": visiteur.telephone,
            "linkedin": visiteur.linkedin,
            "viadeo": visiteur.viadeo,
            "infra": visiteur.competenceInfra,
            "digital": visiteur.competenceDigital,
            "test": visiteur.competenceTest,
            "mario": visiteur.jeuMario,
            "pepper": visiteur.jeuPepper,
            "photo": visiteur.jeuPhoto
        }, function (err, doc) {
            if (err) {
                // error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // sinon renvoie vers la meme page
                res.redirect("/");
            }
        });
    }
}