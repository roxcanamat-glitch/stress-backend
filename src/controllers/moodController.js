const Mood = require('../models/moodModel');

const createMood = async (req, res) => {
    try {
        console.log("REQ USER:", req.user);
        console.log("REQ BODY:", req.body);

        const { ansiedad, estres, estadoAnimo, notas } = req.body;

        const mood = await Mood.create({
            user: req.user.id,
            ansiedad,
            estres,
            estadoAnimo,
            notas
        });

        return res.status(201).json(mood);

    } catch (err) {
        console.log("ERROR CREATE MOOD:", err);
        return res.status(500).json({ error: err.message });
    }
};

// resto de funciones...
const getMyMoods = ...
const getMoodById = ...
const updateMood = ...
const deleteMood = ...

module.exports = {
    createMood,
    getMyMoods,
    getMoodById,
    updateMood,
    deleteMood
};