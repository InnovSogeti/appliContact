module.exports = function (app, visiteurPersistence) {
    /**
     * Ajout d'un visiteur
     */
    function callback(data)
    {
        return(data);
    }

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
            profil: req.body.button,
            metier: req.body.metier
        };
        if (req.body.ok == "ok") {
            console.log('==> OK');
            visiteurPersistence.save(visiteur, callback);
            res.render('end', { message: 'OK' });
        }
        else {
            console.log('==> NOP');
            // sinon renvoie vers la meme page
            res.redirect("/");
        }
    });
}