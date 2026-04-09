const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    turfName: {
      type: String,
      default: "My Turf",
    },

    openingTime: {
      type: String, // "06:00 AM"
      default: "06:00 AM",
    },

    closingTime: {
      type: String, // "11:00 PM"
      default: "11:00 PM",
    },

    pricePerSlot: {
      type: Number,
      required: true,
      default: 1000,
    },

    contactPhone: {
      type: String,
    },

    contactEmail: {
      type: String,
    },

    address: {
      type: String,
    },

    termsAndConditions: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
