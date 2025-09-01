const service = require('../services/authService');

const authController = {
    async register(req, res) {
        const { email, password, username } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Los campos email y password son obligatorios' });
        }

        try {
            const user = await service.register(username, email, password);
            res.status(201).json({ message: 'Usuario registrado exitosamente', user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await service.login(email, password);
            res.status(200).json({ message: 'Inicio de sesión exitoso', user });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = authController;