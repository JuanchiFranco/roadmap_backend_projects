import apiClient from '../../config/axios';
import { validateEmail } from '../../../../utils/validators';
import { sanitizeInput } from '../../../../utils/sanitizer';

const AuthService = {
    // Validación de datos
    validateCredentials(email, password) {
        if (!email || !password) {
            throw new Error('Email y contraseña son requeridos');
        }
        if (!validateEmail(email)) {
            throw new Error('Email no válido');
        }
        if (password.length < 8) {
            throw new Error('La contraseña debe tener al menos 8 caracteres');
        }
    },

    // Sanitización de datos
    sanitizeData(data) {
        return {
            username: data.username ? sanitizeInput(data.username) : undefined,
            email: sanitizeInput(data.email),
            password: sanitizeInput(data.password)
        };
    },

    // Validación de token
    validateToken(token) {
        if (!token) {
            throw new Error('Token no proporcionado');
        }
        if (typeof token !== 'string') {
            throw new Error('Token debe ser una cadena de texto');
        }
        // Aquí podrías agregar más validaciones específicas del token
    },

    async register(username, email, password) {
        try {
            // Validar y sanitizar datos
            this.validateCredentials(email, password);
            const sanitizedData = this.sanitizeData({ username, email, password });

            const response = await apiClient.post('/auth/register', sanitizedData);

            if (response.data?.token) {
                // Validar token antes de guardar
                this.validateToken(response.data.token);
                // Usar secure storage en lugar de localStorage
                localStorage.setItem('token', response.data.token);
            }

            return { token: response.data.token };
        } catch (error) {
            // Manejo de errores específico
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Error al registrar usuario');
        }
    },

    async login(email, password) {
        try {
            // Validar y sanitizar datos
            this.validateCredentials(email, password);
            const sanitizedData = this.sanitizeData({ email, password });

            const response = await apiClient.post('/auth/login', sanitizedData);

            if (response.data?.user?.token) {
                // Validar token antes de guardar
                this.validateToken(response.data.user.token);
                // Usar secure storage en lugar de localStorage
                localStorage.setItem('token', response.data.user.token);
            }

            return { token: response.data.user.token };
        } catch (error) {
            // Manejo de errores específico
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Error al iniciar sesión');
        }
    },

    checkAuth() {
        if (typeof window === 'undefined') {
            return null;
        }
        
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            // Validar token antes de usarlo
            this.validateToken(token);
            return { token };
        } catch (error) {
            // Si el token es inválido, limpiar el storage
            this.logout();
            return null;
        }
    },

    logout() {
        // Limpiar todos los datos de autenticación
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // Aquí podrías agregar más limpieza de datos si es necesario
    },

    // Verificar si el usuario está autenticado
    isAuthenticated() {
        return !!this.checkAuth();
    }
};

export default AuthService;