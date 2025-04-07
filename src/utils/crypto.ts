// src/utils/crypto.ts
import CryptoJS from 'crypto-js';

const SECRET = 'clave-secreta';

export function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, SECRET).toString();
}

export function decrypt(cipherText: string) {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}
