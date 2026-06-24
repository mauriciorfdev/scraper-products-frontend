import { useState } from 'react';
import type { FilterMode } from './types';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from '../components/data-table/DataTable';
import IngredientFilterBar from '../components/ingredient-filter-bar/IngredientFilterBar';

function App() {
  const [inputText, setInputText] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('include');

  return (
    <>
      <IngredientFilterBar
        setInputText={setInputText}
        filterMode={filterMode}
        setFilterMode={setFilterMode}
      ></IngredientFilterBar>

      <br />

      <DataTable input={inputText} filterMode={filterMode} />
    </>
  );
}

export default App;
