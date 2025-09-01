const service = require('../services/articleService');

const articlesController = {
    async getAllArticles(req, res) {
        try {
            const articles = await service.getAllArticles();
            res.status(200).json(articles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getArticleById(req, res) {
        const { id } = req.params;
        try {
            const article = await service.getArticleById(id);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            res.status(200).json(article);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createArticle(req, res) {
        const { title, content } = req.body;

        // validamos que los campos requeridos estén presentes
        if (!title || !content) {
            return res.status(400).json({ message: 'El título y el contenido son obligatorios' });
        }

        try {
            const newArticle = await service.createArticle({ title, content });
            res.status(201).json(newArticle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateArticle(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;

        // validamos que los campos requeridos estén presentes
        if (!title || !content) {
            return res.status(400).json({ message: 'El título y el contenido son obligatorios' });
        }

        try {
            const updatedArticle = await service.updateArticle(id, { title, content });
            if (!updatedArticle) {
                return res.status(404).json({ message: 'Artículo no encontrado' });
            }
            res.status(200).json(updatedArticle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteArticle(req, res) {
        const { id } = req.params;

        try {
            const deletedArticle = await service.deleteArticle(id);
            if (!deletedArticle) {
                return res.status(404).json({ message: 'Artículo no encontrado' });
            }
            res.status(200).json({ message: 'Artículo eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = articlesController;