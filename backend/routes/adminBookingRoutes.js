const express = require("express");
const router = express.Router();
const {
  getAllBookings,
  markCheckedIn,
  getTicket,
} = require("../controllers/adminBookingController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");


// 🔐 PROTECTED ROUTES
router.get("/bookings", protect,adminOnly, getAllBookings);
router.put("/bookings/:id/checkin", protect,adminOnly , markCheckedIn);
router.get("/bookings/ticket/:id", protect,adminOnly, getTicket);

module.exports = router;
