'use client';

import React from 'react';
import { useArticles, useDeleteArticle } from '../../../hooks/useArticles';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const { articles, loading, error } = useArticles();
    const { isAuthenticated, user } = useAuth();
    const [showError, setShowError] = useState(false);
    const router = useRouter();
    const { deleteArticle } = useDeleteArticle();

    const handleRefresh = () => {
        window.location.reload();
    };

    useEffect(() => {
        if (!isAuthenticated) {
            setShowError(true);
        } else if (user?.role !== 'admin') {
            setShowError(true);
        } else {
            setShowError(false);
        }
    }, [isAuthenticated, user, router]);

    if (showError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-700">No tienes permisos para acceder a esta página.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col items-center gap-4 max-w-xl w-full mt-8">
                <h1 className="text-4xl font-bold">Panel de Administración</h1>
                <div className="w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Artículos</h2>
                        <Link
                            href="/admin/article/create"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Nuevo Artículo
                        </Link>
                    </div>
                    {loading && <p>Cargando...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && articles.length === 0 && (
                        <p>No hay artículos disponibles.</p>
                    )}
                    <ul className="space-y-4">
                        {articles.map((article) => (
                            <li key={article.id} className="flex justify-between items-center p-4 bg-white rounded shadow">
                                <div className="flex-1">
                                    <h3 className="font-semibold">{article.title}</h3>
                                    <p className="text-gray-600">{article.createdAt}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={`/admin/article/edit/${article.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
                                                deleteArticle(article.id)
                                                    .then(() => {
                                                        handleRefresh();
                                                    })
                                                    .catch(err => {
                                                        console.error('Error deleting article:', err);
                                                    });
                                            }
                                        }}
                                        className="text-red-600 hover:underline"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;