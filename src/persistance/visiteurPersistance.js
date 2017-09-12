var express = require('express');
var router = express.Router();

//accueil
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

//Cree un obj visiteur
function creatObj(req, res) {
    var visiteur = {
        userfName : req.body.userfname,
        userEmail : req.body.userEmail,
        userlName : req.body.userlname,
        userNum : req.body.usernum,
        userPro : req.body.userpro,
        userLinkedin : req.body.userlinkedin,
        userViadeo : req.body.userViadeo
    };
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
        "email": visiteur.userEmail,
        "lname": visiteur.userlName,
        "num": visiteur.userNum,
        "numpro": visiteur.userPro,
        "linkedin": visiteur.userLinkedin,
        "viadeo": visiteur.userViadeo
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