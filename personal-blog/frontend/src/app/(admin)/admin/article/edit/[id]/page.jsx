'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useArticle, useUpdateArticle } from "@/hooks/useArticles";

export default function EditArticlePage() {
    const params = useParams();
    const { id } = params;
    const { article, isLoading, error } = useArticle(id);
    const { updateArticle, isLoading: isUpdating, error: updateError, successMessage } = useUpdateArticle(id);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (article) {
            setFormData({
                title: article.title,
                content: article.content,
            });
        }
    }, [article]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateArticle(formData);

            
        } catch (error) {
            console.error('Error al actualizar el artículo:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <div className="flex items-center justify-center">
                    <svg
                        className="animate-spin h-10 w-10 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                        ></path>
                    </svg>
                    <span className="ml-2 text-lg text-gray-900">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) return <div className="text-center mt-10 text-red-500">Error al cargar el artículo.</div>;
    if (!article) return <div className="text-center mt-10 text-gray-400">No se encontró el artículo.</div>;

    return (
        <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Editar Artículo</h1>
            
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    {successMessage}
                </div>
            )}
            {updateError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    Error al actualizar el artículo
                </div>
            )}

            <form onSubmit={handleSubmit} className="w-full max-w-2xl">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Título
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Contenido
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows="10"
                    ></textarea>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Actualizando...' : 'Actualizar Artículo'}
                    </button>
                </div>
            </form>
        </div>
    );
}