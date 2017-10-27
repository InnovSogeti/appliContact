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
//const session = require('express-session');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var fs = require('fs');
var cam = JSON.parse(fs.readFileSync('./public/site_map.json', 'utf8'));
var obj = cam; //tous le fichier JSON dans un obj
var site_map = Object.keys(obj);
var bdd = cam[site_map[2]];

// Templates pages
app.get('/', function (req, res, next) {
  res.render('index', { my_id: "", cam: cam[site_map[1]] });
});

app.get('/config', function (req, res, next) {
  res.render('config', { title: 'Express' });
});



app.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

app.get('/login_password', function (req, res, next) {
  res.render('login_password', { title: 'Express' });
});



app.get('/salon', function (req, res, next) {
  res.render('salon', { str: cam });
});

app.get('/add_salon', function (req, res, next) {
  res.render('add_salon', { title: 'Express' });
});

app.get('/password', function (req, res, next) {
  res.render('password', { title: 'Express' });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// REST Services
var mymonk = "localhost:27017/" + bdd;
const db = monk(mymonk);
//const db = monk('localhost:27017/appliContact');

const VisiteurPersistence = require('./app/persistence/visiteurPersistence');
const visiteurPersistence = new VisiteurPersistence(db);

const SalonPersistence = require('./app/persistence/salonPersistence');
const salonPersistence = new SalonPersistence(db);


require('./app/controller/visiteurController')(app, visiteurPersistence);
require('./app/controller/salonController')(app, salonPersistence);
require('./app/controller/password')(app);
require('./app/controller/login_password')(app);
