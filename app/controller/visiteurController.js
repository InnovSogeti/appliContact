module.exports = function (app, visiteurPersistence) {
    function callback(data)
    {
        return(data);
    }

    function check_profil(metier, profil) {
        var fs = require('fs');
        var json = JSON.parse(fs.readFileSync('./public/config.json', 'utf8'));
        var obj = json;
        var file = Object.keys(obj);
        var i = 0;
        var z = 1;
        var j = 1;
        var k = 0;
        var my_profil;
        var res = [];

        my_profil = json[file[i]].split(',');
        console.log(profil);
        while (my_profil[0] != profil || json[file[i]]){
            //if (i > 0)
                my_profil = json[file[i]].split(',');
            i++;
        }
        if (i > 0)
            i--;
        while (my_profil[j]) {
            my_profil[j] = my_profil[j].replace(/ /g, "_");
            z = 0;
            while (metier[z]) {
                if (metier[z] == my_profil[j]) {
                    res[k] = my_profil[j];
                    k++;
                }
                z++;
            }
            j++;
        }
        return (res);
    }

   function get(visiteur, callback) {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/appliContact";

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;          
            var query = { prenom: visiteur.prenom };
            db.collection("visiteurs").find(query).toArray(function(err, result) {
                if (err) throw err;
                var res = result.length;
                if (res == '0') {
                    db.close();
                    visiteurPersistence.save(visiteur, callback);
                }
                else {
                    db.close();
                    callback("ok");
                }
            });
        });
     }

    app.post('/adduser', function (req, res) {
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
            profil: req.body.button,
            metier: req.body.metier,
            contact: req.body.ok,
            date: jour
        };
        
        if (req.body.ok != "ok")
        visiteur.metier = "NULL";
        if (req.body.ok == "ok") {
            visiteur.metier = check_profil(req.body.metier, visiteur.profil);
            visiteur.contact = "oui";
            get(visiteur, callback);
            res.render('end', { message: 'OK' });
        }
        else {
            console.log("ICIICICICICI")
            visiteur.contact = "non";            
            visiteurPersistence.save(visiteur, callback);
            res.render('end', { message: 'OK' });
        }
    });
}