import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleChange(e: React.ChangeEvent<any>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  }

  return (
    <div style={{ border: '1px solid darkRed', marginBottom: '50px' }}>
      <Form>
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

        {isRegistering && (
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
        )}

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
  );
};

export default LoginPage;
