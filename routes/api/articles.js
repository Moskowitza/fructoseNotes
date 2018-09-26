var router = require("express").Router();
var Article = require("../../controllers/articleController");

router.get("/", Article.findAll);
router.delete("/:id", Article.delete);
router.put("/:id", Article.update);

module.exports = router;
