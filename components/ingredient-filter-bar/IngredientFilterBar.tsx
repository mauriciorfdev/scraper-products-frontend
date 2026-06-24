import type { SetStateAction } from 'react';
import Form from 'react-bootstrap/Form';
import type { FilterMode } from '../../src/types';

type FilterProps = {
  setInputText: React.Dispatch<SetStateAction<string>>;
  filterMode: FilterMode;
  setFilterMode: React.Dispatch<SetStateAction<FilterMode>>;
};

const IngredientFilterBar = ({
  setInputText,
  filterMode,
  setFilterMode,
}: FilterProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }
  return (
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
          checked={filterMode === 'include'}
          onChange={(e) => {
            setFilterMode(e.target.checked ? 'include' : 'exclude');
          }}
        />
      </Form.Group>
    </Form>
  );
};

export default IngredientFilterBar;
