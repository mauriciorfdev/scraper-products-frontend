import Spinner from 'react-bootstrap/Spinner';

const TableLoader = ({ cols, message }: { cols: number; message: string }) => {
  return (
    <tbody>
      <tr>
        <td colSpan={cols}>
          <div className='d-flex justify-content-center align-items-center py-5'>
            <Spinner
              as='span'
              animation='border'
              role='status'
              variant='primary'
              aria-hidden='true'
              className='me-2'
            />
            <span className='text-muted align-middle'>{message}</span>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default TableLoader;
