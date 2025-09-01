'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import authService from '../../../../app/api/services/auth/authService';

const Login = () => {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ 
        email: '', 
        password: '' 
    });

    const { login, isAuthenticated, loading, error: authError } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            // Obtener el token y decodificarlo para obtener el rol
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const decodedToken = jwtDecode(token);
                        // Store the token in localStorage
                        localStorage.setItem('token', token);
                        
                        if (decodedToken.role === 'admin') {
                            router.push('/admin');
                        } else {
                            router.push('/home');
                        }
                    } catch (error) {
                        console.error('Error decoding token:', error);
                        // Si hay error al decodificar, redirigir a home por defecto
                        router.push('/home');
                    }
                } else {
                    // Si no hay token, redirigir a home
                    router.push('/home');
                }
            }
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(error) setError(null);

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            await login(formData.email, formData.password);
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    // Only show loading state if we're actually checking auth state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }
    
    // If already authenticated, redirect to home
    if (isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Redirigiendo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                {error && !loading && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    ¿No tienes una cuenta? 
                    <Link href="/auth/register" className="text-blue-600 hover:underline ml-1">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    )
};

export default Login;