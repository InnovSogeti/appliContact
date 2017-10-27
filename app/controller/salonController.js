module.exports = function (app, salonPersistence) {
    function callback(data) {
        return (data);
    }

    app.post('/list', function (req, res) {
        var MongoClient = require('mongodb').MongoClient;
        var fs = require('fs');
        var json = JSON.parse(fs.readFileSync('./public/site_map.json', 'utf8'));
        var obj = json; //tous le fichier JSON dans un obj
        var site_map = Object.keys(obj);
        var bdd = json[site_map[2]];
        var collection = json[site_map[3]];
        var url = "mongodb://localhost:27017/";

        url = url + bdd;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            db.collection(collection).find({}).toArray(function (err, result) {
                if (err) throw err;
                res.render('list_visiteur', { list: result, my_id: req.body.my_id });
                db.close();
            });
        });

    });

    app.post('/addid', function (req, res) {
        var fs = require('fs');
        var cam = JSON.parse(fs.readFileSync('./public/site_map.json', 'utf8'));
        var obj = cam; //tous le fichier JSON dans un obj
        var site_map = Object.keys(obj);
        var bdd = cam[site_map[2]];

        res.render('index', { my_id: req.body.my_id, cam: cam[site_map[1]] });
    });

    app.post('/addsalon', function (req, res) {
        var id = req.body.nom_salon + req.body.debut_salon + req.body.fin_salon;
        console.log(id);
        var salon = {
            nom: req.body.nom_salon,
            ville: req.body.ville_salon,
            description: req.body.description_salon,
            date_debut: req.body.debut_salon,
            date_fin: req.body.fin_salon,
            id_salon: id
        };
        salonPersistence.save(salon, callback);
        res.render('salon', { str: 'OK' });
    });
}