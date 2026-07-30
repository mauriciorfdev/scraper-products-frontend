const API_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import type { IngredientFilters, Product } from '../../src/types.ts';
import styles from './ProductsTable.module.css';
import TableLoader from '../table-loader/TableLoader.tsx';

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Brand</th>
        <th>Ingredients</th>
        <th>List</th>
      </tr>
    </thead>
  );
};

interface ProductsTableProps {
  filters: IngredientFilters;
}

const ProductsTable = ({ filters }: ProductsTableProps) => {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const noResultsMessage = `We couldn't find any products with that ingredient.`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mockAiData = {
    novaClassification: 4,
    novaJustification:
      'Clasificado NOVA 4 por la presencia de conservantes sintéticos (benzoato de sodio y sorbato de potasio).',
    summary:
      'Salsa de tomate procesada con sal, conservantes sintéticos y libre de azúcares añadidos.',
    sugars: [],
    diets: [
      {
        name: 'Vegana',
        compatible: true,
        reasons: [],
      },
      {
        name: 'Vegetariana',
        compatible: true,
        reasons: [],
      },
      {
        name: 'Sin Gluten',
        compatible: true,
        reasons: [],
      },
    ],
    additives: [
      {
        name: 'sorbato de potasio',
        code: 'E202',
        purpose: 'Conservante',
      },
      {
        name: 'benzoato de sodio',
        code: 'E211',
        purpose: 'Conservante',
      },
    ],
    allergens: [],
  };

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
    console.log('analyzing...');
    console.log(productId);
    console.log(mockAiData);
  }

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

  return (
    <div className={styles.container}>
      <h1>Products ({filteredData.length})</h1>
      <p>{!isLoading && filteredData.length == 0 && noResultsMessage}</p>

      <Table striped hover>
        <TableHead />

        {isLoading ? (
          <TableLoader cols={5} message='Loading products...' />
        ) : (
          <tbody>
            {filteredData.map((product) => {
              const ingredients = product.ingredients;
              const ingredientsArr = getIngredientsList(ingredients);
              const ingredientsSize = ingredientsArr.length;
              const showPreview = ingredientsSize > 5;
              return (
                <tr key={product?.id}>
                  <td width={'200px'}>{product.name}</td>
                  <td width={'200px'}>{product.brand}</td>
                  <td width={'100px'}>
                    <Badge bg='primary'>{ingredientsSize}</Badge>
                  </td>
                  <td width={'300px'}>
                    {showPreview ? (
                      <>
                        {ingredientsArr.slice(0, 4) + '...'}
                        <div>
                          <Button
                            size='sm'
                            onClick={() => {
                              handleShow();
                              setSelectedProduct(product);
                            }}
                            variant='outline-light'
                          >
                            Ver más
                          </Button>
                        </div>
                      </>
                    ) : (
                      ingredients
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ingredients List</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedProduct?.ingredients}</Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={() => {
              if (selectedProduct?.id) {
                handleAnalysis(selectedProduct.id);
              }
            }}
          >
            Analyze...
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductsTable;
