var db = require('../models');

module.exports = {
    // Find all headlines, sort them by date, send them back to the user
    findAll: function(req, res) {
      db.Article
        .find(req.query)
        .then(function(dbArticle) {
          res.render("index",{articles:dbArticle});
        });
    },
    // Delete the specified headline
    delete: function(req, res) {
      db.Article.remove({ _id: req.params.id }).then(function(dbArticle) {
        res.render("index",{articles:dbArticle});
      });
    },
    // Update the specified headline
    update: function(req, res) {
      db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function(dbArticle) {
        res.render("index",{articles:dbArticle});
      });
    }
  };
  