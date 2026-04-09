// const PDFDocument = require("pdfkit");
// const QRCode = require("qrcode");
// const fs = require("fs");
// const path = require("path");

// module.exports = async function generateTicket(booking) {
//   const ticketDir = path.join(__dirname, "../tickets");
//   if (!fs.existsSync(ticketDir)) fs.mkdirSync(ticketDir);

//   const fileName = `ticket-${booking.bookingId}.pdf`;
//   const filePath = path.join(ticketDir, fileName);

//   const doc = new PDFDocument({ size: "A4", margin: 50 });
//   doc.pipe(fs.createWriteStream(filePath));

//   // 🔹 HEADER
//   doc.fontSize(20).text("TURF FOR CRICKET", { align: "center" });
//   doc.moveDown();

//   doc.fontSize(12);
//   doc.text(`Booking ID: ${booking.bookingId}`);
//   doc.text(`Name: ${booking.userName}`);
//   doc.text(`Date: ${booking.date}`);
//   doc.text(`Time: ${booking.slot}`);
//   doc.text(`Duration: ${booking.duration} hr`);
//   doc.text(`Amount Paid: ₹${booking.amount}`);
//   doc.text(`Status: CONFIRMED`);
//   doc.moveDown();

//   // 🔹 QR CODE DATA
//   const qrData = JSON.stringify({
//     bookingId: booking.bookingId,
//     name: booking.userName,
//     date: booking.date,
//     slot: booking.slot
//   });

//   const qrImage = await QRCode.toDataURL(qrData);
//   const qrBase64 = qrImage.replace(/^data:image\/png;base64,/, "");
//   const qrBuffer = Buffer.from(qrBase64, "base64");

//   doc.image(qrBuffer, { width: 150, align: "center" });

//   doc.moveDown();
//   doc.text("Booking confirmed! Our team will contact you shortly.", {
//     align: "center"
//   });

//   doc.end();

//   return `/tickets/${fileName}`;
// };







// const PDFDocument = require("pdfkit");
// const QRCode = require("qrcode");
// const fs = require("fs");
// const path = require("path");

// module.exports = async function generateTicket(booking) {
//   const ticketDir = path.join(__dirname, "../tickets");
//   if (!fs.existsSync(ticketDir)) fs.mkdirSync(ticketDir);

//   const fileName = `ticket-${booking.bookingId}.pdf`;
//   const filePath = path.join(ticketDir, fileName);

//   const doc = new PDFDocument({ size: "A4", margin: 50 });
//   doc.pipe(fs.createWriteStream(filePath));

//   // 🔹 HEADER
//   doc.fontSize(20).text("TURF FOR CRICKET", { align: "center" });
//   doc.moveDown();

//   doc.fontSize(12);
//   doc.text(`Booking ID: ${booking.bookingId}`);
//   doc.text(`Name: ${booking.userName}`);
//   doc.text(`Date: ${booking.date}`);
//   doc.text(`Time: ${booking.slot}`);
//   doc.text(`Duration: ${booking.duration} hr`);
//   doc.text(`Amount Paid: ₹${booking.amount}`);
//   doc.text(`Status: CONFIRMED`);
//   doc.moveDown();

//   // 🔹 QR CODE DATA
//   const qrData = JSON.stringify({
//     bookingId: booking.bookingId,
//     name: booking.userName,
//     date: booking.date,
//     slot: booking.slot
//   });

//   const qrImage = await QRCode.toDataURL(qrData);
//   const qrBase64 = qrImage.replace(/^data:image\/png;base64,/, "");
//   const qrBuffer = Buffer.from(qrBase64, "base64");

//   doc.image(qrBuffer, { width: 150, align: "center" });

//   doc.moveDown();
//   doc.text("Booking confirmed! Our team will contact you shortly.", {
//     align: "center"
//   });

//   doc.end();

//   return `/tickets/${fileName}`;
// };








// const PDFDocument = require("pdfkit");
// const QRCode = require("qrcode");
// const fs = require("fs");
// const path = require("path");

// module.exports = async function generateTicket(booking) {
//   const ticketDir = path.join(__dirname, "../tickets");

//   // ✅ Safe folder creation
//   if (!fs.existsSync(ticketDir)) {
//     fs.mkdirSync(ticketDir, { recursive: true });
//   }

//   const fileName = `ticket-${booking.bookingId}.pdf`;
//   const filePath = path.join(ticketDir, fileName);

//   const doc = new PDFDocument({ size: "A4", margin: 50 });
//   const stream = fs.createWriteStream(filePath);

//   doc.pipe(stream);

//   // 🔹 HEADER
//   doc.fontSize(20).text("TURF FOR CRICKET", { align: "center" });
//   doc.moveDown();

//   doc.fontSize(12);
//   doc.text(`Booking ID: ${booking.bookingId}`);
//   doc.text(`Name: ${booking.userName}`);
//   doc.text(`Date: ${booking.date}`);
//   doc.text(`Time: ${booking.slot}`);
//   doc.text(`Duration: ${booking.duration} hr`);
//   doc.text(`Amount Paid: ₹${booking.amount}`);
//   doc.text(`Status: CONFIRMED`);
//   doc.moveDown();

//   // 🔹 QR CODE DATA
//   const qrData = JSON.stringify({
//     bookingId: booking.bookingId,
//     name: booking.userName,
//     date: booking.date,
//     slot: booking.slot
//   });

//   const qrImage = await QRCode.toDataURL(qrData);
//   const qrBase64 = qrImage.replace(/^data:image\/png;base64,/, "");
//   const qrBuffer = Buffer.from(qrBase64, "base64");

//   doc.image(qrBuffer, {
//     width: 150,
//     align: "center"
//   });

//   doc.moveDown();
//   doc.text("Booking confirmed! Our team will contact you shortly.", {
//     align: "center"
//   });

//   doc.end();

//   // ✅ WAIT until PDF is fully written
//   await new Promise((resolve, reject) => {
//     stream.on("finish", resolve);
//     stream.on("error", reject);
//   });

//   // ✅ MUST return public path
//   return `/tickets/${fileName}`;
// };


// const PDFDocument = require("pdfkit");
// const QRCode = require("qrcode");
// const fs = require("fs");
// const path = require("path");

// module.exports = async function generateTicket(booking) {
//   const ticketDir = path.join(__dirname, "../tickets");
//   if (!fs.existsSync(ticketDir)) fs.mkdirSync(ticketDir);

//   const fileName = `ticket-${booking._id}.pdf`;
//   const filePath = path.join(ticketDir, fileName);

//   const doc = new PDFDocument({ size: "A4", margin: 50 });
//   doc.pipe(fs.createWriteStream(filePath));

//   doc.fontSize(20).text("Turf Booking Ticket", { align: "center" });
//   doc.moveDown();

//   doc.fontSize(12);
//   doc.text(`Booking ID: ${booking._id}`);
//   doc.text(`Name: ${booking.customer?.name}`);
//   doc.text(`Email: ${booking.customer?.email}`);
//   doc.text(`Phone: ${booking.customer?.phone}`);
//   doc.text(`Sport: ${booking.sport}`);
//   doc.text(`Date: ${booking.date}`);
//   doc.text(`Slot: ${booking.slot}`);
//   doc.text(`Duration: ${booking.duration} hr`);
//   doc.text(`Court Type: ${booking.courtType}`);
//   doc.text(`Total Amount: ₹${booking.finalAmount || booking.amount}`);
//   doc.text(`Status: CONFIRMED`);

//   doc.moveDown();

//   const qrData = JSON.stringify({
//     bookingId: booking._id,
//     date: booking.date,
//     slot: booking.slot,
//   });

//   const qrImage = await QRCode.toDataURL(qrData);
//   doc.image(Buffer.from(qrImage.split(",")[1], "base64"), {
//     width: 120,
//     align: "center",
//   });

//   doc.end();

//   return `/tickets/${fileName}`;
//    //return `/tickets/ticket-${booking._id}.txt`;

// };



















// const PDFDocument = require("pdfkit");
// const QRCode = require("qrcode");
// const fs = require("fs");
// const path = require("path");

// module.exports = async function generateTicket(booking) {
//   const ticketDir = path.join(__dirname, "../tickets");
//   if (!fs.existsSync(ticketDir)) fs.mkdirSync(ticketDir);

//   const fileName = `ticket-${booking._id}.pdf`;
//   const filePath = path.join(ticketDir, fileName);

//   const doc = new PDFDocument({ size: "A4", margin: 50 });
//   doc.pipe(fs.createWriteStream(filePath));

//   /* ================= HEADER ================= */
//   doc
//     .fontSize(22)
//     .font("Helvetica-Bold")
//     .text(" Turf Booking Ticket", { align: "center" });

//   doc.moveDown(0.5);

//   doc
//     .fontSize(10)
//     .font("Helvetica")
//     .fillColor("gray")
//     .text(`Booking ID: ${booking._id}`, { align: "center" });

//   doc.moveDown();

//   // Divider
//   doc
//     .moveTo(50, doc.y)
//     .lineTo(550, doc.y)
//     .strokeColor("#cccccc")
//     .stroke();

//   doc.moveDown();

//   /* ================= CUSTOMER INFO ================= */
//   doc
//     .fontSize(14)
//     .fillColor("#000")
//     .font("Helvetica-Bold")
//     .text("Customer Details");

//   doc.moveDown(0.5);

//   doc.font("Helvetica").fontSize(11);

//   doc.text(`Name: ${booking.customer?.name}`);
//   doc.text(`Email: ${booking.customer?.email}`);
//   doc.text(`Phone: ${booking.customer?.phone}`);

//   doc.moveDown();

//   /* ================= BOOKING INFO ================= */
//   doc
//     .fontSize(14)
//     .font("Helvetica-Bold")
//     .text("Booking Details");

//   doc.moveDown(0.5);

//   doc.font("Helvetica").fontSize(11);

//   doc.text(`Sport: ${booking.sport}`);
//   doc.text(`Date: ${booking.date}`);
//   doc.text(`Slot: ${booking.slot}`);
//   doc.text(`Duration: ${booking.duration} hr`);
//   doc.text(`Court Type: ${booking.courtType}`);

//   doc.moveDown();

//   /* ================= AMOUNT ================= */
//   doc
//     .font("Helvetica-Bold")
//     .fontSize(13)
//     .fillColor("#000")
//     .text(`Total Amount: Rs.${booking.finalAmount || booking.amount}`);

//   doc.moveDown();

//   /* ================= STATUS BADGE ================= */
//   doc
//     .fillColor("#1e7e34")
//     .font("Helvetica-Bold")
//     .fontSize(12)
//     .text(" CONFIRMED", {
//       align: "center",
//     });

//   doc.moveDown(2);

//   /* ================= QR SECTION ================= */
//   doc
//     .fontSize(12)
//     .fillColor("#000")
//     .font("Helvetica-Bold")
//     .text("Scan QR at Turf Entry", { align: "center" });

//   doc.moveDown();

//   const qrData = JSON.stringify({
//     bookingId: booking._id,
//     date: booking.date,
//     slot: booking.slot,
//   });

//   const qrImage = await QRCode.toDataURL(qrData);

//   // Center QR
//   const qrSize = 120;
//   const x = (doc.page.width - qrSize) / 2;

//   doc.image(Buffer.from(qrImage.split(",")[1], "base64"), x, doc.y, {
//     width: qrSize,
//   });

//   doc.y += qrSize + 20;
  


  


//   // doc.moveDown(6);

//   // /* ================= FOOTER ================= */
//   // doc
//   //   .fontSize(10)
//   //   .fillColor("gray")
//   //   .text("Thank you for booking with TurfPro!", {
//   //     align: "center",
//   //   });


//   doc.moveDown(3);

// doc
//   .fontSize(10)
//   .fillColor("gray")
//   .text("Thank you for booking with TurfPro!", {
//     align: "center",
//   });







//   doc.end();

//   return `/tickets/${fileName}`;
// };













const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = async function generateTicket(booking) {
  const ticketDir = path.join(__dirname, "../tickets");
  if (!fs.existsSync(ticketDir)) fs.mkdirSync(ticketDir);

  const fileName = `ticket-${booking._id}.pdf`;
  const filePath = path.join(ticketDir, fileName);

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(fs.createWriteStream(filePath));

  /* ================= GENERATE OTP ================= */
  /* ================= GENERATE OTP ================= */
const otp = booking._id.toString().slice(-6).toUpperCase();

  /* ================= HEADER ================= */
  doc
    .fontSize(22)
    .font("Helvetica-Bold")
    .text("Turf Booking Ticket", { align: "center" });

  doc.moveDown(0.5);

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor("gray")
    .text(`Booking ID: ${booking._id}`, { align: "center" });

  doc.moveDown();

  // Divider
  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor("#cccccc")
    .stroke();

  doc.moveDown();

  /* ================= CUSTOMER INFO ================= */
  doc
    .fontSize(14)
    .fillColor("#000")
    .font("Helvetica-Bold")
    .text("Customer Details");

  doc.moveDown(0.5);

  doc.font("Helvetica").fontSize(11);
  doc.text(`Name: ${booking.customer?.name}`);
  doc.text(`Email: ${booking.customer?.email}`);
  doc.text(`Phone: ${booking.customer?.phone}`);

  doc.moveDown();

  /* ================= BOOKING INFO ================= */
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Booking Details");

  doc.moveDown(0.5);

  doc.font("Helvetica").fontSize(11);
  doc.text(`Sport: ${booking.sport}`);
  doc.text(`Date: ${booking.date}`);
  doc.text(`Slot: ${booking.slot}`);
  doc.text(`Duration: ${booking.duration} hr`);
  doc.text(`Court Type: ${booking.courtType}`);

  doc.moveDown();

  /* ================= AMOUNT ================= */
  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#000")
    .text(`Total Amount: Rs.${booking.finalAmount || booking.amount}`);

  doc.moveDown();

  /* ================= STATUS ================= */
  doc
    .fillColor("#1e7e34")
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("CONFIRMED", { align: "center" });

  doc.moveDown(2);

  /* ================= OTP SECTION ================= */
  doc
    .fontSize(14)
    .fillColor("#000")
    .font("Helvetica-Bold")
    .text("ENTRY OTP", { align: "center" });

  doc.moveDown();

  doc
    .fontSize(28)
    .fillColor("#000")
    .font("Helvetica-Bold")
    .text(otp, {
      align: "center",
    });

  doc.moveDown(0.5);

  doc
    .fontSize(10)
    .fillColor("gray")
    .font("Helvetica")
    .text("Show this OTP at turf entry", {
      align: "center",
    });

  doc.moveDown(3);

  /* ================= FOOTER ================= */
  doc
    .fontSize(10)
    .fillColor("gray")
    .text("Thank you for booking with TurfPro!", {
      align: "center",
    });

  doc.end();

  return `/tickets/${fileName}`;
};














