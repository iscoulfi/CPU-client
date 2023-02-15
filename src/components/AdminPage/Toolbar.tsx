import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { AiFillDelete } from 'react-icons/ai';
import { TbLockOpen } from 'react-icons/tb';

interface ToolbarParams {
  cleaner: () => void;
  block: (statusUser: string) => void;
}

function Toolbar({ cleaner, block }: ToolbarParams) {
  return (
    <ButtonGroup aria-label="Basic example" className="mb-2">
      <Button variant="danger" onClick={() => block('blocked')}>
        Block
      </Button>
      <Button
        variant="success"
        className="px-4"
        onClick={() => block('available')}
      >
        <TbLockOpen />
      </Button>
      <Button variant="secondary" className="px-4" onClick={cleaner}>
        <AiFillDelete />
      </Button>
    </ButtonGroup>
  );
}

export default Toolbar;
