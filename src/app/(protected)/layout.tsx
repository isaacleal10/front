'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDecryptedToken, clearToken } from '@/utils/auth';
import { Button } from 'primereact/button';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getDecryptedToken();
    if (!token) {
      router.replace('/login');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.push('/login');
  };

  if (isAuth === null) return <p className="p-4">Cargando...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Encabezado */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 shadow-lg rounded-b-2xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <i className="pi pi-cog text-white text-2xl" />
          <h1 className="text-white text-2xl font-semibold tracking-wide">
            Panel de Administración
          </h1>
        </div>

        <Button
          label="Cerrar sesión"
          icon="pi pi-sign-out"
          className="p-button-rounded p-button-sm p-button-danger transition-transform duration-200 hover:scale-105"
          onClick={handleLogout}
        />
      </header>

      {/* Contenido */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
