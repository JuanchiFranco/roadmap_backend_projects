'use client';

import { useEffect, useState } from 'react';
import ArticleService from '../app/api/services/articles/articleService';

export function useArticles () {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await ArticleService.getArticles();
                setArticles(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getArticles();
    }, []);

    return { articles, loading, error };
}

export function useArticle (id) {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await ArticleService.getArticleById(id);
                setArticle(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getArticle();
    }, [id]);

    return { article, loading, error };
}

export function useCreateArticle () {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const createArticle = async (articleData) => {
        setIsLoading(true);
        try {
            const response = await ArticleService.createArticle(articleData);
            setSuccessMessage('Artículo creado exitosamente');
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { createArticle, isLoading, error, successMessage };
}

export function useUpdateArticle (id) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const updateArticle = async (articleData) => {
        setIsLoading(true);
        try {
            const response = await ArticleService.updateArticle(id, articleData);
            setSuccessMessage('Artículo actualizado exitosamente');
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { updateArticle, isLoading, error, successMessage };
}

export function useDeleteArticle (id) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const deleteArticle = async (id) => {
        setIsLoading(true);
        try {
            console.log('Deleting article with ID:', id);
            const response = await ArticleService.deleteArticle(id);
            setSuccessMessage('Artículo eliminado exitosamente');
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteArticle, isLoading, error, successMessage };
}