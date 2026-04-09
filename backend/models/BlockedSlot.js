const mongoose = require("mongoose");

const blockedSlotSchema = new mongoose.Schema(
  {
    date: {
      type: String, // "2026-01-24"
      required: true,
    },

    slot: {
      type: String, // "10:00 AM"
      required: true,
    },

    duration: {
      type: Number, // hours
      required: true,
    },

    courtType: {
      type: String, // 5v5 / 7v7
      required: true,
    },

    reason: {
      type: String,
      default: "Maintenance / Admin Block",
    },
    isFullDay: { type: Boolean, default: false },
  },
  
  { timestamps: true }
);

blockedSlotSchema.index(
  { date: 1, slot: 1, courtType: 1 },
  { unique: true }
);

module.exports = mongoose.model("BlockedSlot", blockedSlotSchema);
