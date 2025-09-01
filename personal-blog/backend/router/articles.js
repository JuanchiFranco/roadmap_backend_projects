const express = require('express');
const articlesController = require('../controllers/articlesController');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

// Ruta para obtener todos los elementos
router.get('/articles', articlesController.getAllArticles);

// Ruta para obtener un elemento por ID
router.get('/articles/:id', articlesController.getArticleById);

// Ruta para crear un nuevo artículo (solo administradores)
router.post('/articles', validateUser.isAdmin, articlesController.createArticle);

// Ruta para actualizar un artículo (solo administradores)
router.put('/articles/:id', validateUser.isAdmin, articlesController.updateArticle);

// Ruta para eliminar un artículo (solo administradores)
router.delete('/articles/:id', validateUser.isAdmin, articlesController.deleteArticle);

module.exports = router;

