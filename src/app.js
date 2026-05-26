const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// AUTH
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// MOODS
const moodRoutes = require('./routes/moodRoutes');
app.use('/api/moods', moodRoutes);

module.exports = app;