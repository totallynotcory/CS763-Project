// controllers/dailyEntryController.js
const DailyEntry = require("../models/DailyEntry");

// Enter daily data
exports.enterDailyData = async (req, res) => {
  try {
    // console.log("Request body: ", req.body);
    const { weight, steps, sleep, water, exercise, entryDate } = req.body;

    let lastEntry = await DailyEntry.find().sort({ dailyEntryId: -1 }).limit(1);
    let newEntryId = lastEntry.length > 0 ? lastEntry[0].dailyEntryId + 1 : 1;

    const newDailyEntry = new DailyEntry({
      dailyEntryId: newEntryId,
      userId: 10001, // TODO: Replace with logged-in user's ID
      // entryDate: new Date(), // Adjust according to your form logic
      entryDate: entryDate ? new Date(entryDate) : new Date(),
      weight,
      steps,
      sleep,
      water,
      exercise,
    });

    await newDailyEntry.save();
    res.status(201).json({ message: "Daily entry created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating daily entry" });
  }
};
