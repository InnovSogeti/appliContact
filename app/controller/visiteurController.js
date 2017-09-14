module.exports = function(app, visiteurPersistence) {
    /**
     * Ajout d'un visiteur
     */
    app.post('/adduser', function(req, res) {
        console.log('==> /adduser')
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
        visiteurPersistence.save(visiteur);
        res.render('end', { message: 'OK' });
    });
}