import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../user-info/UserInfo';
import AdminTools from '../admin-tools/AdminTools';

const Header = () => {
  const { user, logoutAuth } = useAuth();
  const navigate = useNavigate();

  async function handleClick() {
    try {
      await logoutAuth();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  return (
    <>
      <Navbar className='bg-body-tertiary mb-4 border-bottom' expand='lg'>
        <Container>
          <Navbar.Brand>
            {user && <UserInfo name={user.name} email={user.email} />}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar' />
          <Navbar.Collapse id='basic-navbar'>
            {user?.role === 'admin' && <AdminTools />}

            <Button
              onClick={handleClick}
              size='sm'
              variant='secondary'
              className='ms-auto'
            >
              Cerrar Sesión
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
