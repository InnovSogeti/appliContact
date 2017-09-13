var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/appliContact');

//chemin vers les fichiers dans des variables
//var routes = require('./routes/index');
var routes = require('./src/persistance/visiteurPersistance');
var users = require('./routes/users');

var app = express();

// permet d'utiliser les ejs
//app.set('views', path.join(__dirname, 'views'));
var viewPath = path.join(__dirname, 'src');
app.set('views', viewPath);

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// rend la bdd visible pour le router
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/', routes);
app.use('/users', users);

module.exports = app;
