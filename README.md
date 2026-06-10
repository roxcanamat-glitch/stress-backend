Stress App — Backend
API REST desarrollada con Node.js, Express y MongoDB Atlas para la aplicación de evaluación de ansiedad Stress App.
🚀 Deploy
La API está desplegada en Render y accesible en:
https://stress-backend-v64j.onrender.com

🛠️ Tecnologías utilizadas
    • Node.js — entorno de ejecución 
    • Express — framework para crear el servidor y las rutas 
    • MongoDB Atlas — base de datos en la nube 
    • Mongoose — para conectar y trabajar con MongoDB desde Node.js 
    • JWT (jsonwebtoken) — para la autenticación de usuarios 
    • bcrypt — para encriptar las contraseñas 
    • dotenv — para gestionar las variables de entorno 
    • cors — para permitir las peticiones desde el frontend 

📁 Estructura del proyecto
backend/
└── backend/          ← código fuente (ver nota sobre duplicidad)
    ├── src/
    │   ├── app.js                  # Configuración de Express y rutas
    │   ├── server.js               # Arranque del servidor
    │   ├── config/                 # Conexión a MongoDB
    │   ├── controllers/
    │   │   ├── authController.js   # Registro e inicio de sesión
    │   │   └── moodController.js   # CRUD de resultados del test
    │   ├── middlewares/
    │   │   └── authMiddleware.js   # Verificación del token JWT
    │   ├── models/
    │   │   ├── userModel.js        # Modelo de usuario
    │   │   └── moodModel.js        # Modelo de resultado del test
    │   ├── routes/
    │   │   ├── authRoutes.js       # Rutas de autenticación
    │   │   └── moodRoutes.js       # Rutas de resultados
    │   ├── validators/
    │   │   └── moodValidator.js    # Validación de datos del test
    │   └── utils/
    │       └── createToken.js      # Generación del token JWT
    ├── .env                        # Variables de entorno (no subir a GitHub)
    ├── .gitignore
    └── package.json

📡 Endpoints de la API
Autenticación
Método	Endpoint	Descripción
POST	/api/auth/register	Registrar un nuevo usuario
POST	/api/auth/login	Iniciar sesión y obtener token
Resultados del test (requieren token JWT)
Método	Endpoint	Descripción
POST	/api/moods	Guardar un nuevo resultado
GET	/api/moods	Obtener todos los resultados del usuario
GET	/api/moods/:id	Obtener un resultado por ID
PUT	/api/moods/:id	Actualizar un resultado
DELETE	/api/moods/:id	Eliminar un resultado

🔐 Autenticación
La API usa JWT (JSON Web Token). Para acceder a las rutas protegidas hay que incluir el token en el header de la petición:
Authorization: Bearer <token>
El token se obtiene al hacer login o registro.

⚙️ Variables de entorno
Crea un archivo .env en la raíz del backend con estas variables:
PORT=5000
MONGO_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=tu_secreto_jwt
BCRYPT_SALT_ROUNDS=10

💻 Instalación y uso en local
1. Clona el repositorio:
git clone https://github.com/roxcanamat-glitch/stress-app-backend.git
cd stress-app-backend
2. Instala las dependencias:
npm install
3. Crea el archivo .env con las variables indicadas arriba.
4. Arranca el servidor:
npm run dev
El servidor estará disponible en http://localhost:5000

📮 Documentación Postman
La colección de Postman con todos los endpoints documentados está disponible en la entrega del proyecto.

## ⚠️ Nota sobre la estructura de carpetas

Durante el desarrollo del proyecto se generó una carpeta duplicada,
resultando en una estructura anidada (backend/backend/).

Esta duplicidad fue detectada durante el desarrollo pero no se corrigió
para evitar romper el deploy activo en Render, ya que mover los archivos
hubiera requerido reconfigurar el servicio de despliegue.

Es una mejora pendiente para futuras versiones del proyecto.

👤 Autor
Desarrollado por Christian Lozano como Proyecto Final del Máster en Web Development Fullstack — Neoland.
