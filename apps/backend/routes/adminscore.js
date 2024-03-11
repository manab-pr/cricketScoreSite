const express = require("express");
const router = express.Router();

const {
  createScore,
  createMatch,
  updateScore,
  updateMatch,
  deleteScore,
  deleteMatch
} = require("../controllers/scorecard");

router.route("/score/:id").post(createScore);
router.route("/match").post(createMatch);
router.route("/score/:id").patch(updateScore).delete(deleteScore);
router.route("/match/:id").patch(updateMatch).delete(deleteMatch);

module.exports = router;
