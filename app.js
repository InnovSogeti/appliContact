const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const monk = require('monk');
const https = require('https');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var fs = require('fs');
var cam = JSON.parse(fs.readFileSync('./public/site_map.json', 'utf8'));
var obj = cam; //tous le fichier JSON dans un obj
var site_map = Object.keys(obj);

// Templates pages
app.get('/', function (req, res, next) {
  res.render('index', { cam: cam[site_map[1]] });
});

app.get('/config', function (req, res, next) {
  res.render('config', { title: 'Express' });
});

app.get('/password', function (req, res, next) {
  res.render('password', { title: 'Express' });
});

//404
/*app.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.send(404, '404 Page not found !');
});*/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// REST Services

const db = monk('localhost:27017/appliContact');

const VisiteurPersistence = require('./app/persistence/visiteurPersistence');
const visiteurPersistence = new VisiteurPersistence(db);

require('./app/controller/visiteurController')(app, visiteurPersistence);
require('./app/controller/password')(app);
