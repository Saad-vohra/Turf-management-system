// const Booking = require("../models/Booking");
// const timeSlots = require("../utils/timeSlots");

// exports.getAvailableSlots = async (req, res) => {
//   const { date, duration } = req.query;

//   if (!date || !duration) {
//     return res.status(400).json({ message: "Date & duration required" });
//   }

//   try {
//     const bookings = await Booking.find({
//       date,
//       status: "Confirmed",
//     });

//     const bookedSlots = bookings.map((b) => b.startTime);

//     const availableSlots = timeSlots.filter((slot, index) => {
//       if (bookedSlots.includes(slot)) return false;
//       if (index + Number(duration) > timeSlots.length) return false;
//       return true;
//     });

//     res.json(availableSlots);
//   } catch (error) {
//     res.status(500).json({ message: "Slot fetch error" });
//   }
// };




// const Booking = require("../models/Booking");
// const timeSlots = require("../utils/timeSlots");

// exports.getAvailableSlots = async (req, res) => {
//   const { date, duration } = req.query;

//   if (!date || !duration) {
//     return res.status(400).json({ message: "Date & duration required" });
//   }

//   try {
//     const now = new Date();

//     // 🔒 Get slots that should be blocked
//     const bookings = await Booking.find({
//       date,
//       $or: [
//         { status: "CONFIRMED" },
//         {
//           status: "LOCKED",
//           lockExpiresAt: { $gt: now },
//         },
//       ],
//     });

//     // assuming slot is "1:00 PM", "2:00 PM" etc
//     const bookedSlots = bookings.map((b) => b.slot);

//     const availableSlots = timeSlots.filter((slot, index) => {
//       // slot already blocked
//       if (bookedSlots.includes(slot)) return false;

//       // duration overflow check
//       if (index + Number(duration) > timeSlots.length) return false;

//       return true;
//     });

//     res.json(availableSlots);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Slot fetch error" });
//   }
// };



// const Booking = require("../models/Booking");
// const timeSlots = require("../utils/timeSlots");

// // helper: convert "9:00 AM" → minutes
// const timeToMinutes = (time) => {
//   const [t, modifier] = time.split(" ");
//   let [hours, minutes] = t.split(":").map(Number);

//   if (modifier.toLowerCase() === "pm" && hours !== 12) hours += 12;
//   if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;

//   return hours * 60 + minutes;
// };

// exports.getAvailableSlots = async (req, res) => {
//   const { date, duration } = req.query;

//   if (!date || !duration) {
//     return res.status(400).json({ message: "Date & duration required" });
//   }

//   try {
//     const now = new Date();

//     // 🔒 fetch active bookings
//     const bookings = await Booking.find({
//       date,
//       $or: [
//         { status: "CONFIRMED" },
//         {
//           status: "LOCKED",
//           lockExpiresAt: { $gt: now },
//         },
//       ],
//     });

//     const availableSlots = timeSlots.filter((slot, index) => {
//       // overflow check
//       if (index + Number(duration) > timeSlots.length) return false;

//       const slotStart = timeToMinutes(slot);
//       const slotEnd = slotStart + Number(duration) * 60;

//       // ❌ overlap check
//       for (let booking of bookings) {
//         const existingStart = timeToMinutes(booking.slot);
//         const existingEnd =
//           existingStart + Number(booking.duration) * 60;

//         if (slotStart < existingEnd && slotEnd > existingStart) {
//           return false; // overlap found
//         }
//       }

//       return true;
//     });

//     res.json(availableSlots);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Slot fetch error" });
//   }
// };






// const Booking = require("../models/Booking");
// const BlockedSlot = require("../models/BlockedSlot");
// const timeSlots = require("../utils/timeSlots");

// // helper
// const timeToMinutes = (time) => {
//   const [t, modifier] = time.split(" ");
//   let [h, m] = t.split(":").map(Number);

//   if (modifier.toLowerCase() === "pm" && h !== 12) h += 12;
//   if (modifier.toLowerCase() === "am" && h === 12) h = 0;

//   return h * 60 + (m || 0);
// };

// exports.getAvailableSlots = async (req, res) => {
//   const { date, duration } = req.query;

//   if (!date || !duration  ) {
//     return res.status(400).json({ message: "Date, duration required" });
//   }

//   try {
//     const now = new Date();

//     // ✅ 1. USER BOOKINGS
//     const bookings = await Booking.find({
//       date,
//       duration,
//       $or: [
//         { status: "CONFIRMED" },
//         { status: "LOCKED", lockExpiresAt: { $gt: now } },
//       ],
//     });

//     // ✅ 2. ADMIN BLOCKED SLOTS
//     const blockedSlots = await BlockedSlot.find({
//       date,
//       duration,
//     });

//     const availableSlots = timeSlots.filter((slot, index) => {
//       if (index + Number(duration) > timeSlots.length) return false;

//       const slotStart = timeToMinutes(slot);
//       const slotEnd = slotStart + Number(duration) * 60;

//       // ❌ CHECK USER BOOKINGS
//       for (let b of bookings) {
//         const bs = timeToMinutes(b.slot);
//         const be = bs + b.duration * 60;
//         if (slotStart < be && slotEnd > bs) return false;
//       }

//       // ❌ CHECK ADMIN BLOCKS
//       for (let block of blockedSlots) {
//         const bs = timeToMinutes(block.slot);
//         const be = bs + block.duration * 60;
//         if (slotStart < be && slotEnd > bs) return false;
//       }

//       return true;
//     });

//     res.json(availableSlots);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Slot fetch failed" });
//   }
// };







// ------------------------------ FOR TESTING PURPOSE ---------------------------------------------------------

// const Booking = require("../models/Booking");
// const timeSlots = require("../utils/timeSlots");

// // helper
// const timeToMinutes = (time) => {
//   const [t, modifier] = time.split(" ");
//   let [h, m] = t.split(":").map(Number);

//   if (modifier.toLowerCase() === "pm" && h !== 12) h += 12;
//   if (modifier.toLowerCase() === "am" && h === 12) h = 0;

//   return h * 60 + (m || 0);
// };

// exports.getAvailableSlots = async (req, res) => {
//   const { date, duration, courtType } = req.query;

//   if (!date || !duration || !courtType) {
//     return res.status(400).json({ message: "Date, duration, courtType required" });
//   }

//   try {
//     const now = new Date();

//     // ✅ ONLY USER BOOKINGS
//     const bookings = await Booking.find({
//       date,
//       courtType,
//       $or: [
//         { status: "CONFIRMED" },
//         { status: "LOCKED", lockExpiresAt: { $gt: now } },
//       ],
//     });

//     const availableSlots = timeSlots.filter((slot, index) => {
//       if (index + Number(duration) > timeSlots.length) return false;

//       const slotStart = timeToMinutes(slot);
//       const slotEnd = slotStart + Number(duration) * 60;

//       // ❌ block if already booked
//       for (let b of bookings) {
//         const bs = timeToMinutes(b.slot);
//         const be = bs + b.duration * 60;
//         if (slotStart < be && slotEnd > bs) return false;
//       }

//       return true; // ✅ admin blocks ignored here
//     });

//     res.json(availableSlots);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Slot fetch failed" });
//   }
// };





const Booking = require("../models/Booking");
const BlockedSlot = require("../models/BlockedSlot");
const timeSlots = require("../utils/timeSlots");

// helper
const timeToMinutes = (time) => {
  const [t, modifier] = time.split(" ");
  let [h, m] = t.split(":").map(Number);

  if (modifier.toLowerCase() === "pm" && h !== 12) h += 12;
  if (modifier.toLowerCase() === "am" && h === 12) h = 0;

  return h * 60 + (m || 0);
};

exports.getAvailableSlots = async (req, res) => {
  const { date, duration, courtType } = req.query;

  if (!date || !duration || !courtType) {
    return res
      .status(400)
      .json({ message: "Date, duration, courtType required" });
  }

  try {
    const now = new Date();

    // ✅ USER BOOKINGS
    const bookings = await Booking.find({
      date,
      courtType,
      $or: [
        { status: "CONFIRMED" },
        { status: "LOCKED", lockExpiresAt: { $gt: now } },
      ],
    }).select("slot duration");

    // ✅ ADMIN BLOCKED SLOTS
    const blockedSlots = await BlockedSlot.find({
      date,
      courtType,
    }).select("slot duration isFullDay");

    // ✅ FILTER AVAILABLE SLOTS
    const availableSlots = timeSlots.filter((slot, index) => {
      if (index + Number(duration) > timeSlots.length) return false;

      const slotStart = timeToMinutes(slot);
      const slotEnd = slotStart + Number(duration) * 60;

      // ❌ CHECK USER BOOKINGS
      for (let b of bookings) {
        const bs = timeToMinutes(b.slot);
        const be = bs + b.duration * 60;
        if (slotStart < be && slotEnd > bs) return false;
      }

      // ❌ CHECK ADMIN BLOCKS
      for (let block of blockedSlots) {
        // full day block
        if (block.isFullDay) return false;

        const bs = timeToMinutes(block.slot);
        const be = bs + block.duration * 60;
        if (slotStart < be && slotEnd > bs) return false;
      }

      return true;
    });

    res.json(availableSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Slot fetch failed" });
  }
};

















