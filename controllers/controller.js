var express = require("express");
var mongoose = require("mongoose");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the servervar axios = require("axios");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models (imports index.js from that folder)
var db = require("../models");

var router = express.Router();

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/hiFructose");

//0) OUR SCRAPE : THIS WORKS: Does 
router.get("/scrape", function (req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.hifructose.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article.status-publish").each(function (i, element) {
            // Save an empty result object
            var result = {};
            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .find("h1.entry-title")
                .find("a")
                .text();
            result.link = $(this)
                .find("h1.entry-title")
                .find("a")
                .attr("href");
            result.imgLink = $(this)
                .find("div.entry-content")
                .find("img")
                .attr("src");
            // Create 1 new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                    alert("scrape complete")
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                })
        });
    });
});

//1) get all articles
router.get("/", function (req, res) {
    // Grab every document in the "Article" collection: "Article" is what works
    console.log("getting all the new articles from the display button")
    db.Article.find()
        .then(function (data) {
            var hbsObject = {
                articles: data
            }
            res.render("index",hbsObject);
        })
        // If we were able to successfully find Articles, send them back to the client
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});


//2) DELETE ARTICLES WE DON'T WANT
router.get("/delete/:id", function (req, res) {
    console.log("delete path hit in controller")
    // This DOES work, but how do we get it to update the page?
    db.Article.findOneAndRemove({ _id: req.params.id })
        .then(function (result) {
            return console.log("deleted " + result)
        });
    db.Article.find()
        .then(function (data) {
            var hbsObject = {
                articles: data
            }
            res.json(hbsObject);
        })

});

//3) Get a specific Article by id AND populate it with it's note
router.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (data) {
            var hbsNotes = {
                notes: data
            }
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.render("index", hbsNotes);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

//4)  POST for saving/updating an Article's associated Note
router.post("/articles/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (data) {
            var hbsNotes = {
                notes: data
            }
            // If we were able to successfully update an Article, send it back to the client

            res.render("index", hbsNotes);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });

});
module.exports = router;