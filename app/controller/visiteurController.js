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
            competenceSecu: req.body.competenceSecu,
            competenceDigital: req.body.competenceDigital,
            competenceTest: req.body.competenceTest,
            jeuMario: req.body.jeuMario,
            jeuPepper: req.body.jeuPepper,
            jeuPhoto: req.body.jeuPhoto,
            text: req.body.text,
            competencejee: "null",
            competencejs: "null",
            competencecpp: "null",
            competencec: "null",
            scrum: "null",
            agile: "null"
        };
        /*if (req.body.secteur == "competenceInfra" && req.body.ok == "ok") {
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
        }*/
        if (req.body.secteur == "technique") {
            console.log("==>LA");            
            visiteur.competencejee = req.body.technique_jee;
            visiteur.competencejs = req.body.technique_js;
            visiteur.competencecpp = req.body.technique_cpp;
            visiteur.competencec = req.body.technique_c;
        }
        if(req.body.secteur = "projet") {
            visiteur.agile = req.body.projet_agile;
            visiteur.scrum = req.body.projet_scrum;
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