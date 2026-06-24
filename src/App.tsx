import { useState } from 'react';
import type { Mode } from './types';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from '../components/data-table/DataTable';
import IngredientFilterBar from '../components/ingredient-filter-bar/IngredientFilterBar';

function App() {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<Mode>('include');

  return (
    <>
      <IngredientFilterBar
        setInputText={setInputText}
        mode={mode}
        setMode={setMode}
      ></IngredientFilterBar>

      <br />

      <DataTable input={inputText} mode={mode} />
    </>
  );
}

export default App;
