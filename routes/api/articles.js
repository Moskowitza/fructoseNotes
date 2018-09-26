var router = require("express").Router();
var Article = require("../../controllers/articleController");

router.get("/", Article.findAll);
// router.get("/", Article.delete_get);
router.post("/", Article.delete_post);


module.exports = router;
