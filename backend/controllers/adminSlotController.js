// const BlockedSlot = require("../models/BlockedSlot");

// exports.blockSlot = async (req, res) => {
//   const { date, slot, duration, courtType, reason } = req.body;

//   if (!date || !slot || !duration || !courtType) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   const block = await BlockedSlot.create({
//     date,
//     slot,
//     duration,
//     courtType,
//     reason,
//   });

//   res.status(201).json({
//     message: "Slot blocked successfully",
//     block,
//   });
// };







const BlockedSlot = require("../models/BlockedSlot");
const Booking = require("../models/Booking");
const timeSlots = require("../utils/timeSlots");


// helper (SAME logic as booking & frontend)
const timeToMinutes = (time) => {
  const [t, meridian] = time.split(" ");
  let [h, m] = t.split(":").map(Number);

  if (meridian === "PM" && h !== 12) h += 12;
  if (meridian === "AM" && h === 12) h = 0;

  return h * 60 + (m || 0);
};

exports.blockSlot = async (req, res) => {
  try {
    const { date, slot, duration, courtType, reason } = req.body;

    if (!date || !slot || !duration || !courtType) {
      return res.status(400).json({ message: "All fields required" });
    }

    const blockStart = timeToMinutes(slot);
    const blockEnd = blockStart + Number(duration) * 60;

    // 🔴 1. CHECK USER BOOKINGS FIRST (LOCKED + CONFIRMED)
    const bookings = await Booking.find({
      date,
      courtType,
      status: { $in: ["LOCKED", "CONFIRMED"] },
    });

    for (let booking of bookings) {
      const bookedStart = timeToMinutes(booking.slot);
      const bookedEnd = bookedStart + booking.duration * 60;

      if (blockStart < bookedEnd && blockEnd > bookedStart) {
        return res.status(409).json({
          message: "Cannot block slot. Already booked by user.",
        });
      }
    }

    // 🔴 2. CHECK EXISTING BLOCKED SLOTS (avoid duplicate block)
    const blockedSlots = await BlockedSlot.find({
      date,
      courtType,
    });

    for (let blocked of blockedSlots) {
      const blockedStart = timeToMinutes(blocked.slot);
      const blockedEnd = blockedStart + blocked.duration * 60;

      if (blockStart < blockedEnd && blockEnd > blockedStart) {
        return res.status(409).json({
          message: "Slot already blocked",
        });
      }
    }

    // ✅ 3. SAFE TO BLOCK
    const block = await BlockedSlot.create({
      date,
      slot,
      duration,
      courtType,
      reason,
    });

    res.status(201).json({
      message: "Slot blocked successfully",
      block,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Block slot failed" });
  }
};



exports.getBlockedSlots = async (req, res) => {
  const { date, courtType } = req.query;

  const blocks = await BlockedSlot.find({ date, courtType });
  res.json(blocks);
};



exports.unblockSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const blockedSlot = await BlockedSlot.findById(id);

    if (!blockedSlot) {
      return res.status(404).json({ message: "Blocked slot not found" });
    }

    await BlockedSlot.findByIdAndDelete(id);

    res.json({
      message: "Slot unblocked successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unblock slot failed" });
  }
};



// BLOCK FULL DAY
exports.blockFullDay = async (req, res) => {
  try {
    const { date, courtType, reason } = req.body;

    if (!date || !courtType) {
      return res.status(400).json({
        message: "Date and courtType are required",
      });
    }

    // All slots of the day
    const allSlots = [
      "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM",
      "10:00 AM", "11:00 AM", "12:00 PM",
      "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
      "05:00 PM", "06:00 PM", "07:00 PM",
      "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
    ];

    const blocksToInsert = [];

    for (let slot of allSlots) {
      const exists = await BlockedSlot.findOne({
        date,
        slot,
        courtType,
      });

      if (!exists) {
        blocksToInsert.push({
          date,
          slot,
          duration: 60,
          courtType,
          reason: reason || "Admin Block",
        });
      }
    }

    if (blocksToInsert.length === 0) {
      return res.status(200).json({
        message: "All slots already blocked for this day",
      });
    }

    await BlockedSlot.insertMany(blocksToInsert);

    res.status(201).json({
      message: "Full day blocked successfully",
      totalBlocked: blocksToInsert.length,
    });

  } catch (error) {
    console.error("BLOCK FULL DAY ERROR:", error);
    res.status(500).json({
      message: "Failed to block full day",
      error: error.message,
    });
  }
};










// ADMIN OFFLINE BOOKING
exports.createOfflineBooking = async (req, res) => {
  try {
    const {
      date,
      slot,
      duration,
      courtType,
      customer,
      amount,
      finalAmount,
      paidAmount,
      paymentMode,
    } = req.body;

    // 🛑 validation
    if (!date || !slot || !duration || !courtType || !customer?.name || !customer?.phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔍 check if slot already booked / blocked
    const existing = await Booking.findOne({
      date,
      courtType,
      status: { $ne: "CANCELLED" },
      bookingType: "ONLINE",
      slot,
    });

    if (existing) {
      return res.status(400).json({ message: "Slot already booked or blocked" });
    }

    // 💳 payment status logic
    let paymentStatus = "PENDING";
    if (paidAmount >= finalAmount) {
      paymentStatus = "PAID";
    }

    // 📦 create booking
    const booking = await Booking.create({
      userId: null, // offline booking
      date,
      slot,
      duration,
      courtType,
      amount,
      //finalAmount,
      status: "CONFIRMED",
      paymentStatus,
      paidAmount,
      bookingType: "OFFLINE",
      //sport: "Football"||"cricket",

      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || "",
      },
    });

    return res.status(201).json({
      message: "Offline booking created successfully",
      booking,
    });
  } catch (err) {
    console.error("Offline booking error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};











