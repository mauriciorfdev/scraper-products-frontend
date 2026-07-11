import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Loading from '../components/loading/Loading';

const PublicRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return user ? <Navigate to='/' replace /> : <Outlet />;
};

export default PublicRoutes;
