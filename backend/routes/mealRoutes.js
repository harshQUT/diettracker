const express = require('express');
const { getMeals, addMeal, updateMeal, deleteMeal } = require('../controllers/mealController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getMeals).post(protect, addMeal);
router.route('/:id').put(protect, updateMeal).delete(protect, deleteMeal);

module.exports = router;
