const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any email service
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email app password
  },
});

async function sendTicketEmail(toEmail, booking, ticketPath) {
  try {
    // Full path of the PDF
    const fullTicketPath = path.join(__dirname, "../", ticketPath);

    const mailOptions = {
      from: `"Turf Booking" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Your Turf Booking Ticket 🎟️",
      text: `Hello ${booking.customer.name},

Your booking is confirmed! Please find your ticket attached.

Booking ID: ${booking._id}
Date: ${booking.date}
Slot: ${booking.slot}

Thank you for booking with us!`,
      attachments: [
        {
          filename: `ticket-${booking._id}.pdf`,
          path: fullTicketPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Ticket email sent to", toEmail);
  } catch (error) {
    console.error("Error sending ticket email:", error);
  }
}

module.exports = sendTicketEmail;
