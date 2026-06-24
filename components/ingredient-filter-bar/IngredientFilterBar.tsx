import type { SetStateAction } from 'react';
import Form from 'react-bootstrap/Form';
import type { Mode } from '../../src/types';

type FilterProps = {
  setInputText: React.Dispatch<SetStateAction<string>>;
  mode: Mode;
  setMode: React.Dispatch<SetStateAction<Mode>>;
};

const IngredientFilterBar = ({ setInputText, mode, setMode }: FilterProps) => {
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
  );
};

export default IngredientFilterBar;
