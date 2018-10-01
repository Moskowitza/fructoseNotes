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
  // create: function(req, res) {
  //   db.Note.create(req.body).then(function(dbNote) {
  //       res.redirect("/");
  //   });
  // },
  create: function (req, res) {
    db.Note.create(req.body)
      .then(function (dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { note: dbNote._id } },
          { new: true });
      })
      .then(function (data) {
        // If we were able to successfully update an Article, send it back to the client
        res.redirect("/");
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },
  // Delete a note with a given id
  delete: function (req, res) {
    db.Note.remove({ _id: req.params.id }).then(function (dbNote) {
      res.render("index", { notes: dbNote });
    });
  }
};
