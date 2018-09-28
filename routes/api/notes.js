var router = require("express").Router();
var noteController = require("../../controllers/noteController");

router.get("/:id", noteController.find);
router.post("/newnote/:id", noteController.create);
router.post("/delete/:id",noteController.delete)


module.exports = router;
