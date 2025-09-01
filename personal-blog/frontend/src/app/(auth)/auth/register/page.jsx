'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../../hooks/useAuth';

const Register = () => {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { register, isAuthenticated, loading, error: authError } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            // Redirect the user to the home page or dashboard after registration
            router.push('/home');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (error) setError(null);
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;
        
        if (!username || !email || !password || !confirmPassword) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        try {
            await register(username, email, password);
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    // Only show loading state if we're actually checking auth state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Cargando...</p>
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
                <h2 className="text-2xl font-bold mb-6 text-center">Registrarse en el Blog</h2>
                <p className="text-gray-600 mb-4 text-center">Por favor, completa el formulario para crear una cuenta.</p>
                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors`}
                    >
                        {loading ? 'Cargando...' : 'Registrarse'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    ¿Ya tienes una cuenta?
                    <Link href="/auth/login" className="text-blue-600 hover:underline ml-1">Inicia sesión aquí</Link> 
                </p>
            </div>
        </div>
    )
}

export default Register;