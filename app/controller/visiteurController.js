module.exports = function (app, visiteurPersistence) {
    /**
     * Ajout d'un visiteur
     */
    app.post('/adduser', function (req, res) {
        console.log('==> /adduser')
        var visiteur = {
            prenom: req.body.prenom,
            email: req.body.email,
            nom: req.body.nom,
            telephone: req.body.telephone,
            linkedin: req.body.linkedin,
            viadeo: req.body.viadeo,
            competenceInfra: req.body.competenceInfra,
            competenceInfra: req.body.competenceSecu,
            competenceDigital: req.body.competenceDigital,
            competenceTest: req.body.competenceTest,
            jeuMario: req.body.jeuMario,
            jeuPepper: req.body.jeuPepper,
            jeuPhoto: req.body.jeuPhoto,
            text: req.body.text,
            competencejee: req.body.infracompetence_jee,
            competencejs: req.body.infracompetence_js,
            competencecpp: req.body.infracompetence_cpp,
            competencec: req.body.infracompetence_c
        };
        if (req.body.secteur == "competenceInfra" && req.body.ok == "ok") {
            visiteur.competenceInfra = "infra";
        }

        if (req.body.secteur == "competenceSecu" && req.body.ok == "ok") {
            visiteur.competenceSecu = "Secu";
        }

        if (req.body.secteur == "competenceDigital" && req.body.ok == "ok") {
            visiteur.competenceDigital = "digital";
        }

        if (req.body.secteur == "competenceTest" && req.body.ok == "ok") {
            visiteur.competenceTest = "test";
        }

        if (req.body.ok == "ok") {
            console.log('==> OK');
            visiteurPersistence.save(visiteur);
            res.render('end', { message: 'OK' });
        }
        else {
            console.log('==> NOP');
            // sinon renvoie vers la meme page
            res.redirect("/");
        }
    });
}