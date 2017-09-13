var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var app = express.createServer();
app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});
app.get('/', function(req, res, next){
  res.render('./index/index.ejs');
});
app.listen(8080);