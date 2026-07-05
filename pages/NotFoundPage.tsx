import { Button } from 'react-bootstrap';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>Page not found</h1>
      <p className={styles.description}>
        The page you are looking for doesn't exist or has been moved
      </p>
      <Button className={styles.backBtn} href='/' variant='secondary' size='lg'>
        Back to homepage
      </Button>
    </div>
  );
};

export default NotFoundPage;
