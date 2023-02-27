import { useNavigate } from 'react-router-dom';
import { useOutletProps } from '../hooks/useOutletProps';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ClipLoader from 'react-spinners/ClipLoader';

const SearchItem = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { items, loading } = useOutletProps();
  return (
    <Container className="searcher">
      {loading ? (
        <div className="text-center pt-5">
          <ClipLoader color="#428bff" className="loader" />
        </div>
      ) : items.length > 0 ? (
        <ListGroup variant="flush" className="pt-4">
          {items.map(item => {
            return (
              <ListGroup.Item
                action
                key={item._id}
                onClick={() => {
                  navigate(`/personal/${item.coll}/${item._id}`);
                }}
              >
                <div className="fw-bold h3">{item.title}</div>

                <div>
                  <span className="text-secondary">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <div className="text-center pt-3">
          <h1>{t('Items not found')}</h1>
        </div>
      )}
    </Container>
  );
};

export default SearchItem;
