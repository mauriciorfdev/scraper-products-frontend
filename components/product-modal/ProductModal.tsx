import Modal from 'react-bootstrap/Modal';
import type { Product } from '../../src/types';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

interface ProductModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: Product | undefined;
  handleAnalysis: (productId: string) => Promise<void>;
  analyzingProductId: string | null;
}

const ProductModal = ({
  show,
  setShow,
  selectedProduct,
  handleAnalysis,
  analyzingProductId,
}: ProductModalProps) => {
  const allergens = selectedProduct?.aiAnalysis?.allergens || [];
  const additives = selectedProduct?.aiAnalysis?.additives || [];
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Ingredients</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ListGroup variant='flush'>
          <ListGroup.Item>{selectedProduct?.ingredients}</ListGroup.Item>
          <ListGroup.Item className='mt-3'>
            <div className='h5'>Resumen</div>
            {selectedProduct?.aiAnalysis?.summary}
          </ListGroup.Item>
          <ListGroup.Item className='mt-3'>
            <div className='h5'>Alérgenos</div>
            {allergens.length === 0 ? (
              'Ninguno'
            ) : (
              <ul>
                {allergens.map((allergen) => (
                  <li key={allergen}>{allergen}</li>
                ))}
              </ul>
            )}
          </ListGroup.Item>
          <ListGroup.Item className='mt-3'>
            <div className='h5'>Aditivos</div>
            {additives.length === 0 ? (
              'Sin aditivos'
            ) : (
              <ul>
                {additives.map((additive) => (
                  <li>
                    {additive.name} - {additive.code}
                    <span className='fst-italic'> ({additive.purpose})</span>
                  </li>
                ))}
              </ul>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant='primary'
          onClick={() => {
            if (selectedProduct?.id) {
              handleAnalysis(selectedProduct.id);
            }
          }}
          disabled={analyzingProductId === selectedProduct?.id}
        >
          {analyzingProductId === selectedProduct?.id
            ? 'Analyzing...'
            : 'Analyze'}
        </Button>

        <Button variant='secondary' onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
