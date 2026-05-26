const Mood = require('../models/moodModel');

// CREATE - nuevo registro emocional
const createMood = async (req, res) => {
    try {
        const { ansiedad, estres, estadoAnimo, notas } = req.body;

        const mood = await Mood.create({
            user: req.user.id, // 👈 viene del JWT
            ansiedad,
            estres,
            estadoAnimo,
            notas
        });

        return res.status(201).json(mood);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// READ - todos los moods del usuario logueado
const getMyMoods = async (req, res) => {
    try {
        const moods = await Mood.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        return res.status(200).json(moods);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// READ - un mood por ID (solo si es del usuario)
const getMoodById = async (req, res) => {
    try {
        const mood = await Mood.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!mood) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        return res.status(200).json(mood);

    } catch (err) {
        return res.status(400).json({ error: "ID inválido" });
    }
};

// UPDATE
const updateMood = async (req, res) => {
    try {
        const mood = await Mood.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            { new: true, runValidators: true }
        );

        if (!mood) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        return res.status(200).json(mood);

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// DELETE
const deleteMood = async (req, res) => {
    try {
        const mood = await Mood.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!mood) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        return res.status(200).json({ message: "Registro eliminado" });

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createMood,
    getMyMoods,
    getMoodById,
    updateMood,
    deleteMood
};