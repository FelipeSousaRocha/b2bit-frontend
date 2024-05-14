import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import img from '../../assets/logo.svg';
import { LoginResponse } from '../types/types';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      // Início da tentativa de login
      //console.log('Tentativa de login...');

      const response = await api.post<LoginResponse>('/auth/login/', {
        email,
        password,
      });

      // Resposta da API
      //console.log('Resposta da API:', response);

      if (response.status === 200) {
        // Extração de dados da resposta
        const { user, tokens } = response.data;
        //console.log('Usuário:', user);
        //console.log('Tokens:', tokens);

        // Extração de informações do usuário e dos tokens
        const { id } = user;
        const { access } = tokens;

        // Armazenamento das informações no localStorage
        localStorage.setItem('userId', id.toString());
        localStorage.setItem('accessToken', access);

        // Navegação para a página de perfil
        navigate('/profile');
      }
    } catch (error) {
      // Tratamento de erros de login
      //console.error('Erro ao fazer login:', error);
      setError('Falha no login. Por favor verifique seu e-mail e senha.');
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-[438px]">
        <img
          src={img}
          alt="B2Bit Logo"
          className="mx-auto mb-6"
          style={{ width: '295px', height: '116px' }}
        />
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="@gmail.com"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#F1F1F1] text-gray-600 p-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-gray-700 font-bold">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#F1F1F1] text-gray-600 p-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center p-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#02274F] hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
