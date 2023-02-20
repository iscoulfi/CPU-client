import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { useOutletProps } from '../hooks/useOutletProps';

const SearchItem = () => {
  const navigate = useNavigate();
  const { items } = useOutletProps();

  return (
    <Container className="searcher">
      <ListGroup variant="flush" as="ol">
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
    </Container>
  );
};

export default SearchItem;
