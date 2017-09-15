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
            "prenom": visiteur.prenom,
            "email": visiteur.email,
            "nom": visiteur.nom,
            "telephone": visiteur.telephone,
            "linkedin": visiteur.linkedin,
            "viadeo": visiteur.viadeo,
            "competenceInfra": visiteur.competenceInfra,
            "competenceDigital": visiteur.competenceDigital,
            "competenceTest": visiteur.competenceTest,
            "jeuMario": visiteur.jeuMario,
            "jeuPepper": visiteur.jeuPepper,
            "jeuPhoto": visiteur.jeuPhoto
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