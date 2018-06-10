module.exports = function(app) {

  var ObjectID = require('mongodb').ObjectID;

  app.get("/post/create", function(req, res) {
    res.render("create");
  });

  app.post("/post/create", function(req, res) {
    var data = req.body;
    data.date = new Date().getTime();
    var db = app.client.db("blog");
    var collection = db.collection('articles');
    collection.insert(data);
    res.redirect("/");
  });

  app.get("/post/:id", function(req, res) {
    var db = app.client.db("blog");
    var collection = db.collection('articles');
    collection.findOne({ "_id": new ObjectID(req.params.id) }, function(err, result){
      res.render("AffichageArticle", {"json" : result});
    });
  });
}