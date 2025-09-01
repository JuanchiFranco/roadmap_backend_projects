"use client";

import Link from "next/link";
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from "react";

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const [ homeRedirect, setHomeRedirect ] = useState('/home');
  
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        setHomeRedirect('/admin');
      } else {
        setHomeRedirect('/home');
      }
    }
  }, [isAuthenticated, user]);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center justify-center gap-4 max-w-xl w-full -mt-24">
        <h2 className="text-2xl font-semibold text-center">
          Un lugar para compartir articulos, reflexiones y experiencias
        </h2>
        <p className="text-lg text-center">
          Bienvenido a mi blog personal, donde comparto mis pensamientos y
          reflexiones sobre diversos temas. Espero que encuentres algo que te
          inspire o te haga reflexionar.
        </p>
        <Link className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" href={homeRedirect}>
          Ir al Home
        </Link>
      </div>
    </div>
  );
}
