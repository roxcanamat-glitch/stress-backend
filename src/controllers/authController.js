const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const createToken = require("../utils/createToken");

// REGISTER
const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ error: "Nombre, email y password son obligatorios" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: "El email ya está registrado" });
        }

        const hashed = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
        const newUser = await User.create({ nombre, email, password: hashed });
        const token = createToken(newUser._id);

        return res.status(201).json({
            user: {
                id: newUser._id,
                nombre: newUser.nombre,
                email: newUser.email,
            },
            token
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email y password son obligatorios" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        const passwordOk = await bcrypt.compare(password, user.password);

        if (!passwordOk) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        const token = createToken(user._id);

        return res.status(200).json({
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
            },
            token
        });

    } catch (err) {
        return res.status(500).json({ error: "Error de servidor" });
    }
};

// GET PROFILE
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.status(200).json({ user });

    } catch (err) {
        return res.status(500).json({ error: "Error de servidor" });
    }
};

module.exports = { register, login, getProfile };
