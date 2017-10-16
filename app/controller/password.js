module.exports = function (app) {

    app.post('/password', function (req, res) {
        mdp = req.body.password;
        if (mdp == "devfest") {
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/appliContact";
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                db.collection("visiteurs").find({}).toArray(function(err, result) {
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