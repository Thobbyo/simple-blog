var express = require("express");
var MongoClient = require("mongodb");
var bodyParser = require('body-parser')
var cons = require('consolidate');

var tools = require('./randomDbGenerator/scriptRandom');

var app = express();
var url = process.env.URL || "localhost";
var dbName = process.env.DBNAME || "blog";
var port = process.env.PORT || 8000;

app.engine('html', cons.pug);
app.set('view engine', 'html');
app.set('views',  __dirname +  '/views');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var routes = require("./routes");

var urlDB = "mongodb://" + url + ":27017/" + dbName;

MongoClient.connect(urlDB, function(err, client) {
  if(err) throw err;
  
  // tools.generate(client);

  app.client = client;
  app.db = client.db(dbName);

  routes(app);

  app.listen(port, function() {
    console.log("now listening on http://localhost:" + port)
  });
});

module.exports = app;
