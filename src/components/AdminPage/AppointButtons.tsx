import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

interface AppointToolbarParams {
  appointAdmin: (roles: string[]) => void;
  checkedUserId: string;
}

function Toolbar({ appointAdmin, checkedUserId }: AppointToolbarParams) {
  const { t } = useTranslation();
  return (
    <ButtonGroup aria-label="Basic example" className="mb-3">
      <Button
        size="sm"
        variant="outline-primary"
        onClick={() => appointAdmin(['admin'])}
        disabled={!checkedUserId}
      >
        {t('Admin')}
      </Button>
      <Button
        size="sm"
        variant="outline-primary"
        className="border-start-0 m-0"
        onClick={() => appointAdmin(['user'])}
        disabled={!checkedUserId}
      >
        {t('User')}
      </Button>
    </ButtonGroup>
  );
}

export default Toolbar;
