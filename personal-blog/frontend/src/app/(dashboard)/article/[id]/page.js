'use client';

import { useParams } from "next/navigation";

import { useArticle } from "@/hooks/useArticles";

export default function ArticlePage() {
    const params = useParams();
    const { id } = params;

    const { article, isLoading, error } = useArticle(id);

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
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{article.title}</h1>
            <p className="text-sm text-gray-500 mb-6">{new Date(article.createdAt).toLocaleDateString()}</p>
            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </div>
    );
}