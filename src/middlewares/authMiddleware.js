const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const header = req.headers.authorization || "";
        const [type, token ] = header.split(" ") // "Bearer token"

        // si no hay Bearer o no hay token
         if (type !== "Bearer" || !token) {
            return res.status(401).json({ error: "Token no proporcionado" })
         }

         // sy hay token ---> verificamos el token
         const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
         req.user = { id: verifyToken.id }

        next() // pasamos a las rutas
    } catch (err) {
        return res.status(401).json({ error: "Token no válido o expirado"})
    }
}

module.exports = auth;