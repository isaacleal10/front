'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDecryptedToken } from '@/utils/auth';

type Props = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: Props) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getDecryptedToken();

    if (!token) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) return <p>Cargando...</p>;

  return <>{children}</>;
}
