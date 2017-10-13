module.exports = function (app) {

    app.post('/password', function (req, res) {
        mdp = req.body.password;
        if (mdp == "devfest") {
            console.log("Bravo");

            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/appliContact";
            
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                db.collection("visiteurs").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  var randomItem = result[Math.random() * result.length | 0];
                  var str = Object.values(randomItem);
                  console.log(str);
                  res.render('config', { str: randomItem });
                  db.close();
                });
              });
        }
        else {
            res.redirect('/config');
        }
    });
}