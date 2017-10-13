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
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

var fs = require('fs');
var cam = JSON.parse(fs.readFileSync('./public/site_map.json', 'utf8'));
var obj = cam; //tous le fichier JSON dans un obj
var site_map = Object.keys(obj);
console.log(cam[site_map[1]]);

/*jquery.getJSON('./public/site_map.json', function (data) {
  var obj = data; //tous le fichier JSON dans un obj
  var site_map = Object.keys(obj);
  var cam = data[site_map[1]];
});*/


// Templates pages
app.get('/', function (req, res, next) {
  res.render('index', { cam: cam[site_map[1]] });
});

app.get('/config', function (req, res, next) {
  res.render('config', { title: 'Express' });
});

// REST Services

const db = monk('localhost:27017/appliContact');

const VisiteurPersistence = require('./app/persistence/visiteurPersistence');
const visiteurPersistence = new VisiteurPersistence(db);

const EventPersistence = require('./app/persistence/eventPersistence');
const eventPersistence = new EventPersistence(db);

require('./app/controller/visiteurController')(app, visiteurPersistence);
require('./app/controller/eventController')(app, eventPersistence);