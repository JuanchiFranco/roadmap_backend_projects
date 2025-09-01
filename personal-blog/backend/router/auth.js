const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

module.exports = router;