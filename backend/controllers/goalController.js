const Goal = require('../models/Goal');

const getGoal = async (req, res) => {
    try {
        const goal = await Goal.findOne({ userId: req.user.id });
        if (!goal) return res.status(404).json({ message: 'No goal found' });
        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setGoal = async (req, res) => {
    const { dailyCalories, dailyProtein, dailyCarbs, dailyFat } = req.body;
    try {
        let goal = await Goal.findOne({ userId: req.user.id });
        if (goal) {
            goal.dailyCalories = dailyCalories;
            goal.dailyProtein = dailyProtein;
            goal.dailyCarbs = dailyCarbs;
            goal.dailyFat = dailyFat;
            await goal.save();
        } else {
            goal = await Goal.create({
                userId: req.user.id,
                dailyCalories, dailyProtein, dailyCarbs, dailyFat
            });
        }
        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getGoal, setGoal };
