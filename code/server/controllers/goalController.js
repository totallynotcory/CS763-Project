// controllers/goalController.js
const Goal = require('../models/Goal');

// Create a new goal
exports.createGoal = async (req, res) => {
  try {
    const { type, targetValue } = req.body;

    let lastGoal = await Goal.find().sort({ goalId: -1 }).limit(1);
    let newGoalId = lastGoal.length > 0 ? lastGoal[0].goalId + 1 : 1;

    let unit;
    switch (type) {
      case 'sleep': unit = 'hours'; break;
      case 'weight': unit = 'lbs'; break;
      case 'steps': unit = 'steps'; break;
      case 'water': unit = 'glasses'; break;
      case 'exercise': unit = 'minutes'; break;
      default: unit = 'unknown';
    }

    const newGoal = new Goal({ goalId: newGoalId, type, targetValue, unit });
    await newGoal.save();

    res.status(201).json({ message: 'New goal created successfully', goalId: newGoalId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create goal' });
  }
};