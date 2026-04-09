const Settings = require("../models/Settings");

// GET SETTINGS
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

// UPDATE SETTINGS (ADMIN)
exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(updates);
    } else {
      Object.assign(settings, updates);
      await settings.save();
    }

    res.json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update settings" });
  }
};
