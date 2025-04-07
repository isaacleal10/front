// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mi Proyecto con Keycloak',
  description: 'Gestión de productos con autenticación segura',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50 text-gray-900">
          {children}
        </main>
      </body>
    </html>
  );
}
