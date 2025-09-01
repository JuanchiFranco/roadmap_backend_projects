'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import authService from '../app/api/services/auth/authService';
import { jwtDecode } from 'jwt-decode';

export function useAuth() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authData = authService.checkAuth();

                if (authData?.token) {
                    setIsAuthenticated(true);
                    try {
                        // Decode token to get user info
                        const decodedToken = jwtDecode(authData.token);
                        setUser(decodedToken);    
                    } catch (decodeError) {
                        console.error('Error decoding token:', decodeError);
                        setIsAuthenticated(false);
                        setUser(null);
                    }
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (err) {
                console.error('Auth check error:', err);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const register = useCallback(async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.register(username, email, password);
            if (response.token) {
                localStorage.setItem('token', response.token);
                setIsAuthenticated(true);
                const decodedToken = jwtDecode(response.token);
                setUser(decodedToken);
            }
            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Error during registration';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(email, password);
            if (response.token) {
                localStorage.setItem('token', response.token);
                setIsAuthenticated(true);
                const decodedToken = jwtDecode(response.token);
                setUser(decodedToken);
            }
            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Error during login';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setIsAuthenticated(false);
        navigate.push('/auth/login');
    }, [navigate]);

    return {
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        register,
        user,
    };
}