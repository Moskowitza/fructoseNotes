var db = require('../models');
var async = require('async');
module.exports = {
  // Find all headlines, sort them by date, send them back to the user
  findAll: function (req, res, next) {
    db.Article
      .find()
      .populate('note')
      .exec(function (err, dbArticle) {
        if (err) { return next(err); }
        console.log(dbArticle)
        res.render("index", { articles: dbArticle});
      });
  },
  // delete_get: function(req,res,next){
  //   async.parallel({
  //     article: function(callback){
  //       db.Article.findById(req.params.id).populate('note').exec(callback)
  //     },
  //     function(err,result){
  //       if (err){return next(err);}
  //       res.render('index',{message:'Delete this article and notes?'})
  //     }
  //   })
  // },
  delete_post: function(req,res,next){
      db.Article.findByIdAndRemove(req.body.id, function (err, dbArticles){
        if (err){return next(err);}
        res.redirect("/");
      })
    // })
  },
  // Delete the specified headline
  delete: function (req, res) {
    console.log("remove article " + req.params.id)
    db.Article.remove({ _id: req.params.id })
    .then(function (dbArticle) {
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
