module.exports = class VisteurPersistence {

    constructor(db) {
        this.db = db;
    }

    /**
     * Crée un obj visiteur
     */
    createVisiteur(req, res) {
        var visiteur = {
            prenom: req.body.prenom,
            email: req.body.email,
            nom: req.body.nom,
            telephone: req.body.telephone,
            linkedin: req.body.linkedin,
            viadeo: req.body.viadeo,
            competenceInfra: req.body.competenceInfra,
            competenceDigital: req.body.competenceDigital,
            competenceTest: req.body.competenceTest,
            jeuMario: req.body.jeuMario,
            jeuPepper: req.body.jeuMPepper,
            jeuPhoto: req.body.jeuPhoto
        };
        if (req.body.secteur == "infra" && req.body.ok == "ok") {
            visiteur.userInfra = "infra";
        }

        if (req.body.secteur == "digital" && req.body.ok == "ok") {
            visiteur.userDigital = "digital";
        }

        if (req.body.secteur == "test" && req.body.ok == "ok") {
            visiteur.userTest = "test";
        }
        save(visiteur, req, res);
    };

    /**
     * Enregistrer le visiteur
     */
    save(visiteur) {
        // creation ou recup de la collection
        var collection = this.db.get('visiteurs');

        // envoie à la bdd
        collection.insert({
            "username": visiteur.userfName,
            "email": visiteur.useremail,
            "lname": visiteur.userlName,
            "num": visiteur.userNum,
            "numpro": visiteur.userPro,
            "linkedin": visiteur.userLinkedin,
            "viadeo": visiteur.userViadeo,
            "infra": visiteur.userInfra,
            "digital": visiteur.userDigital,
            "test": visiteur.userTest,
            "mario": visiteur.userMario,
            "pepper": visiteur.userPepper,
            "photo": visiteur.userPhoto
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