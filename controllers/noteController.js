// Controller for our notes
// ========================
var db = require("../models");

module.exports = {
  // Find one note
  find: function (req, res) {
    db.Note.find({ _headlineId: req.params.id }).then(function (dbNote) {
      res.render("index", { notes: dbNote });
    });
  },
  // Create a new note
  create: function (req, res, next) {
    var newnote = new db.Note(
      {
        article._id: req.body.article,
        title: req.body.title,
        body: req.body.body
      });
    newnote.save(function (err) {
      if (err) {return next(err);}
      res.redirect("/");
    });
  },
  // Delete a note with a given id
  delete: function (req, res) {
    db.Note.remove({ _id: req.params.id }).then(function (dbNote) {
      res.render("index", { notes: dbNote });
    });
  }
};
