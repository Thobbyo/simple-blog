var posts = require("./posts");

module.exports = function(app) {

  app.get("/", function(req, res) {

    var db = app.client.db("blog");
    var collection = db.collection('articles');
    collection.find().toArray(function(err, result){
      res.render("index", {"json" : result});
    });
  });

  // Register posts endpoint
  posts(app);
}
