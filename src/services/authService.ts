// src/services/authService.ts
import axios from 'axios';

const keycloakUrl = 'http://localhost:8080/realms/MiProyecto/protocol/openid-connect/token';
const clientId = 'frontend-app'; 
const clientSecret = ''; 

export async function loginWithKeycloak(username: string, password: string) {
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'password');
  params.append('username', username);
  params.append('password', password);

  const response = await axios.post(keycloakUrl, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data; // contiene access_token, refresh_token, etc.
}
