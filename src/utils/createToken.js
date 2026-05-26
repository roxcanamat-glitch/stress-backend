const jwt = require("jsonwebtoken");

const createToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } // 👈 fijo por ahora
    );
};

module.exports = createToken;