var router = require("express").Router();
var scrapeController = require("../../controllers/scrapeController");

router.get("/", scrapeController);

module.exports = router;
