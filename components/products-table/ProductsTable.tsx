const API_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import type { IngredientFilters, Product } from '../../src/types.ts';
import './ProductsTable.css';
import TableLoader from '../table-loader/TableLoader.tsx';
import ProductModal from '../product-modal/ProductModal.tsx';
import ErrorToast from '../error-toast/ErrorToast.tsx';
import { ApiError } from '../../src/errors/ApiError.ts';
import { analyzeProductService } from '../../services/productService.ts';

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Brand</th>
        <th>Classification</th>
        <th>Added Sugar</th>
        <th>Ingredients</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

const NovaCell = ({ product }: { product: Product }) => {
  const [showNovaModal, setShowNovaModal] = useState(false);
  const novaClassification = product.aiAnalysis?.novaClassification || 0;
  const novaColor: Record<number, string> = {
    1: '#10B981',
    2: '#caad07',
    3: '#df5e02',
    4: '#8f1414',
  };
  return (
    <>
      <td>
        {product.aiAnalysis ? (
          <div className='align-middle'>
            <span
              className='badge rounded-pill'
              style={{
                backgroundColor: novaColor[novaClassification],
                color: 'white',
              }}
            >
              {'NOVA ' + novaClassification}
            </span>
            <Button
              variant='outline-light'
              className='mt-3 badge'
              onClick={() => setShowNovaModal(true)}
            >
              Ver Explicación
            </Button>
          </div>
        ) : (
          'Pending...'
        )}
      </td>
      <Modal
        show={showNovaModal}
        onHide={() => setShowNovaModal(false)}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>¿Por qué NOVA {novaClassification}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{product.aiAnalysis?.novaJustification}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowNovaModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const SugarCell = ({ product }: { product: Product }) => {
  return (
    <td>
      {product.aiAnalysis ? (
        product.aiAnalysis.sugars.length != 0 ? (
          <Stack gap={1}>
            {product.aiAnalysis.sugars.map((s, index) => (
              <Badge key={index}>{s}</Badge>
            ))}
          </Stack>
        ) : (
          <Badge bg='success'>{'Sin azúcar añadido'}</Badge>
        )
      ) : (
        'Pending...'
      )}
    </td>
  );
};

const IngredientCell = ({
  product,
  handleShow,
}: {
  product: Product;
  handleShow: (product: Product) => void;
}) => {
  const ingredients = product.ingredients;
  const ingredientsArr = getIngredientsList(ingredients);
  const ingredientsSize = ingredientsArr.length;
  const showPreview = ingredientsSize > 3;
  return (
    <td>
      <Stack gap={1}>
        <Badge bg='secondary' className='align-self-center'>
          {ingredientsSize}
        </Badge>
        <span className='text-muted'>
          {showPreview ? ingredientsArr.slice(0, 3) + '...' : ingredients}
        </span>
        <div>
          <Button
            size='sm'
            onClick={() => {
              handleShow(product);
            }}
            variant='outline-light'
          >
            Ver más
          </Button>
        </div>
      </Stack>
    </td>
  );
};

const ActionCell = ({
  product,
  handleAnalysis,
  analyzingProductId,
}: {
  product: Product;
  handleAnalysis: (productId: string) => Promise<void>;
  analyzingProductId: string | null;
}) => {
  return (
    <td className='align-middle'>
      <button
        onClick={() => {
          handleAnalysis(product.id);
        }}
        disabled={analyzingProductId === product.id}
        className='btnIa'
      >
        {analyzingProductId === product.id ? '✨Analizando...' : '✨Analizar'}
      </button>
    </td>
  );
};

function splitByConjunction(mainResults: string[]) {
  //regex: dividir por y/Y el grupo ppal de ing si corresponde
  const nestedArr = mainResults.map((elem) => elem.split(/\s*y\s+/i));
  //limpar resultado
  const cleanArr = nestedArr
    .flat()
    .map((e) => e.trim())
    .filter(Boolean);
  return cleanArr;
}

function getIngredientsList(ingredients: string) {
  //regex: (main-group)(inner-group)
  const regex = /([^,(.]+)(?:\(([^)]*)\))?/g;
  const matches = [...ingredients.matchAll(regex)];
  const results = matches.map((m) => {
    return {
      main: m[1].trim(),
      inner: m[2]?.trim() ?? null,
    };
  });
  //solo grupo ppal de ing.
  const mainResults = results.map((r) => r.main);
  const ingredientsList = splitByConjunction(mainResults);
  return ingredientsList;
}

interface ProductsTableProps {
  filters: IngredientFilters;
}

const ProductsTable = ({ filters }: ProductsTableProps) => {
  const [show, setShow] = useState(false);
  const [productIdSuccess, setProductIdSuccess] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const noResultsMessage = `We couldn't find any products with that ingredient.`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analyzingProductId, setAnalyzingProductId] = useState<string | null>(
    null,
  );
  const [analysisError, setAnalysisError] = useState<ApiError | null>(null);

  //Fetch all products data
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const url = `${API_URL}/products`;
    try {
      setIsLoading(true);
      const resp = await fetch(url);
      const productsData = await resp.json();
      setProductsData(productsData);
      console.log(productsData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  /* productId: string | undefined*/
  async function handleAnalysis(productId: string) {
    setAnalyzingProductId(productId);
    try {
      const analyzedProduct = await analyzeProductService(productId);
      console.log(analyzedProduct);
      setProductsData((prevProd) =>
        prevProd.map((p) =>
          p.id === analyzedProduct.id ? analyzedProduct : p,
        ),
      );
      setProductIdSuccess(analyzedProduct.id);
      setTimeout(() => {
        setProductIdSuccess(null);
      }, 3000);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error);
        setAnalysisError(error);
      } else {
        console.log('error de red...');
        setAnalysisError(new ApiError('error de red', 0));
      }
    } finally {
      setAnalyzingProductId(null);
    }
  }

  const handleShow = (product: Product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  //Filter products by ingredient (input)
  const filteredData = productsData.filter((product) => {
    //true if product includes ingredient (input)
    const includeIngredient = product.ingredients
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    //depending on the toggle button is checked, return products that include ingredient, or the rest of them otherwise
    return filters.search === ''
      ? true
      : filters.filterMode === 'include'
        ? includeIngredient
        : !includeIngredient;
  });

  return (
    <>
      {analysisError && (
        <ErrorToast
          error={analysisError}
          onClose={() => setAnalysisError(null)}
        />
      )}
      <div className={'tableContainer'}>
        <h1>Products ({filteredData.length})</h1>
        <p>{!isLoading && filteredData.length == 0 && noResultsMessage}</p>

        <Table striped hover>
          <TableHead />
          {isLoading ? (
            <TableLoader cols={6} message='Loading products...' />
          ) : (
            <tbody>
              {filteredData.map((product) => {
                return (
                  <tr
                    className={
                      productIdSuccess === product.id ? 'row-success' : ''
                    }
                    key={product?.id}
                  >
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <NovaCell product={product} />
                    <SugarCell product={product} />
                    <IngredientCell product={product} handleShow={handleShow} />
                    <ActionCell
                      product={product}
                      handleAnalysis={handleAnalysis}
                      analyzingProductId={analyzingProductId}
                    />
                  </tr>
                );
              })}
            </tbody>
          )}
        </Table>

        <ProductModal
          show={show}
          setShow={setShow}
          selectedProduct={selectedProduct}
        ></ProductModal>
      </div>
    </>
  );
};

export default ProductsTable;
