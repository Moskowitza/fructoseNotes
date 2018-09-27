// Controller for our notes
// ========================
var db = require("../models");

module.exports = {
  // Find one note
  find: function(req, res) {
    db.Note.find({ _headlineId: req.params.id }).then(function(dbNote) {
        res.render("index",{notes:dbNote});
    });
  },
  // Create a new note
  create: function(req, res) {
    console.log(req.body)
    db.Note.save(req.body).then(function(dbNote) {
        res.render("index",{notes:dbNote});
    });
  },
  // Delete a note with a given id
  delete: function(req, res) {
    db.Note.remove({ _id: req.params.id }).then(function(dbNote) {
        res.render("index",{notes:dbNote});
    });
  }
};
