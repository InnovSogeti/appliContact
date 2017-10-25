module.exports = function (app) {
    app.post('/password', function (req, res) {
        mdp = req.body.password;
        if (mdp == "letirageausort") {
            var MongoClient = require('mongodb').MongoClient;

            var fs = require('fs');
            var json = JSON.parse(fs.readFileSync('./public/site_map.json', 'utf8'));
            var obj = json; //tous le fichier JSON dans un obj
            var site_map = Object.keys(obj);
            var bdd = json[site_map[2]];
            var collection = json[site_map[3]];
            var nb = 0;
            var i = 0;
            var n = 0;
            var inter;

            var url = "mongodb://localhost:27017/";
            url = url + bdd;
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                db.collection(collection).find({}).toArray(function (err, result) {
                    if (err) throw err;
                    var maintenant = new Date();
                    var jour = maintenant.getDate();
                    var randomItem = result[Math.random() * result.length | 0];
                    while (result[i]) {
                        inter = result[i];
                        if (inter.jour == jour)
                            n++;
                        i++;
                    }
                    if (n > 0) {
                        while (randomItem.jour != jour) {
                            randomItem = result[Math.random() * result.length | 0];
                        }
                        while (result[nb])
                            nb++;
                        res.render('common/concours', { str: randomItem, nb: nb });
                        db.close();
                    }
                    else {
                        while (result[nb])
                            nb++;
                        db.close();
                        res.render('common/wrong_concours', { nb: nb });
                    }
                });
            });
        }
        else {
            res.redirect('/config');
        }
    });
}