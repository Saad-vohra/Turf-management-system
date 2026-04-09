
// const Booking = require("../models/Booking");

// // CREATE BOOKING
// exports.createBooking = async (req, res) => {
//   try {
//     const { date, slot, duration, courtType, amount } = req.body;
//     const userId = req.user.id; // from auth middleware

//     // 🔒 Check if slot already booked
//     const existingBooking = await Booking.findOne({
//       date,
//       slot,
//       courtType,
//       status: { $ne: "CANCELLED" },
//     });

//     if (existingBooking) {
//       return res.status(400).json({
//         message: "Slot already booked",
//       });
//     }

//     const booking = await Booking.create({
//       userId,
//       date,
//       slot,
//       duration,
//       courtType,
//       amount,
//     });

//     res.status(201).json({
//       message: "Booking created",
//       bookingId: booking._id,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // GET BOOKED SLOTS (for frontend)
// exports.getBookedSlots = async (req, res) => {
//   const { date, courtType } = req.query;

//   const bookings = await Booking.find({
//     date,
//     courtType,
//     status: { $ne: "CANCELLED" },
//   }).select("slot");

//   const bookedSlots = bookings.map((b) => b.slot);

//   res.json(bookedSlots);
// };




// THIS IS TEMPRORY COMMENT OF FILE

// const Booking = require("../models/Booking");

// // helper
// const timeToMinutes = (time) => {
//   const [t, meridian] = time.split(" ");
//   let [h, m] = t.split(":").map(Number);

//   if (meridian === "PM" && h !== 12) h += 12;
//   if (meridian === "AM" && h === 12) h = 0;

//   return h * 60 + (m || 0);
// };

// // CREATE BOOKING
// exports.createBooking = async (req, res) => {
//   try {
//     const { date, slot, duration, courtType, amount } = req.body;
//     const userId = req.user.id;

//     const newStart = timeToMinutes(slot);
//     const newEnd = newStart + duration * 60;

//     const existingBookings = await Booking.find({
//       date,
//       courtType,
//       status: { $ne: "CANCELLED" },
//     });

//     for (let booking of existingBookings) {
//       const existingStart = timeToMinutes(booking.slot);
//       const existingEnd = existingStart + booking.duration * 60;

//       // 🔴 OVERLAP CHECK
//       if (newStart < existingEnd && newEnd > existingStart) {
//         return res.status(400).json({
//           message: `Slot overlaps with existing booking (${booking.slot})`,
//         });
//       }
//     }

//     const booking = await Booking.create({
//       userId,
//       date,
//       slot,
//       duration,
//       courtType,
//       amount,
//     });

//     res.status(201).json({
//       message: "Booking created",
//       bookingId: booking._id,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



// exports.getBookedSlots = async (req, res) => {
//   const { date, courtType } = req.query;

//   const bookings = await Booking.find({
//     date,
//     courtType,
//     status: { $ne: "CANCELLED" },
//   }).select("slot duration");

//   res.json(bookings);
// };




// // GET BOOKING DETAILS BY ID
// exports.getBookingById = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.json(booking);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // UPDATE BOOKING WITH PRICING & EXTRAS
// exports.updateBookingPricing = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const { sport, umpire, scorecard, customer } = req.body;

//     const booking = await Booking.findById(bookingId);

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     let finalAmount = booking.amount;

//     // 🏏 Cricket pricing logic
//     if (sport === "Cricket") {
//       if (umpire) {
//         finalAmount += booking.duration * 50; // ₹50 per hour
//       }

//       if (scorecard) {
//         finalAmount += 20; // ₹20 per game
//       }
//     }

//     booking.sport = sport;
//     booking.umpire = umpire;
//     booking.scorecard = scorecard;
//     booking.customer = customer;
//     booking.finalAmount = finalAmount;

//     await booking.save();

//     res.json({
//       message: "Pricing updated successfully",
//       finalAmount,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };





// exports.lockSlot = async (req, res) => {
//   try {
//     const { turfId, userId, date, slot } = req.body;

//     // Check if slot already locked or booked
//     const existingBooking = await Booking.findOne({
//       turfId,
//       date,
//       slot,
//       status: { $in: ["LOCKED", "CONFIRMED"] },
//       lockExpiresAt: { $gt: new Date() }
//     });

//     if (existingBooking) {
//       return res.status(409).json({
//         message: "Slot already locked or booked"
//       });
//     }

//     // Lock slot for 10 minutes
//     const lockTime = new Date();
//     lockTime.setMinutes(lockTime.getMinutes() + 10);

//     const booking = new Booking({
//       turfId,
//       userId,
//       date,
//       slot,
//       lockExpiresAt: lockTime
//     });

//     await booking.save();

//     res.status(201).json({
//       message: "Slot locked successfully",
//       booking
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };










const Booking = require("../models/Booking");
const generateTicket = require("../utils/ticketGenerator");
const sendTicketEmail = require("../utils/sendEmail");
const BlockedSlot = require("../models/BlockedSlot");




// helper
const timeToMinutes = (time) => {
  const [t, meridian] = time.split(" ");
  let [h, m] = t.split(":").map(Number);

  if (meridian === "PM" && h !== 12) h += 12;
  if (meridian === "AM" && h === 12) h = 0;

  return h * 60 + (m || 0);
};

// 🔁 AUTO CANCEL EXPIRED LOCKS
const releaseExpiredLocks = async () => {
  await Booking.updateMany(
    {
      status: "LOCKED",
      lockExpiresAt: { $lt: new Date() },
    },
    {
      status: "CANCELLED",
      paymentStatus: "FAILED",
    }
  );
};

// CREATE BOOKING (LOCK SLOT)
exports.createBooking = async (req, res) => {
  try {
    await releaseExpiredLocks(); // 👈 important

    const { date, slot, duration, courtType, amount , customer, sport} = req.body;
    const userId = req.user.id;

    const newStart = timeToMinutes(slot);
    const newEnd = newStart + duration * 60;



    const existingBookings = await Booking.find({
      date,
      courtType,
      status: { $in: ["LOCKED", "CONFIRMED"] },
      lockExpiresAt: { $gt: new Date() },
    });

    for (let booking of existingBookings) {
      const existingStart = timeToMinutes(booking.slot);
      const existingEnd = existingStart + booking.duration * 60;

      if (newStart < existingEnd && newEnd > existingStart) {
        return res.status(409).json({
          message: "Slot already locked or booked",
        });
      }
    }

    const lockExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // ⏳ 10 min

    const booking = await Booking.create({
      userId,
      date,
      customer: {
        name: customer?.name,
        email: customer?.email,
        phone: customer?.phone,
      },
      sport,
      slot,
      duration,
      courtType,
      amount,
      umpire: req.body.umpire,
      scorecard: req.body.scorecard,
      lockExpiresAt,
      bookingType: "ONLINE",
    });

    res.status(201).json({
      message: "Slot locked for 10 minutes. Complete payment.",
      bookingId: booking._id,
      lockExpiresAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};






// GET BOOKED SLOTS
// exports.getBookedSlots = async (req, res) => {
//   await releaseExpiredLocks();

//   const { date, courtType } = req.query;

//   const bookings = await Booking.find({
//     date,
//     courtType,
//     status: { $in: ["LOCKED", "CONFIRMED"] },
//     lockExpiresAt: { $gt: new Date() },
//   }).select("slot duration");

//   res.json(bookings);
// };


// exports.getBookedSlots = async (req, res) => {
//   await releaseExpiredLocks();

//   const { date, courtType} = req.query;

//   // USER BOOKINGS
//   const bookings = await Booking.find({
//     date,
//     courtType,
//     status: { $in: ["LOCKED", "CONFIRMED"] },
//     lockExpiresAt: { $gt: new Date() },
//   }).select("slot duration");

//   // ADMIN BLOCKED SLOTS
//   const blockedSlots = await BlockedSlot.find({
//     date,
//     courtType,
//   }).select("slot duration");

//   // 👇 MERGE BOTH
//   const combined = [
//     ...bookings,
//     ...blockedSlots.map(b => ({
//       slot: b.slot,
//       duration: b.duration,
//     })),
//   ];

//   res.json(combined);
// };

// ---------------------- FOR PRACTISE BOOKING ----------------------------------------------------------



exports.getBookedSlots = async (req, res) => {
  const { date, courtType } = req.query;

  if (!date || !courtType) {
    return res.status(400).json({ message: "Date & courtType required" });
  }

  try {

    const now = new Date();

    // 1️⃣ USER BOOKINGS
    const bookings = await Booking.find({
      date,
      courtType,
      bookingStatus: "active",
      status: { $in: ["LOCKED", "CONFIRMED"] },
      $or: [
        { lockExpiresAt: { $exists: false } },
        { lockExpiresAt: { $gt: now } },
      ],
    }).select("slot duration");

    // 2️⃣ ADMIN BLOCKED SLOTS
    const blockedSlots = await BlockedSlot.find({
      date,
      courtType,
    }).select("slot duration");

    // 3️⃣ MERGE BOTH → SAME STRUCTURE
    const combined = [
      ...bookings.map(b => ({
        slot: b.slot,
        duration: b.duration,
      })),
      ...blockedSlots.map(b => ({
        slot: b.slot,
        duration: b.duration,
      })),
    ];

    res.json(combined);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch booked slots" });
  }
};











// GET BOOKING BY ID
exports.getBookingById = async (req, res) => {
  await releaseExpiredLocks();

  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Not found" });

  res.json(booking);
};

// UPDATE PRICING
exports.updateBookingPricing = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Not found" });

  let finalAmount = booking.amount;

  if (req.body.sport === "Cricket") {
    if (req.body.umpire) finalAmount += booking.duration * 50;
    if (req.body.scorecard) finalAmount += 20;
  }

  booking.sport = req.body.sport;
  booking.umpire = req.body.umpire;
  booking.scorecard = req.body.scorecard;
  booking.customer = req.body.customer;
  booking.finalAmount = finalAmount;

  await booking.save();

  res.json({ finalAmount });
};


//  GENERATE TICKET LOGIC 

// const generateTicket = require("../utils/ticketGenerator");

// exports.confirmPayment = async (req, res) => {
//   const { bookingId } = req.body;

//   const booking = await Booking.findOne({ bookingId });
//   if (!booking) {
//     return res.status(404).json({ message: "Booking not found" });
//   }

//   booking.status = "CONFIRMED";
//   booking.paymentStatus = "PAID";

//   // 🎟️ GENERATE TICKET
//   const ticketPath = await generateTicket(booking);
//   booking.ticketPath = ticketPath;

//   await booking.save();

//   res.json({
//     success: true,
//     message: "Booking confirmed",
//     ticketPath
//   });
// };








// exports.confirmPayment = async (req, res) => {
//   try {
//     const { bookingId } = req.body;

//     // ✅ FIX: use findById
//     const booking = await Booking.findById(bookingId);

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     booking.status = "CONFIRMED";
//     booking.paymentStatus = "PAID";

//     // 🎟️ GENERATE TICKET
//     const ticketPath = await generateTicket(booking);
//     booking.ticketPath = ticketPath;

//     await booking.save();

//     res.json({
//       success: true,
//       message: "Booking confirmed",
//       ticketPath,
//       booking
//     });
//   } catch (error) {
//     console.error("Confirm payment error:", error);
//     res.status(500).json({ message: "Payment confirmation failed" });
//   }
// };




exports.confirmPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "CONFIRMED";
    booking.paymentStatus = "PAID";

    // 🎟️ GENERATE TICKET
    const ticketPath = await generateTicket(booking);
    booking.ticketPath = ticketPath;

    await booking.save();

    // 📧 Send ticket via email
    if (booking.customer.email) {
      await sendTicketEmail(booking.customer.email, booking, ticketPath);
    }

    res.json({
      success: true,
      bookingId: booking._id,
      message: "Booking confirmed and ticket sent!",
      ticketPath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ticket generation failed" });
  }
};


// MY-BOOKING PAGE IN USER SIDE

// GET MY BOOKINGS (for MyBookings page)

exports.getMyBookings = async (req, res) => {
  try {

    const userId = req.user.id;

    const bookings = await Booking.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch bookings"
    });
  }
};

























