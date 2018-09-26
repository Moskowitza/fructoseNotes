var router = require("express").Router();
var scrapeController = require("../../controllers/scrapeController");

router.get("/scrape", scrapeController);

module.exports = router;
