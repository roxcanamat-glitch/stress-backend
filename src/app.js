const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 👇 RUTA RAÍZ (NUEVA)
app.get('/', (req, res) => {
  res.json({
    message: 'Stress API funcionando 🚀'
  });
});

// AUTH
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// MOODS
const moodRoutes = require('./routes/moodRoutes');
app.use('/api/moods', moodRoutes);

module.exports = app;