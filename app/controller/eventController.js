module.exports = function (app, eventPersistence) {
    /**
     * Ajout d'un visiteur
     */
    app.post('/addevent', function (req, res) {
        console.log('==> /addevent')
        var event = {
            evenement: req.body.evenement,
        };
        console.log('==> OK');
        eventPersistence.save(event);
        res.render('end', { message: 'OK' });
    });
}