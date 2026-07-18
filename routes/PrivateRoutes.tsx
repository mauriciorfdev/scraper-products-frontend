import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import FullScreenLoader from '../components/fullscreen-loader/FullscreenLoader';

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;

  return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoutes;
