const express = require("express");
const router = express.Router();

const {
  blockSlot,
  getBlockedSlots,
  unblockSlot,
  blockFullDay,
  createOfflineBooking,
} = require("../controllers/adminSlotController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.post("/block", protect, adminOnly, blockSlot);
router.get("/blocked-slots", protect, adminOnly, getBlockedSlots);
router.delete("/unblock/:id", protect, adminOnly, unblockSlot);
router.post("/block-full-day", protect,adminOnly, blockFullDay);

// OFFLINE BOOKING
router.post("/offline-booking",protect,adminOnly,createOfflineBooking)



module.exports = router;
