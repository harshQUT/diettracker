const express = require('express');
const { getGoal, setGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getGoal).post(protect, setGoal);

module.exports = router;
