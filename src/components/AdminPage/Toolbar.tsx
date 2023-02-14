import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { AiFillDelete } from 'react-icons/ai';
import { TbLockOpen } from 'react-icons/tb';

function BasicExample() {
  return (
    <ButtonGroup aria-label="Basic example" className="mb-2">
      <Button variant="danger">Block</Button>
      <Button variant="success" className="px-4">
        <TbLockOpen />
      </Button>
      <Button variant="secondary" className="px-4">
        <AiFillDelete />
      </Button>
    </ButtonGroup>
  );
}

export default BasicExample;
