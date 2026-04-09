const express = require("express");
const router = express.Router();
const { calculatePrice, getPricing, updatePricing } = require("../controllers/pricingController");

router.post("/calculate", calculatePrice);

// ADMIN
router.get("/", getPricing);
router.put("/", updatePricing);

module.exports = router;
