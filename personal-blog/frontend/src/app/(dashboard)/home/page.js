'use client';

import React from 'react';

import { useArticles } from '../../../hooks/useArticles';
import Link from 'next/link';

const Dashboard = () => {
    const { articles, loading, error } = useArticles();

    return (
        <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col items-center gap-4 max-w-xl w-full mt-8">
                <h1 className="text-2xl font-bold mb-6">Artículos</h1>
                <ul>
                    {articles.map(article => (
                        <li
                            key={article.id}
                            className="mb-4 text-lg flex justify-between items-center"
                        >
                            <Link
                                href={`/article/${article.id}`}
                                className="hover:underline flex-1"
                            >
                                {article.title}
                            </Link>
                            <span className="text-gray-500 text-sm ml-24">
                                {new Date(article.createdAt).toLocaleDateString()}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;