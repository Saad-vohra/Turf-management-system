const express = require('express');
const cors = require('cors');
require("dotenv").config();
const path = require("path"); // ✅ ADD THIS


//NEW
//require("./utils/slotCleanup");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

//app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/slots", require("./routes/slotRoutes"));
app.use("/api/pricing", require("./routes/pricingRoutes"));

const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

//RAZORPAY INTEGRATION
app.use("/api/payment", require("./routes/paymentRoutes"));

// GENERATE TICKET GENERATION
//app.use("/tickets", express.static("tickets"));

// DOWNLOAD TICKET 
app.use("/tickets", express.static(path.join(__dirname, "tickets")));
//app.use("/tickets", express.static("tickets"));




// ADMIN SLOT BLOCK
app.use("/api/admin/slots", require("./routes/adminSlotRoutes"));


// ADMIN BOOKING MANAGEMENT
app.use("/api/admin/management", require("./routes/adminBookingRoutes"));


// ADMIN SETTING
app.use("/api/admin/settings", require("./routes/settingsRoutes"));


// ADMIN REPORTS
app.use("/api/admin",require("./routes/adminReportRoutes"));


















const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

