import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const { loginAuth, registerAuth } = useAuth();
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<any>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.ChangeEvent<any>) {
    e.preventDefault();
    const { name, email, password } = formData;
    try {
      if (isRegistering) {
        await registerAuth({ name, email, password });
      }
      await loginAuth({ email, password });
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error en el formulario de login:', error);
    }
  }

  return (
    <>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <Form onSubmit={handleSubmit}>
          {isRegistering && (
            <Form.Group className='mb-3' controlId='formName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Name'
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Form.Group>
          )}

          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>

          <div>
            <Button variant='primary' type='submit'>
              {isRegistering ? 'Sign Up' : 'Login'}
            </Button>

            <Button
              variant='link'
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering
                ? 'Already have an account? LOGIN'
                : "Don't have an account? SIGN UP"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
