var router = require("express").Router();
var Article = require("../../controllers/articleController");

router.get("/", Article.findAll);
// router.get("/:id", Article.delete_get);
// router.post("/:id", Article.delete_post);


module.exports = router;
