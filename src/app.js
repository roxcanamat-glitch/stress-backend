const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
    res.json({ message: 'Stress API funcionando 🚀' });
});

// Rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rutas de moods
const moodRoutes = require('./routes/moodRoutes');
app.use('/api/moods', moodRoutes);

module.exports = app;
