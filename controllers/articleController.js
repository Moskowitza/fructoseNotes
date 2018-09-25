var Articles = require('../models/Article');
var Notes= require('../models/Note')
exports.index=function(req,res){
 Article.find({})
 .populate('note')
 .exec(function(err,list_articles){
     if (err){return next(err)}
     res.render("index",{articles: articles})
 })
}