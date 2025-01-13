const express = require("express");
const router = express.Router();
const FilmController = require("../controllers/FilmController");

router.get("/", FilmController.index);
router.get("/:id", FilmController.show);

router.post("/:id/reviews", FilmController.storeReview);

module.exports = router;


