const express = require('express')
const router = express.Router()

const { register, login, getProfile } = require('../controllers/authController')
const auth = require('../middlewares/authMiddleware')

console.log("AUTH:", typeof auth)
console.log("GETPROFILE:", typeof getProfile)

// rutas públicas
router.post('/register', register)
router.post('/login', login)

// rutas protegidas
router.get('/profile', auth, getProfile)

module.exports = router