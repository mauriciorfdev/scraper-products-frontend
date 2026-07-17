import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const AdminTools = () => {
  return (
    <Nav className='me-auto'>
      <NavDropdown
        id='nav-dropdown-admin'
        title='⚙️ Admin'
        menuVariant='dark'
        className='m-2'
      >
        <NavDropdown.Item as={Link} to='/users'>
          Ver Usuarios
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={Button}>Scrape</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default AdminTools;
