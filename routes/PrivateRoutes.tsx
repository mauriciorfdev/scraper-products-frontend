import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoutes = () => {
  const { user, loading } = useAuth();
  /* console.log('private-routes: ', user); */

  if (loading) return <div>Cargando...</div>;

  return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoutes;
