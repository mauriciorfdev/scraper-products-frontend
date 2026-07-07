import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const AdminTools = () => {
  return (
    <Nav className='me-auto'>
      <NavDropdown
        id='nav-dropdown-admin'
        title='⚙️ Admin'
        menuVariant='dark'
        className='m-2'
      >
        <NavDropdown.Item>Ver Usuarios</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>Scrape</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default AdminTools;
