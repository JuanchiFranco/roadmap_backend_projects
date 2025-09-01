import apiClient from '../../config/axios';
import { ERROR_TYPES, ERROR_MESSAGES } from '../errors/errorTypes';
import ApiError from '../errors/ApiError';

const ArticleService = {
    async getArticles() {
        try {
            const response = await apiClient.get('/articles');
            if (!response.data?.articles) {
                throw new ApiError(ERROR_TYPES.NOT_FOUND, ERROR_MESSAGES[ERROR_TYPES.NOT_FOUND], { endpoint: '/articles' });
            }
            return response.data.articles;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async getArticleById(id) {
        try {
            const response = await apiClient.get(`/articles/${id}`);
            if (!response.data) {
                throw new ApiError(ERROR_TYPES.NOT_FOUND, ERROR_MESSAGES[ERROR_TYPES.NOT_FOUND], { endpoint: `/articles/${id}` });
            }
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async createArticle(articleData) {
        try {
            const response = await apiClient.post('/articles', articleData);
            if (response.status!= 201) {
                throw new ApiError(ERROR_TYPES.VALIDATION, ERROR_MESSAGES[ERROR_TYPES.VALIDATION], { endpoint: '/articles' });
            }
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async updateArticle(id, articleData) {
        try {
            const response = await apiClient.put(`/articles/${id}`, articleData);
            if (response.status !==200) {
                throw new ApiError(ERROR_TYPES.VALIDATION, ERROR_MESSAGES[ERROR_TYPES.VALIDATION], { endpoint: `/articles/${id}` });
            }
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async deleteArticle(id) {
        try {
            const response = await apiClient.delete(`/articles/${id}`,
                { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` } }
            );
            if (!response.data?.message) {
                throw new ApiError(ERROR_TYPES.VALIDATION, ERROR_MESSAGES[ERROR_TYPES.VALIDATION], { endpoint: `/articles/${id}` });
            }
            return response.data.message;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    handleError(error) {
        const { ERROR_TYPES, ERROR_MESSAGES } = this;
        
        if (error instanceof ApiError) {
            return error;
        }

        if (!error.response) {
            return new ApiError(ERROR_TYPES.NETWORK, ERROR_MESSAGES[ERROR_TYPES.NETWORK], { 
                status: error.code,
                message: error.message 
            });
        }

        const { status, data } = error.response;
        
        switch (status) {
            case 401:
                return new ApiError(ERROR_TYPES.AUTH, ERROR_MESSAGES[ERROR_TYPES.AUTH], { 
                    status,
                    details: data?.message || 'Unauthorized' 
                });
            case 404:
                return new ApiError(ERROR_TYPES.NOT_FOUND, ERROR_MESSAGES[ERROR_TYPES.NOT_FOUND], { 
                    status,
                    details: data?.message || 'Resource not found' 
                });
            case 422:
                return new ApiError(ERROR_TYPES.VALIDATION, ERROR_MESSAGES[ERROR_TYPES.VALIDATION], { 
                    status,
                    details: data?.errors || 'Invalid data' 
                });
            default:
                if (status >= 500) {
                    return new ApiError(ERROR_TYPES.SERVER, ERROR_MESSAGES[ERROR_TYPES.SERVER], { 
                        status,
                        details: data?.message || 'Server error' 
                    });
                }
                return new ApiError(ERROR_TYPES.UNKNOWN, ERROR_MESSAGES[ERROR_TYPES.UNKNOWN], { 
                    status,
                    details: data?.message || 'Unknown error' 
                });
        }
    }
}

export default ArticleService;