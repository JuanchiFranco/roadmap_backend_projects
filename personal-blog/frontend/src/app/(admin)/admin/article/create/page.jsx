'use client';

import { useState } from "react";
import { useCreateArticle } from "@/hooks/useArticles";
import { useRouter } from "next/navigation";

export default function CreateArticlePage() {
    const router = useRouter();
    const { createArticle, isLoading: isCreating, error: createError, successMessage } = useCreateArticle();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

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
            await createArticle(formData);

            // Reset form after successful creation
            setFormData({
                title: '',
                content: '',
            });

            // esperamos 3 segundos antes de redirigir
            setTimeout(() => {
                router.push('/admin');
            }, 3000);
        } catch (error) {
            console.error('Error al crear el artículo:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Crear Artículo</h1>
            
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    {successMessage}
                </div>
            )}
            {createError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    Error al crear el artículo
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
                        disabled={isCreating}
                    >
                        {isCreating ? 'Creando...' : 'Crear Artículo'}
                    </button>
                </div>
            </form>
        </div>
    );
}
