const API_URL = import.meta.env.VITE_API_URL;
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AdminTools = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [loadingScrape, setLoadingScrape] = useState<boolean>(false);

  async function scrapeProducts() {
    const url = `${API_URL}/products/scrape`;
    setLoadingScrape(true);
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await resp.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingScrape(false);
    }
  }

  return (
    <>
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
          <NavDropdown.Item as={Button} onClick={() => setModalShow(true)}>
            Scrape
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to scrape</Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => {
              setModalShow(false);
            }}
          >
            Close
          </Button>
          <Button
            variant='primary'
            disabled={loadingScrape}
            onClick={scrapeProducts}
          >
            {loadingScrape ? (
              <>
                <Spinner
                  animation='grow'
                  size='sm'
                  as='span'
                  aria-hidden='true'
                />{' '}
                Loading...
              </>
            ) : (
              'Scrape Data'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminTools;
