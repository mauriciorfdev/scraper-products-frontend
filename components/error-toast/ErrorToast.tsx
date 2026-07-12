import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import type { ApiError } from '../../src/types';

interface ErrorToastProps {
  error: ApiError;
  onClose: () => void;
}

const ErrorToast = ({ error, onClose }: ErrorToastProps) => {
  return (
    <ToastContainer position='middle-center'>
      <Toast
        bg={error.status === 0 ? 'danger' : 'secondary'}
        onClose={() => {
          onClose();
        }}
        delay={error.status === 400 ? 5000 : 3000}
        autohide
      >
        <Toast.Header>
          <strong className='me-auto'>{error.message}</strong>
        </Toast.Header>
        <Toast.Body>
          {error.status == 0 && 'Please try again in a few minutes'}
          {error.status == 401 && 'Incorrect email or password'}
          {error.status == 400 && 'Details:'}
          {error.errors && (
            <ul>
              {error.errors.map((e, index) => (
                <li key={index}>{e.message}</li>
              ))}
            </ul>
          )}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ErrorToast;
