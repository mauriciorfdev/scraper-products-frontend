import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import FullScreenLoader from '../components/fullscreen-loader/FullscreenLoader';

const PublicRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;

  return user ? <Navigate to='/' replace /> : <Outlet />;
};

export default PublicRoutes;
