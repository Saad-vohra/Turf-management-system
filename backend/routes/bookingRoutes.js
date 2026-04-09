// const express = require("express");
// const router = express.Router();
// const {
//   createBooking,
//   getBookedSlots,
// } = require("../controllers/bookingController");
// const authMiddleware = require("../middleware/authMiddleware");

// router.post("/create", authMiddleware, createBooking);
// router.get("/booked-slots", getBookedSlots);

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//   createBooking,
//   getBookedSlots,
//   updateBookingPricing,
// } = require("../controllers/bookingController");

// const { protect } = require("../middleware/authMiddleware");

// // CREATE BOOKING (protected)
// router.post("/create", protect, createBooking);

// // GET BOOKED SLOTS
// router.get("/booked-slots", getBookedSlots);

// // NEW
// router.get("/:id",protect, getBookedSlots);
// router.put("/:bookingId/pricing",protect, updateBookingPricing);


// module.exports = router;




// const express = require("express");
// const router = express.Router();

// const {
//   createBooking,
//   getBookedSlots,
//   updateBookingPricing,
//   getBookingById,
//   confirmPayment,
//   getMyBookings

// } = require("../controllers/bookingController");

// const { protect } = require("../middleware/authMiddleware");

// // CREATE BOOKING
// router.post("/create", protect, createBooking);

// // GET BOOKED SLOTS (for calendar / UI)
// router.get("/booked-slots", getBookedSlots);



// // MY-BOOOKING PAGE
// router.get("/my-bookings", protect, getMyBookings);



// // GET SINGLE BOOKING BY ID
// router.get("/:id", protect, getBookingById);

// // UPDATE PRICING
// router.put("/:id/pricing", protect, updateBookingPricing);

// //TICKET
// router.post("/confirm-payment",protect , confirmPayment);


// module.exports = router;










const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookedSlots,
  updateBookingPricing,
  getBookingById,
  confirmPayment,
  getMyBookings,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

// CREATE BOOKING
router.post("/create", protect, createBooking);

// GET BOOKED SLOTS
router.get("/booked-slots", getBookedSlots);

// ✅ MY BOOKINGS (MOVE THIS UP)
router.get("/my-bookings", protect, getMyBookings);

// GET SINGLE BOOKING
router.get("/:id", protect, getBookingById);

// UPDATE PRICING
router.put("/:id/pricing", protect, updateBookingPricing);

// CONFIRM PAYMENT
router.post("/confirm-payment", protect, confirmPayment);


module.exports = router;
