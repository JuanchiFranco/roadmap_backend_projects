const jwt = require('jsonwebtoken');
process.loadEnvFile();

const SECRET_KEY = process.env.JWT_SECRET // Usa tu clave secreta real

if (!SECRET_KEY) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno.');
}

const validatorUser = {
    isAdmin: (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token no proporcionado.' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;

            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }
    }
}

module.exports = validatorUser;