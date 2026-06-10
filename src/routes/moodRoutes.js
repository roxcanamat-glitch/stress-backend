const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const {
    createMood,
    getMyMoods,
    getMoodById,
    updateMood,
    deleteMood
} = require('../controllers/moodController');

// Todas las rutas están protegidas con JWT
router.post('/',    auth, createMood);
router.get('/',     auth, getMyMoods);
router.get('/:id',  auth, getMoodById);
router.put('/:id',  auth, updateMood);
router.delete('/:id', auth, deleteMood);

module.exports = router;
