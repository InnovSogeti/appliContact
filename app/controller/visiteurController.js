module.exports = function (app, visiteurPersistence) {
    /**
     * Ajout d'un visiteur
     */
    function callback(data)
    {
        return(data);
    }

    app.post('/adduser', function (req, res) {
        console.log('==> /adduser');
        var maintenant=new Date();
        var jour=maintenant.getDate();
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
            metier: req.body.metier,
            contact: req.body.ok,
            date: jour
        };
        if (req.body.ok == "ok") {
            console.log('==> OK');
            visiteur.contact = "oui";
            visiteurPersistence.save(visiteur, callback);
            res.render('end', { message: 'OK' });
        }
        else {
            console.log('==> NOP');
            visiteur.contact = "non";            
            visiteurPersistence.save(visiteur, callback);
            res.render('end', { message: 'OK' });
        }
    });
}