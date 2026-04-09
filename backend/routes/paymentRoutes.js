const express = require("express");
const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Booking = require("../models/Booking");

const router = express.Router();

/* ==============================
   CREATE ORDER
============================== */
router.post("/create-order", async (req, res) => {
  const { bookingId, amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: `booking_${bookingId}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* ==============================
   VERIFY PAYMENT
============================== */
router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId,
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    await Booking.findByIdAndUpdate(bookingId, {
      status: "CONFIRMED",
      paymentStatus: "PAID",
      // JUST TEMPRORY CHANGE
      lockExpiresAt: null, // 🔒 permanent lock
      
    });

    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
