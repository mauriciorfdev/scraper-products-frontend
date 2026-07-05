import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import type { IngredientFilters } from '../../src/types.ts';
import styles from './DataTable.module.css';

interface DataTableProps {
  filters: IngredientFilters;
}
/* ({filters}:{filters:IngredientFilters}) */

const DataTable = ({ filters }: DataTableProps) => {
  const [show, setShow] = useState(false);
  const [dataModal, setDataModal] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [localData, setLocalData] = useState<any[]>([]);
  const noResultsMessage = `We couldn't find any products with that ingredient.`;

  //Fetch all products data
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = 'http://localhost:5000/products';
    try {
      const resp = await fetch(url);
      const localData = await resp.json();
      setLocalData(localData);
      console.log(localData);
    } catch (error) {
      console.log(error);
    }
  }

  //Filter products by ingredient (input)

  const filteredData = localData.filter((product) => {
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

      {filteredData.length == 0 ? (
        noResultsMessage
      ) : (
        <Table striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Ingredients</th>
              <th>List</th>
            </tr>
          </thead>
          <tbody>
            {/*  */}
            {filteredData.map((product, index) => {
              const ingredients = product.ingredients;
              const ingredientsArr = getIngredientsList(ingredients);
              const ingredientsSize = ingredientsArr.length;
              const showPreview = ingredientsSize > 5;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td width={'200px'}>{product.name}</td>
                  <td width={'200px'}>{product.brand}</td>
                  <td width={'100px'}>
                    <Badge bg='primary'>{ingredientsSize}</Badge>
                  </td>
                  <td width={'300px'}>
                    {showPreview ? (
                      <>
                        {ingredientsArr.slice(0, 4) + '...'}
                        <Button
                          size='sm'
                          onClick={() => {
                            handleShow();
                            setDataModal(ingredients);
                          }}
                        >
                          Ver más
                        </Button>
                      </>
                    ) : (
                      ingredients
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ingredients List</Modal.Title>
        </Modal.Header>
        <Modal.Body>{dataModal}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant='primary'>Ok</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataTable;
