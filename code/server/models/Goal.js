const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Progress Schema
const progressSchema = new Schema({
  date: { type: Date, required: true },
  value: { type: Number, required: true },
});

// Goal Schema
const goalSchema = new Schema({
  goalId: { type: Number, required: true },
  type: { type: String, required: true },
  targetValue: { type: Number, required: true },
  unit: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  progress: { type: [progressSchema], default: [] },  // Array of progress entries
  userId: { type: Number, required: false }
}, {
  collection: 'goals',  // Specify the collection name
});

module.exports = mongoose.model('Goal', goalSchema);