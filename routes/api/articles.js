var router = require("express").Router();
var Article = require("../../controllers/articleController");

router.get("/", Article.findAll);
router.post("/:id", Article.delete);


module.exports = router;
