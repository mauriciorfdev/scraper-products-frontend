import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <Spinner
        animation='border'
        role='status'
        variant='primary'
        as='span'
        aria-hidden='true'
      />
      <span>Cargando...</span>
    </div>
  );
};

export default Loading;
