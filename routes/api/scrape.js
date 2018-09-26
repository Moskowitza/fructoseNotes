var router = require("express").Router();
var scrapeController = require("../../controllers/scrapeController");

router.get("/scrape", scrapeController.scrapeHeadlines);

module.exports = router;
