import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = !!accessToken;

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
