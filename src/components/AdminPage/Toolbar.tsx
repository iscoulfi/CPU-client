import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { AiFillDelete } from 'react-icons/ai';
import { TbLockOpen } from 'react-icons/tb';

interface ToolbarParams {
  cleaner: () => void;
  block: (statusUser: string) => void;
  checkedUserId: string;
}

function Toolbar({ cleaner, block, checkedUserId }: ToolbarParams) {
  return (
    <ButtonGroup aria-label="Basic example" className="mb-2">
      <Button
        variant="danger"
        onClick={() => block('blocked')}
        disabled={!checkedUserId}
      >
        Block
      </Button>
      <Button
        variant="success"
        className="px-4 m-0"
        onClick={() => block('available')}
        disabled={!checkedUserId}
      >
        <TbLockOpen />
      </Button>
      <Button
        variant="secondary"
        className="px-4 m-0"
        onClick={cleaner}
        disabled={!checkedUserId}
      >
        <AiFillDelete />
      </Button>
    </ButtonGroup>
  );
}

export default Toolbar;
