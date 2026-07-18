import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import FullScreenLoader from '../components/fullscreen-loader/FullscreenLoader';

const AdminRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;

  if (!user) return <Navigate to='/login' replace />;

  if (user.role !== 'admin') return <Navigate to='/' replace />;

  return <Outlet />;
};

export default AdminRoutes;
