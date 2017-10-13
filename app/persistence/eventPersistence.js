module.exports = class EventPersistence {

    constructor(db) {
        this.db = db;
    }
    /**
     * Enregistrer l'event
     */
    save(event) {
        // creation ou recup de la collection
        var collection = this.db.get('event');

        // envoie à la bdd
        collection.insert({
            "evenement": event.evenement,
        }, function (err, doc) {
            if (err) {
                // error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.redirect("/");
            }
        });
    }
}