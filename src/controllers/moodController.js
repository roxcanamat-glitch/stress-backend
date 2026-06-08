const Mood = require('../models/moodModel');
const validateMood = require('../validators/moodValidator');

// CREATE
// const createMood = async (req, res) => {
//     try {
//         const error = validateMood(req.body);

//         if (error) {
//             return res.status(400).json({ error });
//         }

const createMood = async (req, res) => {
    try {

        console.log("BODY RECIBIDO:", req.body);

        const error = validateMood(req.body);

        if (error) {
            console.log("ERROR VALIDATOR:", error);
            return res.status(400).json({ error });
        }

        // 🔥 AQUÍ AÑADES DEBUG IMPORTANTE
        console.log("🧠 BODY RECIBIDO:", req.body);
        console.log("👤 USER:", req.user);

console.log("BODY FINAL:", req.body);
console.log("TIPOS:", {
  ansiedad: typeof req.body.ansiedad,
  estadoAnimo: req.body.estadoAnimo
});

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const { ansiedad, estadoAnimo, notas } = req.body;

        // 🔥 AQUÍ TAMBIÉN ES BUENO VERLO
        console.log("📊 VALORES EXTRAÍDOS:", {
            ansiedad,
            estadoAnimo,
            notas
        });

        const mood = await Mood.create({
            user: req.user.id,
            ansiedad,
           /* estres: 0, */
            estadoAnimo,
            notas
        });

        return res.status(201).json(mood);

    } catch (err) {
        // 🔥 ESTE ES EL MÁS IMPORTANTE
        console.log("🔥 ERROR CREATE MOOD:", err);
        console.log("STACK:", err.stack);

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