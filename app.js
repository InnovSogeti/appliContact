/**
 * appel desdifférents modules 
 */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const monk = require('monk');
const http = require('http');
var engines = require('consolidate');
//const Instascan = require('instascan');
//const Instascan = require('instascan-ngfar');



const app = express()

/**
 * permet l'utilisation des pages ejs + dossier public en static
 */

/*app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');*/

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// Templates pages
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/aff', function (req, res, next) {
  res.render('aff', { title: 'Express' });
});

// REST Services

const db = monk('localhost:27017/appliContact');

const VisiteurPersistence = require('./app/persistence/visiteurPersistence');
const visiteurPersistence = new VisiteurPersistence(db);

require('./app/controller/visiteurController')(app, visiteurPersistence);