import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from '../components/data-table/DataTable';
import IngredientFilterBar from '../components/ingredient-filter-bar/IngredientFilterBar';
import type { IngredientFilters } from './types';

function App() {
  const [filters, setFilters] = useState<IngredientFilters>({
    search: '',
    filterMode: 'include',
  });

  return (
    <>
      <IngredientFilterBar
        filters={filters}
        setFilters={setFilters}
      ></IngredientFilterBar>

      <br />

      <DataTable filters={filters} />
    </>
  );
}

export default App;
