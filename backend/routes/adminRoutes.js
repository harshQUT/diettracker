const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Meal = require('../models/Meal');
const { protect } = require('../middleware/authMiddleware');

router.get('/users', protect, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/meals', protect, async (req, res) => {
    try {
        const meals = await Meal.find().populate('userId', 'name email');
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/users/:id', protect, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
