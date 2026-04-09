const Booking = require("../models/Booking");
const { Parser } = require("json2csv");
const ExcelJS = require("exceljs");

exports.getReports = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    let filter = {};

    if (fromDate && toDate) {
      filter.date = {
        $gte: fromDate,
        $lte: toDate,
      };
    }

    // ✅ FETCH DATA
    const bookings = await Booking.find(filter);

    // 🔥 BASIC STATS
    const totalBookings = bookings.length;

    const confirmedBookings = bookings.filter(
      (b) => b.status === "CONFIRMED"
    ).length;

    const cancelledBookings = bookings.filter(
      (b) => b.status === "CANCELLED"
    ).length;

    const totalRevenue = bookings.reduce(
      (sum, b) => sum + (b.finalAmount || b.amount || 0),
      0
    );

    // 🔥 DAILY CHART
    const dailyData = {};

    bookings.forEach((b) => {
      if (!dailyData[b.date]) {
        dailyData[b.date] = {
          date: b.date,
          bookings: 0,
          revenue: 0,
        };
      }

      dailyData[b.date].bookings += 1;
      dailyData[b.date].revenue += b.finalAmount || b.amount || 0;
    });

    const chartData = Object.values(dailyData);

    // ✅🔥 ADD THIS HERE (INSIDE FUNCTION)

    const onlineBookingsList = bookings.filter(
      (b) => b.bookingType === "ONLINE"
    );

    const offlineBookingsList = bookings.filter(
      (b) => b.bookingType === "OFFLINE"
    );

    const onlineBookings = onlineBookingsList.length;
    const offlineBookings = offlineBookingsList.length;

    const onlineRevenue = onlineBookingsList.reduce(
      (sum, b) => sum + (b.finalAmount || b.amount || 0),
      0
    );

    const offlineRevenue = offlineBookingsList.reduce(
      (sum, b) => sum + (b.finalAmount || b.amount || 0),
      0
    );

    // ✅ FINAL RESPONSE
    res.json({
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      totalRevenue,
      chartData,
      bookings,

      // 🔥 NEW DATA
      onlineBookings,
      offlineBookings,
      onlineRevenue,
      offlineRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



exports.exportCSV = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    let filter = {};

    if (fromDate && toDate) {
      filter.date = {
        $gte: fromDate,
        $lte: toDate,
      };
    }

    const bookings = await Booking.find(filter);

    const data = bookings.map((b) => ({
      Date: b.date,
      Slot: b.slot,
      Duration: b.duration,
      Court: b.courtType,
      Amount: b.finalAmount || b.amount,
      Status: b.status,
      Payment: b.paymentStatus,
      Customer: b.customer?.name,
    }));

    const { Parser } = require("json2csv");
    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("filtered_bookings.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "CSV export failed" });
  }
};




exports.exportExcel = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    let filter = {};

    if (fromDate && toDate) {
      filter.date = {
        $gte: fromDate,
        $lte: toDate,
      };
    }

    const bookings = await Booking.find(filter);

    const ExcelJS = require("exceljs");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Filtered Bookings");

    worksheet.columns = [
      { header: "Date", key: "date" },
      { header: "Slot", key: "slot" },
      { header: "Court", key: "courtType" },
      { header: "Amount", key: "amount" },
      { header: "Status", key: "status" },
      { header: "Payment", key: "paymentStatus" },
      { header: "Customer", key: "customer" },
    ];

    bookings.forEach((b) => {
      worksheet.addRow({
        date: b.date,
        slot: b.slot,
        courtType: b.courtType,
        amount: b.finalAmount || b.amount,
        status: b.status,
        paymentStatus: b.paymentStatus,
        customer: b.customer?.name,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=filtered_bookings.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: "Excel export failed" });
  }
};












// // ONLINE
// const onlineBookingsList = bookings.filter(
//   (b) => b.bookingType === "ONLINE"
// );

// // OFFLINE
// const offlineBookingsList = bookings.filter(
//   (b) => b.bookingType === "OFFLINE"
// );

// // COUNT
// const onlineBookings = onlineBookingsList.length;
// const offlineBookings = offlineBookingsList.length;

// // REVENUE
// const onlineRevenue = onlineBookingsList.reduce(
//   (sum, b) => sum + (b.finalAmount || b.amount),
//   0
// );

// const offlineRevenue = offlineBookingsList.reduce(
//   (sum, b) => sum + (b.finalAmount || b.amount),
//   0
// );