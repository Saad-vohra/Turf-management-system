const express = require("express");
const router = express.Router();
const { getAvailableSlots } = require("../controllers/slotController");

router.get("/available-slots", getAvailableSlots);

module.exports = router;
