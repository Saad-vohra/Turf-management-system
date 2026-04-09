const Booking = require("../models/Booking");

// ==============================
// GET BOOKINGS (ADMIN)
// ==============================
exports.getAllBookings = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      date,
      fromDate,
      toDate,
      paymentStatus,
      checkedIn,
    } = req.query;

    const filter = {};

    // 🔹 Date filters
    if (date) filter.date = date;

    if (fromDate && toDate) {
      filter.date = { $gte: fromDate, $lte: toDate };
    }

    // 🔹 Payment filter
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    // 🔹 Checked-in filter
    if (checkedIn !== undefined) {
      filter.checkedIn = checkedIn === "true";
    }

    const skip = (page - 1) * limit;

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Booking.countDocuments(filter);

    res.json({
      bookings,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GET BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};



// ==============================
// MARK CHECK-IN
// ==============================
exports.markCheckedIn = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.checkedIn = true;
    await booking.save();

    res.json({
      message: "Booking marked as checked-in",
      booking,
    });
  } catch (err) {
    console.error("CHECK-IN ERROR:", err);
    res.status(500).json({ message: "Check-in failed" });
  }
};






// ==============================
// VIEW / DOWNLOAD TICKET
// ==============================
exports.getTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking || !booking.ticketPath) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.sendFile(booking.ticketPath, { root: "." });
  } catch (err) {
    console.error("TICKET ERROR:", err);
    res.status(500).json({ message: "Failed to load ticket" });
  }
};
