import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

interface ProfileData {
  id: string;
  avatar: {
    id: number;
    image_high_url: string;
    image_medium_url: string;
    image_low_url: string;
  } | null; // Alterado para permitir null
  name: string;
  last_name: string;
  email: string;
  role: {
    value: number;
    label: string;
  };
  last_login: string;
  staff_role: {
    value: number;
    label: string;
  };
}

function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get('/auth/profile/');
        setProfileData(response.data);
        // console.log('Dados do perfil:', response.data); // Comentado o console.log
      } catch (error) {
        console.error('Erro ao obter dados do perfil:', error);
        // Se ocorrer um erro ao obter os dados do perfil, redirecione o usuário para a página de login
        navigate('/');
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleLogout = () => {
    // Limpa o token de acesso do armazenamento local
    localStorage.removeItem('accessToken');
    // Redireciona o usuário para a página de login
    navigate('/');
  };

  if (!profileData) {
    // Exibir um indicador de carregamento enquanto os dados do perfil estão sendo obtidos
    return <div>Carregando...</div>;
  }

  // Link de imagem padrão como placeholder
  const placeholderImgSrc = 'https://via.placeholder.com/150';

  // Verifica se avatarSrc está definido antes de usar no src do img
  const avatarSrc = profileData.avatar ? profileData.avatar.image_medium_url : placeholderImgSrc;

  // Verifica se o nome e o sobrenome estão definidos antes de mostrar no input
  const fullName = profileData.name ? profileData.name : 'Nome Indefinido';

  return (
    <div className="h-screen bg-[#F1F5F9]">
      <header className="bg-white h-16 flex items-center px-6">
        <button
          onClick={handleLogout}
          className="bg-[#02274F] text-white px-4 py-2 rounded-md ml-auto w-[272px]"
        >
          Logout
        </button>
      </header>

      <div className="max-w-md mx-auto mt-10 bg-white rounded-md shadow-lg p-6">
        <div className="flex items-center justify-center">
          <img
            src={avatarSrc}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mt-4">{fullName}</h2>
        <h2 className="text-2xl font-semibold text-center mt-4">Profile Picture</h2>
        <form className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your <strong>Email</strong></label>
            <input
              type="email"
              id="email"
              value={profileData.email}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#F1F1F1] text-gray-600 p-3"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your <strong>Name</strong></label>
            <input
              type="text"
              id="name"
              value={fullName}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#F1F1F1] text-gray-600 p-3"
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
