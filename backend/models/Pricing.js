const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
  {
    courtType: {
      type: String,
      enum: ["5v5", "7v7"],
      required: true,
      unique: true,
    },

    pricePerHour: {
      type: Number,
      required: true,
    },

    weekendPricePerHour: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pricing", pricingSchema);
