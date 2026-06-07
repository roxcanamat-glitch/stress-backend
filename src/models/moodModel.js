const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    ansiedad: {
        type: Number,
        required: true,
        min: 0,
        max: 24
    },

    estres: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },

    estadoAnimo: {
        type: String,
        required: true, 
        enum: ["Muy mal", "Mal", "Normal", "Bien", "Muy bien"]
    },

    notas: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Mood', moodSchema);