// const Pricing = require("../models/Pricing");

// exports.calculatePrice = async (req, res) => {
//   const { courtType, duration, date } = req.body;

//   if (!courtType || !duration || !date) {
//     return res.status(400).json({ message: "Missing details" });
//   }

//   try {
//     const pricing = await Pricing.findOne({ courtType });

//     if (!pricing) {
//       return res.status(404).json({ message: "Pricing not found" });
//     }

//     const day = new Date(date).getDay();
//     const isWeekend = day === 0 || day === 6;

//     const perHourPrice = isWeekend
//       ? pricing.weekendPricePerHour
//       : pricing.pricePerHour;

//     const totalPrice = perHourPrice * duration;

//     res.json({
//       perHourPrice,
//       totalPrice,
//       isWeekend,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Price calculation error" });
//   }
// };





const Pricing = require("../models/Pricing");

// 🔹 USER / ADMIN PRICE CALCULATION
exports.calculatePrice = async (req, res) => {
  const { courtType, duration, date } = req.body;

  if (!courtType || !duration || !date) {
    return res.status(400).json({ message: "Missing details" });
  }

  try {
    const pricing = await Pricing.findOne({ courtType });

    if (!pricing) {
      return res.status(404).json({ message: "Pricing not found" });
    }

    const day = new Date(date).getDay(); // 0 = Sun, 6 = Sat
    const isWeekend = day === 0 || day === 6;

    const perHourPrice = isWeekend
      ? pricing.weekendPricePerHour
      : pricing.pricePerHour;

    const totalPrice = perHourPrice * duration;

    res.json({
      courtType,
      duration,
      isWeekend,
      perHourPrice,
      totalPrice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Price calculation error" });
  }
};

// 🔹 ADMIN – GET PRICING
exports.getPricing = async (req, res) => {
  const pricing = await Pricing.find();
  res.json(pricing);
};

// 🔹 ADMIN – UPDATE PRICING
exports.updatePricing = async (req, res) => {
  const { courtType, pricePerHour, weekendPricePerHour } = req.body;

  if (!courtType) {
    return res.status(400).json({ message: "courtType required" });
  }

  const pricing = await Pricing.findOneAndUpdate(
    { courtType },
    { pricePerHour, weekendPricePerHour },
    { new: true, upsert: true }
  );

  res.json({
    message: "Pricing updated",
    pricing,
  });
};
