const Mood = require('../models/moodModel');
const validateMood = require('../validators/moodValidator');

// CREATE
const createMood = async (req, res) => {
    try {
        const error = validateMood(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const { ansiedad, estadoAnimo, notas } = req.body;

        const mood = await Mood.create({
            user: req.user.id,
            ansiedad,
            estadoAnimo,
            notas
        });

        return res.status(201).json(mood);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// READ - todos los moods del usuario
const getMyMoods = async (req, res) => {
    try {
        const moods = await Mood.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        return res.status(200).json(moods);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// READ - por ID
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
        const error = validateMood(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

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
