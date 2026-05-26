const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const createToken = require("../utils/createToken")

// register
const register = async(req, res) => {
    try {
        const { nombre, email, password} = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ error: "Nombre, email y password son obligatorios" })
        }

        const newUser = await User.findOne({ email })

        if(newUser){
            return res.status(409).json({ error: "El email ya está registrado" })
        }

        const hashed = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
        const createUser = await User.create({ nombre, email, password: hashed })
        const token = createToken(createUser._id)

        return res.status(201).json ({
            user: {
                id: createUser._id,
                nombre: createUser.nombre,
                email: createUser.email,
            }, token
            })
    } catch (err) {
        console.log("LOGIN ERROR:", err);
    return res.status(500).json({ error: err.message });
    }
}

// login
const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // validación de los campos de entrada al login
        if(!email || !password) {
            return res.status(400).json({ error: "Email y password son obligatorios" })
        }

        // Buscar el usuario por email
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({ error: "Credenciales inválidas" })
        }

        // Comparar las contraseñas del usuario con las del req.body
        const passwordOk = await bcrypt.compare(password, user.password)

        if(!passwordOk) {
            return res.status(400).json({ error: "Credenciales inválidas"})
        }

        // Crear el token
        const token = createToken(user._id)

        // responder sin exponer la contraseña
        return res.status(200).json({
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
            }, token
        })

        } catch (err) {
            console.log("LOGIN ERROR:", err);
            return res.status(500).json({ error: "Error de servidor" })
        }
 }

 // get profile
const getProfile = async(req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password")

            if(!user) {
                return res.status(404).json({ error: "Usuario no encontrado"})
            }

            return res.status(200).json({ user })
} catch (err) {
    return res.status(500).json({ error: 'Error de servidor'})
}
}

module.exports = { register, login, getProfile }