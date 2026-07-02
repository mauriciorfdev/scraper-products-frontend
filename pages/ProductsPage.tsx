import { useState } from 'react';
import DataTable from '../components/data-table/DataTable';
import IngredientFilterBar from '../components/ingredient-filter-bar/IngredientFilterBar';
import type { IngredientFilters } from '../src/types';
import Header from '../components/header/Header';

const ProductsPage = () => {
  const [filters, setFilters] = useState<IngredientFilters>({
    search: '',
    filterMode: 'include',
  });
  return (
    <>
      <Header />

      <IngredientFilterBar
        filters={filters}
        setFilters={setFilters}
      ></IngredientFilterBar>

      <DataTable filters={filters} />
    </>
  );
};

export default ProductsPage;
