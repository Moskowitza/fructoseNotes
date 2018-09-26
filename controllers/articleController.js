var db = require('../models');

module.exports = {
  // Find all headlines, sort them by date, send them back to the user
  findAll: function (req, res, next) {
    db.Article
      .find()
      .exec(function (err, dbArticle) {
        if (err) { return next(err); }
        res.render("index", { articles: dbArticle });
      });
  },
  // Delete the specified headline
  delete: function (req, res) {
    console.log("remove article " + req.params.id)
    db.Article.findByIdAndRemove({ _id: req.params.id }).then(function (dbArticle) {
      res.render("index", {message:"Deleted"+req.params.id, articles: dbArticle });
    });
  },
  // Update the specified headline
  update: function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function (dbArticle) {
      res.render("index", { articles: dbArticle });
    });
  }
};
