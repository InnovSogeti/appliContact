var express = require('express');
var router = express.Router();

//Cree un obj visiteur
function creatObj(req, res) {
    var visiteur = {
        userfName: req.body.userfname,
        useremail: req.body.useremail,
        userlName: req.body.userlname,
        userNum: req.body.usernum,
        userPro: req.body.userpro,
        userLinkedin: req.body.userlinkedin,
        userViadeo: req.body.userViadeo,
        userInfra: req.body.infra,
        userDigital: req.body.digital,
        userTest: req.body.test,
        userMario: req.body.mario,
        userPepper: req.body.pepper,
        userPhoto: req.body.photo
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
    persistance(visiteur, req, res);
};

/* recup les infos pour les rediriger vers creatObj */
router.post('/adduser', function (req, res) {
    creatObj(req, res);
});

//cree ou pas la bdd puis insert les donnees dans la bdd
function persistance(visiteur, req, res) {
    var db = req.db;

    // creation ou recup de la collection
    var collection = db.get('usercollection');

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

module.exports = router;