'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Image from 'next/image';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <Image
                            src="/logo.svg"
                            className="h-8 mr-3"
                            alt="Logo Personal Blog"
                            width={32}
                            height={32}
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Personal Blog</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        {isAuthenticated ? (
                            <div className="flex items-center">
                                <span className="text-gray-800 dark:text-white mr-4">Bienvenido, {user?.username}</span>
                                <button 
                                    onClick={logout} 
                                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        ) : (
                            <a href="/auth/login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                Iniciar sesión
                            </a>
                        )}   
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;