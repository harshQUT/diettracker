const Meal = require('../models/Meal');

const getMeals = async (req, res) => {
    try {
        const meals = await Meal.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addMeal = async (req, res) => {
    const { name, calories, protein, carbs, fat, mealType, date } = req.body;
    try {
        const meal = await Meal.create({
            userId: req.user.id,
            name, calories, protein, carbs, fat, mealType, date
        });
        res.status(201).json(meal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) return res.status(404).json({ message: 'Meal not found' });
        if (meal.userId.toString() !== req.user.id)
            return res.status(401).json({ message: 'Not authorized' });
        const updated = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) return res.status(404).json({ message: 'Meal not found' });
        if (meal.userId.toString() !== req.user.id)
            return res.status(401).json({ message: 'Not authorized' });
        await meal.deleteOne();
        res.json({ message: 'Meal removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMeals, addMeal, updateMeal, deleteMeal };
