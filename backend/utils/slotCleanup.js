// const cron = require("node-cron");
// const Booking = require("../models/Booking");

// cron.schedule("*/1 * * * *", async () => {
//   await Booking.deleteMany({
//     status: "LOCKED",
//     lockExpiresAt: { $lt: new Date() }
//   });

//   console.log("Expired slots cleared");
// });


// const cron = require("node-cron");
// const Booking = require("../models/Booking");

// cron.schedule("* * * * *", async () => {
//   const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

//   const expiredBookings = await Booking.find({
//     status: "PENDING",
//     paymentStatus: "PENDING",
//     createdAt: { $lt: tenMinutesAgo },
//   });

//   for (let booking of expiredBookings) {
//     booking.status = "CANCELLED";
//     booking.paymentStatus = "FAILED";
//     await booking.save();
//   }

//   if (expiredBookings.length > 0) {
//     console.log(`⏱️ Cancelled ${expiredBookings.length} expired bookings`);
//   }
// });
