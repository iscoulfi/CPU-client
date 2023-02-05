import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h3 className="fw-bold mt-5 pt-5">{t('Page not found')}</h3>
      <Button
        variant="secondary"
        className="mb-5 mt-2"
        onClick={() => navigate('/')}
      >
        {t('Go Home')}
      </Button>
    </div>
  );
};

export default NotFound;
