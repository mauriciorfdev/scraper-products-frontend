import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Spinner from 'react-bootstrap/Spinner';

const PrivateRoutes = () => {
  const { user, loading } = useAuth();
  /* console.log('private-routes: ', user); */

  if (loading)
    return (
      <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
        <Spinner animation='border' role='status' variant='primary' />
        <span>Cargando...</span>
      </div>
    );

  return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoutes;
