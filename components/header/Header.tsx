import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../user-info/UserInfo';

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
      <Navbar className='bg-body-tertiary mb-4 border-bottom'>
        <Container>
          <Navbar.Brand>App</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar' />
          <Navbar.Collapse
            className='justify-content-end gap-3'
            id='basic-navbar'
          >
            {user && <UserInfo name={user.name} email={user.email} />}
            <Button onClick={handleClick} size='sm' variant='secondary'>
              Cerrar Sesión
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
