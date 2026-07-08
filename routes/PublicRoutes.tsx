import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Spinner from 'react-bootstrap/Spinner';

const PublicRoutes = () => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
        <Spinner animation='border' role='status' variant='primary' />
        <span>Cargando...</span>
      </div>
    );

  return user ? <Navigate to='/' replace /> : <Outlet />;
};

export default PublicRoutes;
