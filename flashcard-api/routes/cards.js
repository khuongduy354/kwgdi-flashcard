const express = require("express");
const router = express.Router();
const { makeCard } = require("../controller/cards.js");

router.post("/card", makeCard);
router.post("/card", makeCard);
router.post("/card", makeCard);
router.post("/card", makeCard);

module.exports = route;
