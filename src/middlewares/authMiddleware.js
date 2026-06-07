const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const header = req.headers.authorization || "";
        console.log("AUTH HEADER:", header); // 👈 AÑADE ESTO

        const [type, token] = header.split(" ");

        console.log("TYPE:", type);
        console.log("TOKEN:", token);

        if (type !== "Bearer" || !token) {
            return res.status(401).json({ error: "Token no proporcionado" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        console.log("DECODED TOKEN:", verifyToken); // 👈 IMPORTANTE

        req.user = { id: verifyToken.id };

        next();
    } catch (err) {
        console.log("AUTH ERROR:", err); // 👈 IMPORTANTE
        return res.status(401).json({ error: "Token no válido o expirado" });
    }
};

module.exports = auth;