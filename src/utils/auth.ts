import CryptoJS from 'crypto-js';

const STORAGE_KEY = 'session_token';
const SECRET = 'clave-secreta-supersegura';

export function setEncryptedToken(token: string) {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET).toString();
  localStorage.setItem(STORAGE_KEY, encrypted);
}

export function getDecryptedToken(): string | null {
  const encrypted = localStorage.getItem(STORAGE_KEY);
  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error al desencriptar token:', error);
    return null;
  }
}

export function clearToken() {
  localStorage.removeItem(STORAGE_KEY);
}
