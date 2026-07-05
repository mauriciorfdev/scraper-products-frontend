import Form from 'react-bootstrap/Form';
import type { SetStateAction } from 'react';
import type { IngredientFilters } from '../../src/types';
import styles from './IngredientFilterBar.module.css';

interface FilterBarProps {
  filters: IngredientFilters;
  setFilters: React.Dispatch<SetStateAction<IngredientFilters>>;
}

const IngredientFilterBar = ({ filters, setFilters }: FilterBarProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters({ ...filters, search: e.target.value });
  }
  return (
    <div className={styles.container}>
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
            checked={filters.filterMode === 'include'}
            onChange={(e) => {
              setFilters({
                ...filters,
                filterMode: e.target.checked ? 'include' : 'exclude',
              });
            }}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default IngredientFilterBar;
