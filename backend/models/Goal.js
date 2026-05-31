const mongoose = require('mongoose');
const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dailyCalories: { type: Number, required: true },
    dailyProtein: { type: Number, default: 0 },
    dailyCarbs: { type: Number, default: 0 },
    dailyFat: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Goal', goalSchema);
