// const Booking = require("../models/Booking");
// const User = require("../models/User");

// exports.getDashboardStats = async (req, res) => {
//   try {
//     const totalBookings = await Booking.countDocuments();
//     const confirmedBookings = await Booking.countDocuments({ status: "CONFIRMED" });
//     const cancelledBookings = await Booking.countDocuments({ status: "CANCELLED" });
//     const totalUsers = await User.countDocuments();

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const todayBookings = await Booking.countDocuments({
//       createdAt: { $gte: today },
//     });

//     res.status(200).json({
//       success: true,
//       stats: {
//         totalBookings,
//         confirmedBookings,
//         cancelledBookings,
//         todayBookings,
//         totalUsers,
//       },
//     });
//   } catch (error) {
//     console.error("Admin dashboard error:", error);
//     res.status(500).json({ message: "Dashboard data fetch failed" });
//   }
// };



// // GET /api/admin/dashboard/home
// exports.getAdminDashboardHome = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const endToday = new Date();
//     endToday.setHours(23, 59, 59, 999);

//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

//     // ✅ Today bookings
//     const todayBookings = await Booking.countDocuments({
//       date: { $gte: today, $lte: endToday },
//       status: "confirmed"
//     });

//     // ✅ Today revenue
//     const todayRevenueAgg = await Booking.aggregate([
//       {
//         $match: {
//           date: { $gte: today, $lte: endToday },
//           status: "confirmed"
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: "$amountPaid" }
//         }
//       }
//     ]);

//     const todayRevenue = todayRevenueAgg[0]?.total || 0;

//     // ✅ Monthly revenue
//     const monthlyRevenueAgg = await Booking.aggregate([
//       {
//         $match: {
//           date: { $gte: startOfMonth },
//           status: "confirmed"
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: "$amountPaid" }
//         }
//       }
//     ]);

//     const monthlyRevenue = monthlyRevenueAgg[0]?.total || 0;

//     // ✅ Upcoming bookings
//     const upcomingBookings = await Booking.countDocuments({
//       date: { $gt: endToday },
//       status: "confirmed"
//     });

//     // 📈 Daily bookings (last 7 days)
//     const last7Days = new Date();
//     last7Days.setDate(today.getDate() - 6);

//     const dailyBookings = await Booking.aggregate([
//       {
//         $match: {
//           date: { $gte: last7Days },
//           status: "confirmed"
//         }
//       },
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m-%d", date: "$date" }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     // ⏱ Peak time slots
//     const peakSlots = await Booking.aggregate([
//       {
//         $match: { status: "confirmed" }
//       },
//       {
//         $group: {
//           _id: "$slot",
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { count: -1 } },
//       { $limit: 5 }
//     ]);

//     return res.status(200).json({
//       success: true,
//       stats: {
//         todayBookings,
//         todayRevenue,
//         monthlyRevenue,
//         upcomingBookings
//       },
//       charts: {
//         dailyBookings: dailyBookings.map(d => ({
//           date: d._id,
//           count: d.count
//         })),
//         peakSlots: peakSlots.map(p => ({
//           slot: p._id,
//           count: p.count
//         }))
//       }
//     });

//   } catch (error) {
//     console.error("Admin Dashboard Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to load admin dashboard"
//     });
//   }
// };











const Booking = require("../models/Booking");
const User = require("../models/User");

exports.getAdminDashboard = async (req, res) => {
  try {
    // ---------------- BASIC COUNTS ----------------
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: "CONFIRMED" });
    const cancelledBookings = await Booking.countDocuments({ status: "CANCELLED" });
    const totalUsers = await User.countDocuments();

    // ---------------- DATE SETUP ----------------
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endToday = new Date();
    endToday.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1
);

    // ---------------- TODAY BOOKINGS ----------------
    const Starttoday = new Date().toISOString().split("T")[0]; // "2026-02-01"

const todayBookings = await Booking.countDocuments({
  date: Starttoday,
  status: "CONFIRMED"
});


    // ----------- TODAY REVENUE ---------------------
  // TODAY START & END
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);

// AGGREGATION
//const Starttoday = new Date().toISOString().split("T")[0]; // "2026-02-01"

const todayRevenueAgg = await Booking.aggregate([
  {
    $match: {
      date: Starttoday,
      status: "CONFIRMED",
      paymentStatus: "PAID"
    }
  },
  {
    $group: {
      _id: null,
      total: { $sum: "$amount" }
    }
  }
]);

const todayRevenue =
  todayRevenueAgg.length > 0 ? todayRevenueAgg[0].total : 0;



  
    // ----------------- montly booking -------------------
    const monthlyRevenueAgg = await Booking.aggregate([
  {
    $match: {
      status: "CONFIRMED",   // ✅ exact match
      createdAt: { $gte: startOfMonth } // ✅ use Date field
    }
  },
  {
    $group: {
      _id: null,
      total: { $sum: "$amount" } // ✅ correct field
    }
  }
]);

const monthlyRevenue =
  monthlyRevenueAgg.length > 0 ? monthlyRevenueAgg[0].total : 0;


    // ---------------- UPCOMING BOOKINGS ----------------

const upcomingBookings = await Booking.countDocuments({
  date: { $gt: Starttoday },
  status: "CONFIRMED"
});




    // // ---------------- LAST 7 DAYS BOOKINGS ----------------
    // const last7Days = new Date();
    // last7Days.setDate(today.getDate() - 6);

    // const dailyBookings = await Booking.aggregate([
    //   {
    //     $match: {
    //       date: { $gte: last7Days },
    //       status: "CONFIRMED"
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         $dateToString: { format: "%Y-%m-%d", date: "$date" }
    //       },
    //       count: { $sum: 1 }
    //     }
    //   },
    //   { $sort: { _id: 1 } }
    // ]);

    // ---------------- LAST 7 DAYS BOOKINGS ----------------
const todays = new Date();
todays.setHours(23, 59, 59, 999);

const last7Days = new Date();
last7Days.setDate(todays.getDate() - 6);
last7Days.setHours(0, 0, 0, 0);

const dailyBookings = await Booking.aggregate([
  {
    // Convert string date -> Date
    $addFields: {
      bookingDate: {
        $dateFromString: {
          dateString: "$date"
        }
      }
    }
  },
  {
    $match: {
      bookingDate: {
        $gte: last7Days,
        $lte: todays
      },
      status: "CONFIRMED"
    }
  },
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$bookingDate"
        }
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);


    // ---------------- PEAK TIME SLOTS ----------------
    const peakSlots = await Booking.aggregate([
      { $match: { status: "CONFIRMED" } },
      {
        $group: {
          _id: "$slot",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // ---------------- FINAL RESPONSE ----------------
    res.status(200).json({
      success: true,
      stats: {
        totalBookings,
        confirmedBookings,
        cancelledBookings,
        todayBookings,
        totalUsers,
        todayRevenue,
        monthlyRevenue,
        upcomingBookings
      },
      charts: {
        dailyBookings: dailyBookings.map(d => ({
          date: d._id,
          count: d.count
        })),
        peakSlots: peakSlots.map(p => ({
          slot: p._id,
          count: p.count
        }))
      }
    });

  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard"
    });
  }
};
