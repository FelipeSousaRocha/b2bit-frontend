import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.homologation.cliqdrive.com.br',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    // console.log('Interceptor: Token de acesso encontrado:', token);
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // console.log('Interceptor: Token de acesso não encontrado');
  }
  // Definindo o cabeçalho Accept para application/json com a versão v1_web
  config.headers.Accept = 'application/json;version=v1_web';
  return config;
});

export default api;
