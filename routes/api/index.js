var router = require("express").Router();
var scrapeRoutes = require("./scrape");
var noteRoutes = require("./notes");
var articleRoutes = require("./articles");

router.use("/scrape", scrapeRoutes);
router.use("/notes", noteRoutes);
router.use("/", articleRoutes);

module.exports = router;
