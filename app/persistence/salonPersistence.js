module.exports = class SalonPersistence {

    constructor(db) {
        this.db = db;
    }
    /**
     * Enregistrer le salon
     */

    save(salon, callback) {
        var fs = require('fs');
        var json = JSON.parse(fs.readFileSync('./public/site_map.json', 'utf8'));
        var obj = json; //tous le fichier JSON dans un obj
        var site_map = Object.keys(obj);
        var collect = "salon";
        var collection = this.db.get(collect);
        // envoie à la bdd
        collection.insert({
            "nom_salon": salon.nom,
            "ville_salon": salon.ville,
            "date_debut": salon.date_debut,
            "date_fin": salon.date_fin,
            "description": salon.description,
            "id_salon": salon.id_salon
        },
            function (err, doc) {
                if (err) {
                    // error
                    //res.send("There was a problem adding the information to the database.");
                }
                else {
                    console.log('=> Ajout du salon : ' + salon.nom + ' à ' + salon.ville);
                }
            });
            callback("ok");
    }
}

/*
<script>
    var cam = <%- JSON.stringify(cam) %>;
    if (cam == "OFF"){
    document.getElementById("cam").removeChild(document.getElementById("scanner"));
}
</script>
*/