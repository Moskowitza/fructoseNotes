var router = require("express").Router();
var Article = require("../../controllers/articleController");

router.get("/", Article.findAll);
router.post("/", Article.delete_post);

module.exports = router;
