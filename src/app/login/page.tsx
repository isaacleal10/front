'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { loginWithKeycloak } from '@/services/authService';
import { setEncryptedToken } from '@/utils/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('session_token');

    if (token) {
      router.replace('/productos');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await loginWithKeycloak(username, password);
      setEncryptedToken(response.access_token);
      router.push('/productos');
    } catch (error) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-semibold">
            Usuario
          </label>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
            className="w-100"
          />
        </div>

        <div className="mb-3 w-100">
          <label htmlFor="password" className="form-label fw-semibold">
            Contraseña
          </label>
          <Password
            inputId="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            toggleMask
            className="w-100"        
            inputClassName="w-100"   
            panelClassName="w-100"   
          />
        </div>
        <Button
          label="Iniciar sesión"
          icon="pi pi-sign-in"
          className="w-100"
          onClick={handleLogin}
        />
      </div>
    </div>
  );
}
