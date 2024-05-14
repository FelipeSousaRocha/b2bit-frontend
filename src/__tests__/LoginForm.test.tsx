import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/Form/form';

describe('LoginForm Component', () => {
  test('submits the form with valid credentials', async () => {
    // Renderize o componente
    const { getByLabelText, getByText } = render(<LoginForm />);

    // Encontre os campos de entrada e preencha-os com credenciais válidas
    userEvent.type(getByLabelText('E-mail'), 'validemail@example.com');
    userEvent.type(getByLabelText('Password'), 'validpassword');

    // Clique no botão de login
    fireEvent.click(getByText('Sign In'));

    // Aguarde a submissão do formulário
    await waitFor(() => {
      // Verifique se o usuário foi redirecionado para a página do perfil após o login
      expect(window.location.pathname).toEqual('/profile');
    });
  });

  test('displays an error message with invalid credentials', async () => {
    // Renderize o componente
    const { getByLabelText, getByText } = render(<LoginForm />);

    // Encontre os campos de entrada e preencha-os com credenciais inválidas
    userEvent.type(getByLabelText('E-mail'), 'invalidemail@example.com');
    userEvent.type(getByLabelText('Password'), 'invalidpassword');

    // Clique no botão de login
    fireEvent.click(getByText('Sign In'));

    // Aguarde a exibição da mensagem de erro
    await waitFor(() => {
      // Verifique se a mensagem de erro está sendo exibida
      expect(getByText('Falha no login. Por favor verifique seu e-mail e senha.')).toBeInTheDocument();
    });
  });
});
