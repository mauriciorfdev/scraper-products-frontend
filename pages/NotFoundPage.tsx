import { Button } from 'react-bootstrap';
import styles from './NotFoundPage.module.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Page not found</h1>
      <p className={styles.description}>
        The page you are looking for doesn't exist or has been moved
      </p>
      <Button
        onClick={() => navigate('/', { replace: true })}
        className={styles.backBtn}
        variant='secondary'
        size='lg'
      >
        Back to homepage
      </Button>
    </div>
  );
};

export default NotFoundPage;
