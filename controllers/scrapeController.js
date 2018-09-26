// Controller for our scraper
// ============================
var db = require("../models");
var scrape = require("../scrape.js");

module.exports = {
  scrapeHeadlines: function (req, res, next) {
    // scrape the NYT
    return scrape()
    db.Article
      .find()
      .exec(function (err, dbArticle) {
        if (err) { return next(err); }
        if (dbArticle.length === 0) {
          res.render("scrape", {
            message: "No new articles today. Check back tomorrow!"
          });
        }
        else {
          // Otherwise send back a count of how many new articles we got
          res.render("scrape", {
            message: "Added " + dbArticle.length + " new articles!"
          });
        }
      })
      .catch(function (err) {
        // This query won't insert articles with duplicate headlines, but it will error after inserting the others
        res.render("scrape", {
          message: "Scrape complete!!"
        });
      });
  }
};