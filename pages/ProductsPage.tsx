import { useState } from 'react';
import ProductsTable from '../components/products-table/ProductsTable';
import IngredientFilterBar from '../components/ingredient-filter-bar/IngredientFilterBar';
import type { IngredientFilters } from '../src/types';
import Header from '../components/header/Header';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
  const [filters, setFilters] = useState<IngredientFilters>({
    search: '',
    filterMode: 'include',
  });
  return (
    <>
      <Header />

      <div className={styles.container}>
        <IngredientFilterBar
          filters={filters}
          setFilters={setFilters}
        ></IngredientFilterBar>

        <ProductsTable filters={filters} />
      </div>
    </>
  );
};

export default ProductsPage;
