module.exports = function (app) {

    /*function battleye(randomItem){

        var fs = require('fs');
        var json = JSON.parse(fs.readFileSync('./public/site_map.json', 'utf8'));
        var obj = json; //tous le fichier JSON dans un obj
        var site_map = Object.keys(obj);
        var collect = json[site_map[3]];
        var bdd = json[site_map[2]];
        var MongoClient = require('mongodb').MongoClient;
        var name;
        var firstname;
        var i = 0;
        var ret = 0;

        var url = "mongodb://localhost:27017/";
        url = url + bdd;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection(collect).find({}).toArray(function(err, result) {
            if (err) throw err;
            while (result[i]){
                name = result[i].nom;
                firstname = result[i].prenom;
                console.log(name + " " + randomItem.nom);
                if ((randomItem.nom == name) && (randomItem.prenom == firstname)){
                    console.log("==>TRICHEUR");
                    ret = 1;
                }
                i++;
            }
            db.close();
            });
        });
        console.log(ret);
        return (ret);
    };*/

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

            var url = "mongodb://localhost:27017/";
            url = url + bdd;
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                db.collection(collection).find({}).toArray(function(err, result) {
                  if (err) throw err;
                  var maintenant=new Date();
                  var jour = maintenant.getDate();
                  var randomItem = result[Math.random() * result.length | 0];                  
                  while (randomItem.jour != jour) {
                    randomItem = result[Math.random() * result.length | 0];
                  }
                  res.render('common/concours', { str: randomItem });
                  db.close();
                });
              });
        }
        else {
            res.redirect('/config');
        }
    });
}