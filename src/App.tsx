import { useState } from 'react';
import type { Mode } from './types';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from '../components/data-table/DataTable';
import Form from 'react-bootstrap/Form';

function App() {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<Mode>('include');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  return (
    <>
      <Form>
        <Form.Group className='mb-3' controlId='exampleSearch'>
          <Form.Control
            type='text'
            placeholder='Type the ingredient...'
            onChange={handleChange}
          />
          <Form.Check // prettier-ignore
            type='switch'
            id='custom-switch'
            label='Include Ingredients'
            inline
            checked={mode == 'include' ? true : false}
            onChange={() => {
              let toggle = document.getElementById(
                'custom-switch',
              ) as HTMLInputElement;
              toggle.checked ? setMode('include') : setMode('exclude');
            }}
          />
        </Form.Group>
      </Form>

      <br />

      <DataTable input={inputText} mode={mode} />
    </>
  );
}

export default App;
